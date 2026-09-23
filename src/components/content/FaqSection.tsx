import type { Faq } from '@/types/faq';

/**
 * FAQs rendered as real HTML before any FAQPage schema is emitted.
 *
 * Native details/summary: keyboard accessible, works without JavaScript, and
 * the answer text is in the document for a crawler whether or not it is open.
 */
export function FaqSection({
  faqs,
  heading = 'Common questions',
  id = 'faq',
}: {
  faqs: readonly Faq[];
  heading?: string;
  id?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <div id={id}>
      <h2 className="text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
        {heading}
      </h2>
      <div className="mt-8 divide-y divide-current/10 border-t border-current/10">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex cursor-pointer items-start justify-between gap-6 text-[length:var(--text-h3)] font-medium leading-snug marker:content-['']">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-[var(--color-accent)] transition-transform duration-[var(--duration-fast)] group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="mt-4 max-w-[52rem] space-y-4 opacity-80">
              <p>{faq.answer}</p>
              {faq.elaboration?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
