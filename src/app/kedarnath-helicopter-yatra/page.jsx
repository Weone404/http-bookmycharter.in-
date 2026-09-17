import Link from 'next/link';
import { JsonLd } from '../../components/JsonLd';
import { FaqSection } from '../../components/FaqSection';
import { FAQS, CHARDHAM_PACKAGES } from '../../data/bookmychardhamData';
import { PRICING, pageMetadata, formatPrice, whatsappLink, CONTACT, LAST_MODIFIED } from '../../lib/site';
import {
  graph, organizationSchema, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema,
} from '../../lib/schema';

const PATH = '/kedarnath-helicopter-yatra';
const TITLE = 'Kedarnath Helicopter Yatra | Price & Booking';
const DESC =
  'Kedarnath helicopter yatra from Dehradun and the Phata, Sersi and Guptkashi helipads. Same-day darshan from Rs 95,000 per seat. Call +91 93556 11996.';

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const PKG = CHARDHAM_PACKAGES.find((p) => p.id === 'kedarnath-same-day');
const PRICE = PRICING['kedarnath-same-day'];
const WA = whatsappLink('Hello Book My CharDham, I want to book the Kedarnath helicopter yatra. Please share available dates.');

// Weight limits, VIP darshan and weather. Verbatim from the ops FAQ set.
const PAGE_FAQS = FAQS.slice(0, 3);

const HELIPADS = [
  {
    name: 'Phata',
    detail:
      'The busiest of the valley shuttle pads, on the Rudraprayag–Kedarnath highway. Shortest hop to Kedarnath of the three lower pads.',
  },
  {
    name: 'Sersi',
    detail:
      'A few kilometres past Phata and slightly higher. Used heavily as an alternate when Phata is saturated or weather closes one approach.',
  },
  {
    name: 'Guptkashi',
    detail:
      'Lowest and furthest of the three, which makes it the most weather-tolerant. The longest flight to Kedarnath, and usually the cheapest sector.',
  },
  {
    name: 'Sitapur',
    detail:
      'Close to Phata, used mostly for overflow and as a road-head staging point when the highway is congested during peak darshan weeks.',
  },
];

