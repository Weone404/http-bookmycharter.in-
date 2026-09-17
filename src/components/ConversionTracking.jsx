'use client';

import { useEffect } from 'react';

export function ConversionTracking() {
  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') || '';

      let event = null;
      if (href.startsWith('tel:')) event = 'call_click';
      else if (href.includes('wa.me') || href.includes('api.whatsapp.com')) event = 'whatsapp_click';
      if (!event) return;

      if (typeof window.gtag === 'function') {
        window.gtag('event', event, {
          page_path: window.location.pathname,
          link_url: href,
          link_text: (a.textContent || '').trim().slice(0, 100),
        });
      }
    }

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
