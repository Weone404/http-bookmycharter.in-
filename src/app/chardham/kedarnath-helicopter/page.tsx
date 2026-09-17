import type { Metadata } from 'next';
import { metadataForRoute } from '@/lib/metadata';
import { KEDARNATH_PAGE } from '@/data/chardham';
import { ChardhamTemplate } from '@/components/content/ChardhamTemplate';

const PATH = '/chardham/kedarnath-helicopter' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function Page() {
  return <ChardhamTemplate page={KEDARNATH_PAGE} />;
}
