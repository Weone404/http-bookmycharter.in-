import type { Metadata } from 'next';
import { metadataForRoute } from '@/lib/metadata';
import { SITE } from '@/lib/site';
import { LegalPage } from '@/components/content/LegalPage';

const PATH = '/terms' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function TermsPage() {
  return (
    <LegalPage
      path={PATH}
      title="Terms of Use"
      summary="These terms cover the use of this website and the charter request service offered through it."
      updated="2026-09-17"
      sections={[
        {
          heading: 'What this website is',
          paragraphs: [
            `${SITE.name} publishes information about private aviation and charter, and provides a way to request a charter. Submitting a request is an enquiry, not a booking, and creates no obligation on either side until a specific charter is confirmed in writing.`,
          ],
        },
        {
          heading: 'Information on this site',
          paragraphs: [
            'Aircraft specifications shown on this site are typical for the type and vary with variant, options, weight, altitude and temperature. They are not specific to any individual airframe, and they are not a representation that a particular aircraft is available.',
            'Explanations of how charter costs are built are general. They describe the components of a quote; they are not a quotation and do not constitute an offer.',
          ],
        },
        {
          heading: 'Availability and operations',
          paragraphs: [
            'Aircraft availability is confirmed at the time a specific charter is arranged, and is subject to the operator, the aircraft and the conditions applicable to the flight.',
            'The decision to operate any flight rests with the aircraft operator and its commander. Weather, airspace, airport and site conditions, technical matters and regulatory requirements can delay, reroute or prevent a flight, and those decisions are safety decisions rather than commercial ones.',
          ],
        },
        {
          heading: 'Links to other sites',
          paragraphs: [
            'This site links to other websites for information. We are not responsible for the content of sites we do not operate.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'These terms may be updated. The date at the top of this page shows when they were last changed.',
          ],
        },
      ]}
    />
  );
}
