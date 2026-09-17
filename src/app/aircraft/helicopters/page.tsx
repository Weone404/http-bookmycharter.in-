import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { metadataForRoute } from '@/lib/metadata';
import { categoryPageBySlug } from '@/data/aircraft-categories';
import { AircraftCategoryTemplate } from '@/components/aircraft/AircraftCategoryTemplate';

const PATH = '/aircraft/helicopters' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function Page() {
  const page = categoryPageBySlug('helicopters');
  if (!page) notFound();
  return <AircraftCategoryTemplate page={page} />;
}
