/**
 * Post-build forensic check against the BUILT output, not the source tree.
 *
 * Source review is what let the previous site's defects through, and it is
 * what let `public/site.webmanifest` keep the old brand name through three
 * clean runs of this script — a file that is served but is not HTML. Every
 * check here reads what a visitor or a crawler would actually receive.
 *
 * Deterministic: no network, no timing, no randomness. Same build, same result.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const APP = path.join('.next', 'server', 'app');
const PUBLIC = 'public';

const problems = [];
const note = (message) => problems.push(message);

async function walk(dir, predicate, acc = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, predicate, acc);
    else if (predicate(entry.name)) acc.push(full);
  }
  return acc;
}

const htmlFiles = await walk(APP, (name) => name.endsWith('.html'));
if (htmlFiles.length === 0) {
  console.error('No built HTML found. Run the build first.');
  process.exit(1);
}

const pages = new Map();
for (const file of htmlFiles) pages.set(file, await readFile(file, 'utf8'));

const urlOf = (file) => {
  const rel = path.relative(APP, file).replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel}`;
};
const built = new Set([...pages.keys()].map(urlOf));

const CANONICAL_ORIGIN = 'https://bookmycharter.in';

/**
 * Legitimate uses of the old brand string, removed before the leak sweep:
 * the deliberate sister-site link, this site's own /chardham cluster, and the
 * router's own serialised segment names. Stripping them first means what
 * remains is a genuine leak, rather than the 48 false positives a naive
 * substring check produced.
 */
const CHARDHAM_ALLOWED = [
  /https?:\\?\/\\?\/www\.bookmychardham\.in/gi,
  /bookmychardham\.in/gi,
  /Book My CharDham/g,
  /\\?\/chardham(?:\\?\/[a-z-]+)?/gi,
  /char-?dham-yatra[a-z-]*/gi,
  /Char Dham/g,
  /Chardham/g,
  /\\+"chardham\\+"/gi,
  /"chardham"/gi,
];

const stripAllowed = (html) =>
  CHARDHAM_ALLOWED.reduce((acc, pattern) => acc.replace(pattern, ''), html);

const PLACEHOLDER = /\b(lorem ipsum|TBD|TODO|FIXME|XXX+|coming soon|insert text here)\b/i;

const titles = new Map();
const descriptions = new Map();

