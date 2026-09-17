import type { Metadata } from 'next';
import { metadataForRoute } from '@/lib/metadata';
import { CHARDHAM_HUB } from '@/data/chardham';
import { ChardhamTemplate } from '@/components/content/ChardhamTemplate';

const PATH = '/chardham' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function Page() {
  return <ChardhamTemplate page={CHARDHAM_HUB} />;
}
