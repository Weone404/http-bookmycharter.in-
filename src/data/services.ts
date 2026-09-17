import type { Service } from '@/types/service';
import type { Path } from '@/types/common';
import { PRIVATE_CHARTER_SERVICES } from './services-private-charter';
import { HELICOPTER_SERVICES } from './services-helicopter';
import { SPECIALIST_SERVICES } from './services-specialist';

/** Every service page, in one list. Split by cluster for editing only. */
export const SERVICES: readonly Service[] = [
  ...PRIVATE_CHARTER_SERVICES,
  ...HELICOPTER_SERVICES,
  ...SPECIALIST_SERVICES,
];

const BY_PATH = new Map<string, Service>(SERVICES.map((s) => [s.canonical, s]));

export function serviceByPath(path: Path): Service | undefined {
  return BY_PATH.get(path);
}

/** Fails loudly at build time rather than rendering an empty page. */
export function requireService(path: Path): Service {
  const service = BY_PATH.get(path);
  if (!service) throw new Error(`No service content for ${path}. Add it to src/data/services*.ts`);
  return service;
}