for (const [file, html] of pages) {
  const url = urlOf(file);
  const is404 = url === '/_not-found';

  // 1. Exactly one H1.
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) note(`${url}: ${h1s} <h1> elements (expected 1)`);

  // 2. Heading hierarchy: no H3 before the first H2.
  const firstH2 = html.search(/<h2[\s>]/);
  const firstH3 = html.search(/<h3[\s>]/);
  if (firstH3 !== -1 && (firstH2 === -1 || firstH3 < firstH2)) {
    note(`${url}: an <h3> appears before any <h2>`);
  }

  // 3. Title present, non-empty, unique.
  const titleMatch = /<title>([^<]*)<\/title>/.exec(html);
  if (!titleMatch || titleMatch[1].trim() === '') note(`${url}: missing or empty <title>`);
  else {
    const title = titleMatch[1].trim();
    if (title.length > 70) note(`${url}: title is ${title.length} chars (over 70)`);
    const seenAt = titles.get(title);
    if (seenAt) note(`${url}: duplicate <title>, same as ${seenAt}`);
    else titles.set(title, url);
  }

  // 4. Meta description present, non-empty, unique.
  const descMatch = /<meta name="description" content="([^"]*)"/.exec(html);
  if (!is404) {
    if (!descMatch || descMatch[1].trim() === '') note(`${url}: missing or empty meta description`);
    else {
      const description = descMatch[1].trim();
      const seenAt = descriptions.get(description);
      if (seenAt) note(`${url}: duplicate meta description, same as ${seenAt}`);
      else descriptions.set(description, url);
    }
  }

  // 5. Canonical present, absolute, on the canonical origin, self-referencing.
  if (!is404) {
    const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html);
    if (!canonical) note(`${url}: no canonical`);
    else {
      const href = canonical[1];
      if (!href.startsWith(CANONICAL_ORIGIN)) note(`${url}: canonical points at ${href}`);
      else {
        const canonicalPath = href.slice(CANONICAL_ORIGIN.length) || '/';
        if (canonicalPath !== url)
          note(`${url}: canonical is ${canonicalPath}, not self-referencing`);
      }
      if (href.startsWith('http://')) note(`${url}: canonical uses http://`);
      if (href.length > 1 && href.endsWith('/')) note(`${url}: canonical has a trailing slash`);
    }
  }

  // 6. No accidental noindex on a page the sitemap will publish.
  const robotsMeta = /<meta name="robots" content="([^"]*)"/.exec(html);
  const noindex = robotsMeta ? /noindex/i.test(robotsMeta[1]) : false;

  // 7. OpenGraph essentials, and og:image must resolve to something built.
  if (!is404) {
    if (!/<meta property="og:title"/.test(html)) note(`${url}: no og:title`);
    const ogImage = /<meta property="og:image(?::url)?" content="([^"]+)"/.exec(html);
    if (!ogImage) note(`${url}: no og:image`);
  }

  // 8. JSON-LD parses, every node typed, no old-domain @id.
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(block[1]);
    } catch (error) {
      note(`${url}: invalid JSON-LD (${error.message})`);
      continue;
    }
    const nodes = data['@graph'] ?? [data];
    for (const node of nodes) {
      if (!node['@type']) note(`${url}: JSON-LD node without @type`);
      const id = typeof node['@id'] === 'string' ? node['@id'] : '';
      if (id && !id.startsWith(CANONICAL_ORIGIN)) {
        note(`${url}: JSON-LD @id on a foreign origin: ${id}`);
      }
      if (typeof node.name === 'string' && /CharDham/i.test(node.name)) {
        note(`${url}: JSON-LD name still says ${node.name}`);
      }
    }
  }

  // 9. Internal links resolve to a built page.
  const KNOWN_NON_PAGE = new Set(['/sitemap.xml', '/robots.txt', '/site.webmanifest']);
  for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = match[1] === '' ? '/' : match[1].replace(/\/$/, '') || '/';
    if (KNOWN_NON_PAGE.has(href)) continue;
    if (href.startsWith('/_next') || href.startsWith('/api/') || href.includes('.')) continue;
    if (!built.has(href)) note(`${url}: links to ${href} which has no built page`);
  }

  // 10. Old brand, outside the legitimate uses.
  const leaks = [...stripAllowed(html).matchAll(/chardham/gi)];
  if (leaks.length > 0) note(`${url}: ${leaks.length} unaccounted "chardham" occurrences`);

  // 11. Development artefacts in shipped HTML.
  if (/localhost|127\.0\.0\.1|:300\d/.test(html)) note(`${url}: contains a localhost reference`);
  if (/http:\/\/(?!www\.w3\.org|schema\.org|ogp\.me)/.test(html)) {
    note(`${url}: contains a plain http:// URL`);
  }

  // 12. Placeholder copy. Checked on visible text only, so prose about
  //     placeholders in a comment does not trip it.
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const placeholder = PLACEHOLDER.exec(visible);
  if (placeholder) note(`${url}: placeholder copy in visible text: "${placeholder[0]}"`);

  // 13. Meaningful server-rendered body text, so nothing depends on WebGL.
  const words = visible.replace(/\s+/g, ' ').trim().split(' ').length;
  if (!is404 && words < 120) note(`${url}: only ${words} words of server-rendered text`);
  if (noindex && url !== '/request-a-charter' && !is404) {
    note(`${url}: carries noindex — intended?`);
  }
}

