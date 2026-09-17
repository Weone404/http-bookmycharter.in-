import Client from './Client';
import { JsonLd } from '../../components/JsonLd';
import { FaqSection } from '../../components/FaqSection';
import { FAQS } from '../../data/bookmychardhamData';
import { PRICING, pageMetadata } from '../../lib/site';
import {
  graph, organizationSchema, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema,
} from '../../lib/schema';

const PATH = '/helicopter-flower-dropping';
const TITLE = 'Helicopter Flower Dropping for Weddings & Events';
const DESC =
  'Aerial flower shower by helicopter for weddings, temple mahotsav and public events. Needs 15-21 days for NOC clearance. Call +91 93556 11996.';

// The lead-time question is the one that decides whether a wedding date is even possible.
const PAGE_FAQS = FAQS.slice(3);

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function FlowerDropping() {
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Helicopter Flower Dropping', path: PATH },
          ]),
          serviceSchema({
            name: 'Aerial Flower Dropping by Helicopter',
            description: DESC,
            path: PATH,
            price: PRICING['flower-royal-wedding'].charter,
            priceType: 'Per event, starting price',
          }),
          faqSchema(PAGE_FAQS, PATH),
        ])}
      />
      <Client />
      <FaqSection
        faqs={PAGE_FAQS}
        heading="Before you fix the date"
        waMessage="Hello Book My CharDham, I want to enquire about helicopter flower dropping for an event."
      />
    </>
  );
}
