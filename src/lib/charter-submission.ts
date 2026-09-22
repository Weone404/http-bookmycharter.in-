import type { CharterRequest } from '@/types/charter-request';

/**
 * Where a charter request is delivered.
 *
 * Answered 2026-09-22: the existing We One Aviation CRM. The adapter is
 * implemented below; it is inert until `CHARTER_CRM_URL` is set, and the API
 * says so plainly rather than accepting a request and dropping it.
 *
 * A form that reports success while discarding the enquiry is worse than a
 * form that is honestly switched off: the person believes they will be called
 * back, and nobody knows they exist.
 *
 * Adding a provider is one function and one entry in `resolveAdapter`. Nothing
 * in the form or the API route changes.
 */
export interface SubmissionResult {
  readonly ok: boolean;
  /** Opaque reference shown to the person, only on a real delivery. */
  readonly reference?: string;
  readonly error?: string;
}

export interface SubmissionAdapter {
  readonly name: string;
  readonly deliver: (request: CharterRequest) => Promise<SubmissionResult>;
}

/** Providers we can be configured for. Add a case to `resolveAdapter` per entry. */
export type SubmissionProvider = 'email' | 'webhook' | 'crm';

/**
 * A webhook adapter: the simplest destination that works for email relays,
 * CRM inboxes and automation endpoints alike. Configured by
 * `CHARTER_WEBHOOK_URL`, which is server-only — it is deliberately not
 * `NEXT_PUBLIC_`, so it never reaches a browser bundle.
 */
function webhookAdapter(url: string): SubmissionAdapter {
  return {
    name: 'webhook',
    deliver: async (request) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            source: 'bookmycharter.in',
            receivedAt: new Date().toISOString(),
            request,
          }),
          // A slow destination must not hold the request open indefinitely.
          signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) {
          return { ok: false, error: `Delivery endpoint returned ${response.status}` };
        }
        return { ok: true, reference: `BMC-${Date.now().toString(36).toUpperCase()}` };
      } catch {
        // The reason is deliberately not echoed to the client: it can carry
        // the endpoint URL or internal detail.
        return { ok: false, error: 'Delivery failed' };
      }
    },
  };
}


/**
 * The CRM adapter.
 *
 * Configured by three server-only variables, none of them `NEXT_PUBLIC_`:
 *
 * - `CHARTER_CRM_URL`      the endpoint that receives the POST. Required.
 * - `CHARTER_CRM_AUTH`     the full value of the auth header, exactly as the
 *                          CRM expects it — for example `Bearer abc123`. Omit
 *                          if the endpoint is unauthenticated.
 * - `CHARTER_CRM_AUTH_HEADER`  the header name, defaulting to `authorization`.
 *                          Set it to `x-api-key` and the like where the CRM
 *                          does not use the standard header.
 *
 * The body is flat and explicitly named rather than nested, because the CRM
 * field mapping is done on the receiving side and a flat object is what maps
 * cleanly. `source` and `receivedAt` are added by us; everything else is the
 * validated request exactly as the person typed it.
 *
 * Note what this does NOT do: it does not retry, and it does not queue. A
 * failed delivery returns `ok: false` and the API turns that into a 502 with
 * the phone number, so the person is told immediately rather than being given
 * a reference for an enquiry nobody received. Retry belongs in a durable
 * queue, not in a request handler that the browser is waiting on.
 */
function crmAdapter(url: string): SubmissionAdapter {
  return {
    name: 'crm',
    deliver: async (request) => {
      const headers: Record<string, string> = { 'content-type': 'application/json' };
      const auth = process.env.CHARTER_CRM_AUTH;
      if (auth) {
        headers[(process.env.CHARTER_CRM_AUTH_HEADER ?? 'authorization').toLowerCase()] = auth;
      }

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            source: 'bookmycharter.in',
            receivedAt: new Date().toISOString(),
            ...request,
          }),
          signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) {
          return { ok: false, error: `CRM returned ${response.status}` };
        }
        return { ok: true, reference: `BMC-${Date.now().toString(36).toUpperCase()}` };
      } catch {
        // Never echoed to the client: it can carry the endpoint URL or a token.
        return { ok: false, error: 'Delivery failed' };
      }
    },
  };
}

/**
 * The configured adapter, or null when none is.
 *
 * Server-side only. Called per request rather than memoised so that changing
 * the environment variable takes effect without a rebuild.
 */
export function resolveAdapter(): SubmissionAdapter | null {
  const provider = process.env.CHARTER_SUBMISSION_PROVIDER as SubmissionProvider | undefined;
  const webhookUrl = process.env.CHARTER_WEBHOOK_URL;

  if (provider === 'webhook' || (!provider && webhookUrl)) {
    if (!webhookUrl) return null;
    return webhookAdapter(webhookUrl);
  }

  const crmUrl = process.env.CHARTER_CRM_URL;
  if (provider === 'crm' || (!provider && crmUrl)) {
    if (!crmUrl) return null;
    return crmAdapter(crmUrl);
  }

  // 'email' stays declared in the type so the gap is visible in code rather
  // than remembered. It is not implemented, because it is not the chosen
  // destination.
  return null;
}

export function isSubmissionConfigured(): boolean {
  return resolveAdapter() !== null;
}