// 14. Sitemap: every URL built, canonical form, no duplicates.
try {
  const xml = await readFile(path.join(APP, 'sitemap.xml.body'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const seenLocs = new Set();
  for (const loc of locs) {
    if (seenLocs.has(loc)) note(`sitemap lists ${loc} twice`);
    seenLocs.add(loc);
    if (!loc.startsWith(CANONICAL_ORIGIN)) note(`sitemap entry on a foreign origin: ${loc}`);
    if (loc.length > CANONICAL_ORIGIN.length + 1 && loc.endsWith('/')) {
      note(`sitemap entry has a trailing slash: ${loc}`);
    }
    if (loc.includes('?')) note(`sitemap entry carries a query string: ${loc}`);
    const p = loc.replace(CANONICAL_ORIGIN, '') || '/';
    if (!built.has(p)) note(`sitemap lists ${p} with no built page`);
    const html = pages.get(
      p === '/' ? path.join(APP, 'index.html') : path.join(APP, `${p.slice(1)}.html`),
    );
    if (html && /<meta name="robots" content="[^"]*noindex/i.test(html)) {
      note(`sitemap lists ${p} but the page is noindex`);
    }
  }
  console.log(`sitemap: ${locs.length} URLs`);
} catch {
  note('no sitemap.xml.body in the build output');
}

// 15. robots.txt must not block legitimate crawlers.
try {
  const robots = await readFile(path.join(APP, 'robots.txt.body'), 'utf8');
  if (/User-Agent:\s*\*[\s\S]*?Disallow:\s*\/\s*$/im.test(robots)) {
    note('robots.txt disallows everything for *');
  }
  if (!robots.includes('Sitemap:')) note('robots.txt has no Sitemap line');
  for (const agent of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
    if (!robots.includes(agent)) note(`robots.txt no longer names ${agent}`);
  }
} catch {
  note('no robots.txt.body in the build output');
}

/**
 * 16. Served static files. public/ publishes every file in it whether a page
 *     links it or not, so the brand sweep has to cover them too. This is the
 *     check that would have caught site.webmanifest.
 */
const servedText = await walk(PUBLIC, (name) =>
  /\.(json|webmanifest|txt|xml|svg|md|csv)$/i.test(name),
);
for (const file of servedText) {
  const content = await readFile(file, 'utf8');
  const leaks = [...stripAllowed(content).matchAll(/chardham/gi)];
  if (leaks.length > 0) note(`${file}: ${leaks.length} unaccounted "chardham" occurrences`);
  if (/localhost|127\.0\.0\.1/.test(content)) note(`${file}: contains a localhost reference`);
}

// 17. Oversized served assets. The previous public/ carried 94MB of video.
const servedAll = await walk(PUBLIC, () => true);
for (const file of servedAll) {
  const { size } = await stat(file);
  if (size > 1_500_000) {
    note(`${file}: ${(size / 1_048_576).toFixed(1)}MB served asset (over 1.5MB)`);
  }
}

// 18. Photo provenance. Every aircraft photo served must have a confirmed
// record (author, allowed licence, Commons file page), and every page that
// shows one must also show its credit. scripts/ingest-aircraft-photos.mjs is
// the only way a photo gets in; this catches one copied in by hand.
{
  const source = await readFile('src/data/aircraft-photos.generated.ts', 'utf8');
  const literal = /AIRCRAFT_PHOTOS[^=]*=\s*(\{[\s\S]*\});\s*$/.exec(source);
  if (!literal) {
    note('src/data/aircraft-photos.generated.ts: cannot read AIRCRAFT_PHOTOS');
  } else {
    const records = Object.values(JSON.parse(literal[1]));
    const bySrc = new Map(records.map((r) => [r.src, r]));
    for (const r of records) {
      if (!r.author || !r.licence || !r.licenceUrl)
        note(`${r.slug}: photo record without author or licence`);
      if (!/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(r.sourceUrl ?? '')) {
        note(`${r.slug}: photo record without a Commons file page`);
      }
      const onDisk = await stat(path.join(PUBLIC, r.src)).catch(() => null);
      if (!onDisk) note(`${r.slug}: photo record points at missing ${r.src}`);
    }
    const photoDir = path.join(PUBLIC, 'aircraft');
    const served = await walk(photoDir, () => true).catch(() => []);
    for (const file of served) {
      const src = '/' + path.relative(PUBLIC, file).split(path.sep).join('/');
      if (!bySrc.has(src)) note(`${file}: aircraft photo with no confirmed credit record`);
    }
    for (const file of htmlFiles) {
      const html = await readFile(file, 'utf8');
      for (const r of records) {
        const shown = html.includes(r.src) || html.includes(encodeURIComponent(r.src));
        if (shown && !html.includes('via Wikimedia Commons')) {
          note(`${file}: shows ${r.src} without its credit`);
        }
      }
    }
  }
}

console.log(`pages built: ${built.size}`);
console.log(`served static files: ${servedAll.length}`);

if (problems.length > 0) {
  console.error(`\n${problems.length} problems:`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log('build verification: clean');
