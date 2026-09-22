import type { CharterRequest } from '@/types/charter-request';

/**
 * Where a charter request is delivered.
 *
 * The destination is an open business question (docs/BUSINESS-DATA-REQUIRED
 * I7: email, WhatsApp, or the existing CRM). Until it is answered there is no
 * adapter configured, and the API says so plainly rather than accepting a
 * request and dropping it.
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

  // 'email' and 'crm' are declared in the type so the gap is visible in code
  // rather than remembered. Neither is implemented, because neither
  // destination has been chosen.
  return null;
}

export function isSubmissionConfigured(): boolean {
  return resolveAdapter() !== null;
}
