import { ContactPage } from '../../components/pages/ContactPage';
import { pageMetadata } from '../../lib/site';
import { JsonLd } from '../../components/JsonLd';
import { graph, organizationSchema, webPageSchema, breadcrumbSchema } from '../../lib/schema';

const PATH = '/contact';
const TITLE = 'Contact Book My CharDham | +91 93556 11996';
const DESC =
  'Reach the flight dispatch desk for Kedarnath, Badrinath and Char Dham helicopter bookings. Call or WhatsApp +91 93556 11996.';

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function Contact() {
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: PATH },
          ]),
        ])}
      />
      <ContactPage />
    </>
  );
}
