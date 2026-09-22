import { NextResponse } from 'next/server';
import { resolveAdapter } from '@/lib/charter-submission';
import {
  MAX_PAYLOAD_BYTES,
  requestFingerprint,
  validateCharterRequest,
} from '@/lib/charter-validation';

/**
 * The charter request endpoint.
 *
 * Protections, in the order they apply:
 *   1. payload cap        — reject anything oversized before parsing it
 *   2. honeypot           — discard silently, report success to the bot
 *   3. server validation  — every field re-checked and sanitised server-side
 *   4. rate limit         — per client, in-process
 *   5. duplicate window   — same person, same trip, same date
 *
 * None of this needs a dependency. The rate limiter is in-process, which on a
 * serverless platform means per instance rather than global — it raises the
 * cost of casual abuse and is honest about not being a global control. A
 * platform rule (Vercel WAF or equivalent) is the durable answer and is
 * recorded in docs/DEPLOYMENT.md.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const DEDUPE_WINDOW_MS = 30 * 60 * 1000;

const hits = new Map<string, number[]>();
const seen = new Map<string, number>();

function sweep(now: number): void {
  for (const [key, times] of hits) {
    const kept = times.filter((t) => now - t < RATE_WINDOW_MS);
    if (kept.length === 0) hits.delete(key);
    else hits.set(key, kept);
  }
  for (const [key, time] of seen) {
    if (now - time > DEDUPE_WINDOW_MS) seen.delete(key);
  }
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  const now = Date.now();
  sweep(now);

  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: 'Request too large.' }, { status: 413 });
  }

  const key = clientKey(request);
  const times = hits.get(key) ?? [];
  if (times.length >= RATE_MAX) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please call or message us instead.' },
      { status: 429 },
    );
  }
  hits.set(key, [...times, now]);

  const raw = await request.text();
  if (raw.length > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: 'Request too large.' }, { status: 413 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }

  const outcome = validateCharterRequest(parsed);

  // Honeypot: the bot is told everything went well and nothing is delivered.
  if (outcome.trap) {
    return NextResponse.json({ ok: true, reference: 'received' }, { status: 200 });
  }

  if (!outcome.valid || !outcome.request) {
    return NextResponse.json(
      { ok: false, error: 'Some details need correcting.', errors: outcome.errors },
      { status: 422 },
    );
  }

  const fingerprint = requestFingerprint(outcome.request);
  const previous = seen.get(fingerprint);
  if (previous !== undefined && now - previous < DEDUPE_WINDOW_MS) {
    return NextResponse.json(
      { ok: false, error: 'We already have this request and will be in touch.', duplicate: true },
      { status: 409 },
    );
  }

  const adapter = resolveAdapter();
  if (!adapter) {
    // No destination is configured. The endpoint refuses rather than accepting
    // an enquiry nobody will ever see.
    return NextResponse.json(
      { ok: false, error: 'Online submission is not connected yet.', unavailable: true },
      { status: 503 },
    );
  }

  const result = await adapter.deliver(outcome.request);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: 'We could not send that just now. Please call or message us.' },
      { status: 502 },
    );
  }

  seen.set(fingerprint, now);
  return NextResponse.json({ ok: true, reference: result.reference }, { status: 200 });
}

/** Anything other than POST is not part of this endpoint's contract. */
export function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed.' }, { status: 405 });
}
