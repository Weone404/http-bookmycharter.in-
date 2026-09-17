import Client from './Client';
import { JsonLd } from '../../components/JsonLd';
import { FaqSection } from '../../components/FaqSection';
import { FAQS } from '../../data/bookmychardhamData';
import { PRICING, pageMetadata } from '../../lib/site';
import {
  graph, organizationSchema, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema,
} from '../../lib/schema';

const PATH = '/char-dham-yatra-by-helicopter';
const TITLE = 'Char Dham Yatra by Helicopter | Packages & Price';
const DESC =
  'Char Dham yatra by helicopter from Dehradun covering Yamunotri, Gangotri, Kedarnath and Badrinath. 5 days / 4 nights. Call +91 93556 11996.';

// Weight limits, VIP darshan and weather - the three things people ask before paying.
const PAGE_FAQS = FAQS.slice(0, 3);

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function Chardham() {
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Char Dham Yatra by Helicopter', path: PATH },
          ]),
          serviceSchema({
            name: 'Char Dham Yatra by Helicopter',
            description: DESC,
            path: PATH,
            price: PRICING['chardham-4-dham-package'].perSeat,
            priceType: 'Per person, 5 days / 4 nights ex-Dehradun',
          }),
          faqSchema(PAGE_FAQS, PATH),
        ])}
      />
      <Client />
      <FaqSection
        faqs={PAGE_FAQS}
        heading="Questions people ask before booking Char Dham"
        waMessage="Hello Book My CharDham, I have a question about the Char Dham helicopter package."
      />
    </>
  );
}
