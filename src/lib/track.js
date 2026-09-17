'use client';

/**
 * Fire a GA4 event. Safe to call before gtag loads or when GA is unset.
 * Mark whatsapp_click and call_click as Key Events in the GA4 UI.
 */
export function track(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

/** Capture the GA4 client_id so a confirmed booking can be attributed later. */
export function withClientId(callback) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    callback(null);
    return;
  }
  const id = process.env.NEXT_PUBLIC_GA_ID;
  window.gtag('get', id, 'client_id', callback);
}
