import type { Metadata } from 'next';
import { metadataForRoute } from '@/lib/metadata';
import { CONTACT } from '@/lib/site';
import { LegalPage } from '@/components/content/LegalPage';

const PATH = '/privacy' as const;

export const metadata: Metadata = metadataForRoute(PATH);

/**
 * Describes what this site actually does today and nothing more. When the
 * charter request form is connected to a destination (docs/BUSINESS-DATA-
 * REQUIRED I7) and analytics are configured, this page is updated in the same
 * change rather than describing them in advance.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      path={PATH}
      title="Privacy policy"
      summary="This page explains what information Book My Charter collects through this website, why, and what happens to it."
      updated="2026-09-17"
      sections={[
        {
          heading: 'What we collect',
          paragraphs: [
            'If you submit a charter request, we collect the details you enter: your route, dates, passenger numbers, any requirements you describe, and your name, phone number and email address so that we can reply to you.',
            'We do not ask for payment details through this website, and no part of this site collects them.',
          ],
        },
        {
          heading: 'Why we collect it',
          paragraphs: [
            'Solely to respond to your enquiry and to arrange the charter you asked about. A charter cannot be quoted without knowing where you are going, when, and how many people are travelling.',
            'We do not sell your information, and we do not share it for advertising.',
          ],
        },
        {
          heading: 'Who it is shared with',
          paragraphs: [
            'Arranging a charter requires sharing the operational details of your trip with the aircraft operator who will fly it. That is limited to what the flight requires — route, dates, passenger numbers and names where required for the flight.',
            'We do not share your contact details more widely than the enquiry requires.',
          ],
        },
        {
          heading: 'Analytics',
          paragraphs: [
            'This website may use standard web analytics to understand which pages are read and how people move through the site. Where analytics are enabled, they are configured to measure page usage rather than to identify individuals.',
          ],
        },
        {
          heading: 'How long it is kept',
          paragraphs: [
            'Enquiry details are kept for as long as needed to handle the enquiry and any resulting travel, and for the period required by applicable record-keeping obligations.',
          ],
        },
        {
          heading: 'Your choices',
          paragraphs: [
            `You can ask what information we hold about you, ask for it to be corrected, or ask us to delete it, by contacting ${CONTACT.email} or calling ${CONTACT.phoneDisplay}.`,
          ],
        },
      ]}
    />
  );
}
