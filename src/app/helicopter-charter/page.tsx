import type { Metadata } from 'next';
import { metadataForRoute } from '@/lib/metadata';
import { requireService } from '@/data/services';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

const PATH = '/helicopter-charter' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function Page() {
  return <ServicePageTemplate service={requireService(PATH)} />;
}
