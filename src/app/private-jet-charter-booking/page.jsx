import { JsonLd } from '../../components/JsonLd';
import { PrivateAviationPage } from '../../components/pages/PrivateAviationPage';
import { privateAviationPages } from '../../data/privateAviationPages';
import { pageMetadata } from '../../lib/site';
import { graph, organizationSchema, webPageSchema, breadcrumbSchema, serviceSchema, faqSchema } from '../../lib/schema';

const PATH = '/private-jet-charter-booking';
const PAGE = privateAviationPages[PATH.replace('/', '')];
const TITLE = PAGE.title;
const DESC = PAGE.description;

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: PAGE.header, path: PATH },
          ]),
          serviceSchema({ name: PAGE.header, description: DESC, path: PATH, price: null }),
          faqSchema(PAGE.faqs, PATH),
        ])}
      />
      <PrivateAviationPage
        {...PAGE}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: PAGE.header, href: PATH }]}
      />
    </>
  );
}
