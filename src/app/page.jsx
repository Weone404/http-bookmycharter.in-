import Client from './Client';
import { HomePage } from '../components/pages/HomePage';
import { pageMetadata } from '../lib/site';
import { JsonLd } from '../components/JsonLd';
import { graph, organizationSchema, websiteSchema, webPageSchema, breadcrumbSchema } from '../lib/schema';

const TITLE = 'Private Jet & Helicopter Charter Services in India | BookMyChardham';
const DESC =
  'BookMyChardham arranges private jet charter, business jet charter, helicopter charter, aircraft charter, and charter flight services across India for business, leisure, and pilgrimage travel.';

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: '/' });

export default function Home() {
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          websiteSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: '/' }),
          breadcrumbSchema([{ name: 'Home', path: '/' }]),
        ])}
      />
      <Client />
      <HomePage />
    </>
  );
}