export default function KedarnathHelicopterYatra() {
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Kedarnath Helicopter Yatra', path: PATH },
          ]),
          serviceSchema({
            name: 'Kedarnath Helicopter Yatra',
            description: DESC,
            path: PATH,
            price: PRICE.perSeat,
            priceType: 'Per seat, same-day return ex-Dehradun',
          }),
          faqSchema(PAGE_FAQS, PATH),
        ])}
      />

      <article className="w-full bg-[#F3E9D0] text-[#6B4E3D]">
        <div className="max-w-[68ch] mx-auto px-5 sm:px-8 pt-28 pb-24" style={{ fontSize: '18px', lineHeight: 1.65 }}>

          <nav aria-label="Breadcrumb" className="text-[13px] text-[#A67C52] mb-6">
            <Link href="/" className="hover:text-[#6B4E3D] underline underline-offset-4">Home</Link>
            <span className="mx-2">/</span>
            <span aria-current="page">Kedarnath Helicopter Yatra</span>
          </nav>

          <h1
            className="font-bold tracking-tight text-[#6B4E3D] mb-6"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', lineHeight: 1.15, textWrap: 'balance' }}
          >
            Kedarnath Helicopter Yatra
          </h1>

          {/* Answer block: self-contained, liftable, numbers in each sentence. */}
          <p className="text-[19px] leading-relaxed mb-8">
            A Kedarnath helicopter yatra flies you from Dehradun or one of the valley
            helipads to the temple and back the same day, in roughly {PKG.duration.replace(/^Same Day \(|\)$/g, '')}.
            Seats start at {formatPrice(PRICE.perSeat)} per person, and a full private
            charter of the aircraft is {formatPrice(PRICE.charter)}. The temple sits at
            11,755 ft, so every passenger is weighed before boarding and luggage is
            capped at 5 kg.
          </p>

          <p className="text-[13px] text-[#A67C52] border-y border-[#A67C52]/25 py-3 mb-10">
            Last updated {LAST_MODIFIED[PATH]} &middot; Written from our own dispatch
            desk &middot; Questions: {CONTACT.phoneDisplay}
          </p>

          <h2 className="font-bold text-[#6B4E3D] mt-12 mb-4" style={{ fontSize: '1.4rem' }}>
            What does a Kedarnath helicopter ticket cost?
          </h2>
          <p className="mb-5">
            <strong>{formatPrice(PRICE.perSeat)} per seat for the same-day return from
            Dehradun, or {formatPrice(PRICE.charter)} to charter the whole aircraft.</strong>{' '}
            The per-seat fare covers the round trip, VIP darshan coordination, ground
            transfers and temple taxes. It does not cover puja samagri, or hotels and
            meals if weather strands you overnight.
          </p>

          <div className="overflow-x-auto my-8">
            <table className="w-full text-[15px] border-collapse" style={{ fontVariantNumeric: 'tabular-nums' }}>
              <caption className="text-left text-[13px] text-[#A67C52] mb-3">
                Kedarnath same-day helicopter yatra, {PKG.duration}
              </caption>
              <thead>
                <tr className="border-b-2 border-[#A67C52]/40 text-left">
                  <th scope="col" className="py-3 pr-4 font-bold">Option</th>
                  <th scope="col" className="py-3 pr-4 font-bold">Price</th>
                  <th scope="col" className="py-3 font-bold">Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#A67C52]/20">
                  <td className="py-3 pr-4">Shared seat</td>
                  <td className="py-3 pr-4 font-bold">{formatPrice(PRICE.perSeat)}</td>
                  <td className="py-3">Per person, return</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Private charter</td>
                  <td className="py-3 pr-4 font-bold">{formatPrice(PRICE.charter)}</td>
                  <td className="py-3">Whole aircraft, one family</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-bold text-[#6B4E3D] mt-12 mb-4" style={{ fontSize: '1.4rem' }}>
            Which helipad do you fly from?
          </h2>
          <p className="mb-5">
            Two different journeys go by the same name. The Dehradun flight leaves from
            Sahastradhara and covers the whole distance by air. The valley shuttle is a
            short hop from one of four pads on the Kedarnath highway, which you reach by
            road first.
          </p>
          <dl className="my-6 space-y-5">
            {HELIPADS.map((h) => (
              <div key={h.name}>
                <dt className="font-bold text-[17px]">{h.name}</dt>
                <dd className="m-0 text-[#6B4E3D]/85">{h.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mb-5">
            If you are booking for parents in their seventies, ask us on WhatsApp which
            pad we would put them on for your specific date. It changes with the weather
            pattern that week, and it is not a decision worth making off a webpage.
          </p>

          <h2 className="font-bold text-[#6B4E3D] mt-12 mb-4" style={{ fontSize: '1.4rem' }}>
            How does the day actually run?
          </h2>
          <ol className="my-6 space-y-4 list-decimal pl-5">
            {PKG.itinerary.map((step) => (
              <li key={step.dayOrTime}>
                <strong>{step.dayOrTime} &mdash; {step.title}.</strong>{' '}
                <span className="text-[#6B4E3D]/85">{step.description}</span>
              </li>
            ))}
          </ol>

          <h2 className="font-bold text-[#6B4E3D] mt-12 mb-4" style={{ fontSize: '1.4rem' }}>
            Are you the official IRCTC helicopter booking?
          </h2>
          <p className="mb-5">
            <strong>No, and you should know the difference before you pay anyone.</strong>{' '}
            Government shuttle seats for the Kedarnath sector are sold through the
            Uttarakhand portal at{' '}
            <a
              href="https://heliyatra.irctc.co.in"
              rel="noopener nofollow"
              className="underline underline-offset-4 text-[#8B6639] font-semibold"
            >
              heliyatra.irctc.co.in
            </a>
            . Book My CharDham is a private charter operator. We arrange chartered
            flights and package yatras, which is a separate thing from the government
            shuttle lottery. Anyone telling you they are the official portal, or that
            they can guarantee you a government shuttle seat, is not being straight
            with you.
          </p>

          <h2 className="font-bold text-[#6B4E3D] mt-12 mb-4" style={{ fontSize: '1.4rem' }}>
            What is included, and what is not
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 my-6">
            <div>
              <h3 className="font-bold text-[15px] uppercase tracking-wide text-[#A67C52] mb-3">Included</h3>
              <ul className="space-y-2 text-[16px] list-disc pl-5">
                {PKG.inclusions.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[15px] uppercase tracking-wide text-[#A67C52] mb-3">Not included</h3>
              <ul className="space-y-2 text-[16px] list-disc pl-5">
                {PKG.exclusions.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>

          <h2 className="font-bold text-[#6B4E3D] mt-12 mb-4" style={{ fontSize: '1.4rem' }}>
            When can you actually fly?
          </h2>
          <p className="mb-5">
            The temple is open roughly May to November. Kapat closes for winter and
            nothing flies between November and April, whatever anyone sells you. In
            practice the two workable windows are May to June and September to October.
            The Kedarnath opening date is announced on Maha Shivratri each year, so the
            calendar is not fixed far in advance.
          </p>
          <p className="mb-5">
            Here is the part most operators leave off the page: this is a
            weather-dependent flight in a narrow Himalayan valley, and the pilot decides.
            A booked seat is not a guaranteed departure on your chosen morning. Plan a
            spare day into the trip. If you cannot, take the road option instead of
            hoping.
          </p>

          <div className="my-10 p-6 bg-[#D9C7B8] border border-[#A67C52]/30">
            <p className="m-0 mb-4 font-bold text-[17px]">
              Check dates for your group
            </p>
            <p className="m-0 mb-5 text-[16px] text-[#6B4E3D]/85">
              Tell us the travel window, number of passengers and their approximate
              weights. We will come back with what is flyable and from which pad.
            </p>
            <a
              href={WA}
              rel="noopener"
              className="inline-flex items-center justify-center font-bold text-[15px] bg-[#6B4E3D] text-[#F3E9D0] px-6 hover:bg-[#8B6639] transition-colors"
              style={{ minHeight: '48px' }}
            >
              Ask on WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center justify-center font-bold text-[15px] border border-[#6B4E3D] px-6 ml-3 hover:bg-[#6B4E3D] hover:text-[#F3E9D0] transition-colors"
              style={{ minHeight: '48px' }}
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>

          <h2 className="font-bold text-[#6B4E3D] mt-12 mb-4" style={{ fontSize: '1.4rem' }}>
            Related
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <Link href="/char-dham-yatra-by-helicopter" className="underline underline-offset-4 text-[#8B6639]">
                Char Dham yatra by helicopter, all four dhams in five days
              </Link>
            </li>
            <li>
              <Link href="/private-helicopter-charter" className="underline underline-offset-4 text-[#8B6639]">
                Private helicopter charter for VIP and emergency movement
              </Link>
            </li>
            <li>
              <Link href="/helicopter-flower-dropping" className="underline underline-offset-4 text-[#8B6639]">
                Aerial flower dropping for weddings and temple events
              </Link>
            </li>
            <li>
              <Link href="/contact" className="underline underline-offset-4 text-[#8B6639]">
                Departure points and how to reach our dispatch desk
              </Link>
            </li>
          </ul>
        </div>

        <FaqSection
          faqs={PAGE_FAQS}
          heading="What people ask before booking Kedarnath"
          waMessage="Hello Book My CharDham, I have a question about the Kedarnath helicopter yatra."
        />
      </article>
    </>
  );
}
