'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

/**
 * Filters a list rendered on the server: every item carries `data-q` (its
 * searchable text), and non-matching items are hidden. The full list stays in
 * the HTML, so nothing is lost for readers without JavaScript or for search
 * engines.
 */
export function AreaFilter({
  target,
  placeholder,
  total,
  noun,
}: {
  target: string;
  placeholder: string;
  total: number;
  noun: string;
}) {
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(total);

  useEffect(() => {
    const root = document.getElementById(target);
    if (!root) return;
    const needle = q.trim().toLowerCase().replace(/\s+/g, ' ');
    let n = 0;
    root.querySelectorAll<HTMLElement>('[data-q]').forEach((el) => {
      const hit = !needle || (el.dataset.q ?? '').includes(needle);
      el.hidden = !hit;
      if (hit) n += 1;
    });
    setShown(n);
  }, [q, target]);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[var(--radius-pill)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface)] px-4 py-2.5 focus-within:ring-2 focus-within:ring-[var(--color-accent)] sm:max-w-md">
        <Search className="h-4 w-4 shrink-0 text-[var(--color-ink-muted)]" aria-hidden="true" />
        <span className="sr-only">{placeholder}</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--color-ink-muted)]"
        />
      </label>
      <p className="numeric text-[length:var(--text-small)] text-[var(--color-ink-muted)]" aria-live="polite">
        {shown === total ? `${total.toLocaleString('en-IN')} ${noun}` : `${shown.toLocaleString('en-IN')} of ${total.toLocaleString('en-IN')} ${noun}`}
      </p>
    </div>
  );
}
