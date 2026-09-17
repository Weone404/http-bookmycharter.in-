import type { Metadata } from 'next';
import { metadataForRoute } from '@/lib/metadata';
import { requireService } from '@/data/services';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

const PATH = '/services/aerial-flower-dropping' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function Page() {
  return <ServicePageTemplate service={requireService(PATH)} />;
}
