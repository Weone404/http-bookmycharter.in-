'use client';

import { useState } from 'react';
import { Minus, Plus, Users } from 'lucide-react';

/**
 * Passenger count.
 *
 * A stepper rather than a dropdown of 1 to 20. Charter parties are small — the
 * overwhelming majority are between one and eight — so the common case is one
 * or two taps, against a dropdown's open-scroll-select every time. The number
 * is still a real `<input>`, so it can be typed into, tabbed to, and read by a
 * screen reader as a spin button, and larger groups are not locked out by the
 * length of a list.
 */
export function PassengerField({
  id,
  name,
  label = 'Passengers',
  defaultValue = 2,
  max = 200,
  tone = 'dark',
}: {
  readonly id: string;
  readonly name: string;
  readonly label?: string;
  readonly defaultValue?: number;
  readonly max?: number;
  readonly tone?: 'dark' | 'light';
}) {
  const [count, setCount] = useState(defaultValue);
  const dark = tone === 'dark';

  const clamp = (next: number) => Math.min(max, Math.max(1, next));

  const button = dark
    ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 text-[var(--color-ink-inverse)] transition-colors hover:border-[var(--color-accent)] disabled:opacity-35'
    : 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-hairline-strong)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent-strong)] disabled:opacity-35';

  return (
    <div>
      <span
        className={`block text-[length:var(--text-micro)] tracking-[0.14em] uppercase ${
          dark ? 'text-[var(--color-ink-inverse-muted)]' : 'text-[var(--color-ink-muted)]'
        }`}
        id={`${id}-label`}
      >
        {label}
      </span>

      <div
        className={`mt-1 flex items-center gap-2 ${
          dark
            ? 'border-b border-white/25 py-[0.3125rem]'
            : 'rounded-[var(--radius-control)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-2 py-[0.3125rem]'
        }`}
      >
        <Users
          className={`h-4 w-4 shrink-0 ${
            dark ? 'text-[var(--color-ink-inverse-muted)]' : 'text-[var(--color-ink-muted)]'
          }`}
          aria-hidden="true"
        />
        <button
          type="button"
          className={button}
          onClick={() => setCount((value) => clamp(value - 1))}
          disabled={count <= 1}
          aria-label="One fewer passenger"
        >
          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <input
          id={id}
          name={name}
          type="number"
          inputMode="numeric"
          min={1}
          max={max}
          required
          value={count}
          aria-labelledby={`${id}-label`}
          onChange={(event) => {
            const next = Number.parseInt(event.target.value, 10);
            setCount(Number.isNaN(next) ? 1 : clamp(next));
          }}
          className={`no-spinner numeric w-full min-w-0 bg-transparent text-center text-[length:var(--text-body)] focus:outline-none ${
            dark ? 'text-[var(--color-ink-inverse)]' : 'text-[var(--color-ink)]'
          }`}
        />

        <button
          type="button"
          className={button}
          onClick={() => setCount((value) => clamp(value + 1))}
          disabled={count >= max}
          aria-label="One more passenger"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
