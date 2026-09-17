/**
 * Post-build forensic check against the BUILT HTML, not the source tree.
 *
 * Source-tree checks miss what the framework emits. Every defect this catches —
 * a broken internal link, a duplicate H1, invalid JSON-LD, a sitemap entry with
 * no page, old branding — was present in the previous site and passed source
 * review.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const APP = path.join('.next', 'server', 'app');

async function htmlFiles(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await htmlFiles(full, acc);
    else if (e.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const files = await htmlFiles(APP);
const pages = new Map();
for (const f of files) pages.set(f, await readFile(f, 'utf8'));

const problems = [];
const urlOf = (f) => {
  const rel = path.relative(APP, f).replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel}`;
};

const built = new Set([...pages.keys()].map(urlOf));

// 1. Exactly one H1 per page.
for (const [f, html] of pages) {
  const n = (html.match(/<h1[\s>]/g) ?? []).length;
  if (n !== 1) problems.push(`${urlOf(f)}: ${n} <h1> elements (expected 1)`);
}

// 2. Canonical present, absolute, on the right host.
//    /_not-found is excluded: a 404 response should not claim a canonical URL.
for (const [f, html] of pages) {
  if (urlOf(f) === '/_not-found') continue;
  const m = /<link rel="canonical" href="([^"]+)"/.exec(html);
  if (!m) { problems.push(`${urlOf(f)}: no canonical`); continue; }
  if (!m[1].startsWith('https://bookmycharter.in')) problems.push(`${urlOf(f)}: canonical ${m[1]}`);
}

// 3. JSON-LD parses and every node has a @type.
for (const [f, html] of pages) {
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      for (const node of data['@graph'] ?? []) {
        if (!node['@type']) problems.push(`${urlOf(f)}: JSON-LD node without @type`);
      }
    } catch (err) {
      problems.push(`${urlOf(f)}: invalid JSON-LD (${err.message})`);
    }
  }
}

// 4. Internal links resolve to a built page.
const KNOWN_NON_PAGE = new Set(['/sitemap.xml', '/robots.txt']);
for (const [f, html] of pages) {
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1] === '' ? '/' : m[1].replace(/\/$/, '') || '/';
    if (KNOWN_NON_PAGE.has(href)) continue;
    if (href.startsWith('/_next') || href.startsWith('/images') || href.includes('.')) continue;
    if (!built.has(href)) problems.push(`${urlOf(f)}: links to ${href} which has no built page`);
  }
}

// 5. Old branding must not appear outside two legitimate uses: the deliberate
//    sister-site link, and this site's own /chardham cluster URLs and labels.
//    Both are removed before the sweep so that what remains is a genuine leak.
const CHARDHAM_ALLOWED = [
  /https?:\\?\/\\?\/www\.bookmychardham\.in/gi,
  /bookmychardham\.in/gi,
  /Book My CharDham/g,
  /\\?\/chardham(?:\\?\/[a-z-]+)?/gi,
  /char-?dham-yatra[a-z-]*/gi,
  /Char Dham/g,
  /Chardham/g,
  // This site's own /chardham route segment, as the RSC payload serialises it:
  // a quoted bare segment name in the router tree and in the route registry.
  /\\+"chardham\\+"/gi,
  /"chardham"/gi,
];
for (const [f, html] of pages) {
  let stripped = html;
  for (const pattern of CHARDHAM_ALLOWED) stripped = stripped.replace(pattern, '');
  const leaks = [...stripped.matchAll(/chardham/gi)];
  if (leaks.length > 0) {
    problems.push(`${urlOf(f)}: ${leaks.length} unaccounted "chardham" occurrences`);
  }
}

// 6. Sitemap entries must all have a built page.
const sitemapFile = path.join(APP, 'sitemap.xml.body');
try {
  const xml = await readFile(sitemapFile, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const p = loc.replace('https://bookmycharter.in', '') || '/';
    if (!built.has(p)) problems.push(`sitemap lists ${p} with no built page`);
  }
  console.log(`sitemap: ${locs.length} URLs`);
} catch {
  problems.push('no sitemap.xml.body in the build output');
}

console.log(`pages built: ${built.size}`);
if (problems.length > 0) {
  console.error(`\n${problems.length} problems:`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log('build verification: clean');
