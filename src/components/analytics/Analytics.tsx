'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { isDelegatedEvent, track } from '@/lib/analytics';

/**
 * Measurement, env-gated.
 *
 * With no `NEXT_PUBLIC_GA_ID` this renders nothing and adds no script, which
 * is the state in development and in any deployment where the ID has not been
 * provided (docs/BUSINESS-DATA-REQUIRED I4). It does not fall back to a
 * placeholder ID and it does not warn in the console.
 *
 * `afterInteractive` keeps the tag off the critical path. Analytics must not
 * be the reason a page is slow to become usable.
 */
export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  /**
   * One delegated listener for every `data-track` element on the site —
   * phone links, WhatsApp links, CTAs. A single listener on the document
   * rather than a handler per element, so adding a tracked link is an
   * attribute and nothing re-renders.
   */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const node = target.closest('[data-track]');
      if (!node) return;
      const name = node.getAttribute('data-track');
      if (!name || !isDelegatedEvent(name)) return;
      track(name, {
        path: window.location.pathname,
        ...(node.getAttribute('data-track-label')
          ? { label: node.getAttribute('data-track-label') as string }
          : {}),
      });
    };
    document.addEventListener('click', onClick, { passive: true });
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:true});`}
      </Script>
    </>
  );
}
