#!/usr/bin/env node
/**
 * Ping IndexNow (Bing, Yandex, Naver, Seznam) with changed URLs.
 *
 *   npm run indexnow              # submit every URL in the sitemap
 *   npm run indexnow -- /kedarnath-helicopter-yatra /char-dham-yatra-by-helicopter
 *
 * Run it after any deploy that changes prices, dates or page copy — the whole
 * point of the seasonal calendar is that an announcement reaches the index the
 * same day it is made.
 */
const KEY = process.env.INDEXNOW_KEY || 'd42c78fbf8d97894f6bdfbcfbbf54dfa';
const HOST = 'www.bookmychardham.in';
const ORIGIN = `https://${HOST}`;

// Kept in step with app/sitemap.js. /booking is noindex, so it is not submitted.
const ALL = [
  '/',
  '/kedarnath-helicopter-yatra',
  '/char-dham-yatra-by-helicopter',
  '/helicopter-flower-dropping',
  '/private-helicopter-charter',
  '/about',
  '/contact',
];

const args = process.argv.slice(2);
const paths = args.length ? args : ALL;
const urlList = paths.map((p) => (p.startsWith('http') ? p : `${ORIGIN}${p}`));

const body = { host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList };

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

// 200 = accepted, 202 = accepted but key still being validated. Both are fine.
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow ${res.status}: submitted ${urlList.length} URL(s)`);
  urlList.forEach((u) => console.log('  ' + u));
} else {
  console.error(`IndexNow failed ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exit(1);
}
