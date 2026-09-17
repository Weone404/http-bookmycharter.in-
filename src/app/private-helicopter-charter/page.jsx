import Client from './Client';
import { pageMetadata } from '../../lib/site';
import { JsonLd } from '../../components/JsonLd';
import {
  graph, organizationSchema, webPageSchema, breadcrumbSchema, serviceSchema,
} from '../../lib/schema';

const PATH = '/private-helicopter-charter';
const TITLE = 'Private Helicopter Charter India | VIP & Emergency';
const DESC =
  'Private helicopter charter across India for VIP travel, corporate movement and emergency medical transfer. Enquire on +91 93556 11996.';

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function Charter() {
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Private Helicopter Charter', path: PATH },
          ]),
          serviceSchema({
            name: 'Private Helicopter Charter',
            description: DESC,
            path: PATH,
            price: null,
          }),
        ])}
      />
      <Client />
    </>
  );
}
