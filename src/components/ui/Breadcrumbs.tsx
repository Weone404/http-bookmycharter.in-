import Link from 'next/link';
import type { Path } from '@/types/common';
import { breadcrumbTrail } from '@/lib/routes';

/**
 * Visible breadcrumbs, built from the same registry as the BreadcrumbList
 * schema, so the two can never disagree.
 */
export function Breadcrumbs({ path }: { path: Path }) {
  const trail = breadcrumbTrail(path);
  if (trail.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-[length:var(--text-small)]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 opacity-70">
        {trail.map((route, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={route.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page">{route.label}</span>
              ) : (
                <>
                  <Link href={route.path} className="hover:text-[var(--color-cyan-accent)]">
                    {route.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
