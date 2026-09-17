import { CONTACT, whatsappLink } from '../lib/site';

/**
 * Server-rendered FAQ block. Content lands in the static HTML, so the
 * matching FAQPage JSON-LD is backed by text a reader actually sees.
 */
export function FaqSection({ faqs, heading = 'Questions people ask before booking', waMessage }) {
  if (!faqs?.length) return null;

  return (
    <section
      id="faq"
      className="w-full bg-[#F3E9D0] py-16 sm:py-20 px-5 sm:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[68ch] mx-auto">
        <h2
          id="faq-heading"
          className="text-[#6B4E3D] font-bold tracking-tight mb-8"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
        >
          {heading}
        </h2>

        <dl className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-[#A67C52]/25 pb-8 last:border-0">
              <dt className="text-[#6B4E3D] font-bold text-[17px] leading-snug mb-3">
                {faq.question}
              </dt>
              <dd
                className="text-[#6B4E3D]/85 m-0"
                style={{ fontSize: '17px', lineHeight: 1.65 }}
              >
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-[#6B4E3D]/80 text-[15px]">
          Still unsure about something?{' '}
          <a
            href={whatsappLink(waMessage || 'Hello Book My CharDham, I have a question about helicopter booking.')}
            className="text-[#8B6639] font-bold underline underline-offset-4 decoration-[#A67C52]/50 hover:text-[#A67C52]"
            rel="noopener"
          >
            Ask on WhatsApp
          </a>{' '}
          or call {CONTACT.phoneDisplay}. We answer flight-planning questions before you pay anything.
        </p>
      </div>
    </section>
  );
}
