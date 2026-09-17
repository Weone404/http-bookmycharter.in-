import Client from './Client';
import { pageMetadata } from '../../lib/site';
import { JsonLd } from '../../components/JsonLd';
import { graph, organizationSchema, webPageSchema, breadcrumbSchema } from '../../lib/schema';
import { getFleetImageCategories } from '../../lib/fleetImages';

const PATH = '/booking';
const TITLE = 'Book Kedarnath & Char Dham Helicopter Tickets';
const DESC =
  'Send a booking request for Kedarnath, Badrinath or Char Dham helicopter yatra. Seats are confirmed on WhatsApp +91 93556 11996.';

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH, index: false });

export default function Booking() {
  const aircraftOptions = getFleetImageCategories().flatMap((category) =>
    category.aircraft.map(({ name, category: aircraftCategory }) => ({
      name,
      category: aircraftCategory,
    })),
  );
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Booking', path: PATH },
          ]),
        ])}
      />
      <Client aircraftOptions={aircraftOptions} />
    </>
  );
}
