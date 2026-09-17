import Client from './Client';
import { pageMetadata } from '../../lib/site';
import { JsonLd } from '../../components/JsonLd';
import { graph, organizationSchema, webPageSchema, breadcrumbSchema } from '../../lib/schema';

const PATH = '/about';
const TITLE = 'About Book My CharDham | Helicopter Charter Operator';
const DESC =
  'Book My CharDham is an independent helicopter charter operator for Char Dham and Kedarnath yatra, based in Dwarka, New Delhi. Call +91 93556 11996.';

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function About() {
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: PATH },
          ]),
        ])}
      />
      <Client />
    </>
  );
}
