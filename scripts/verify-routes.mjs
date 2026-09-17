/**
 * Route registry integrity check.
 *
 * Every route declared `status: 'live'` must have a page file, and every page
 * file must be declared in the registry. This is what stops the sitemap from
 * advertising a URL that 404s, and stops a page from existing that nothing
 * links to — the two failure modes the previous site shipped with.
 *
 * Runs as part of `npm run verify`.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const APP_DIR = path.join('src', 'app');

async function findPages(dir, base = '') {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_') || entry.name === 'api') continue;
      found.push(...(await findPages(path.join(dir, entry.name), `${base}/${entry.name}`)));
    } else if (entry.name === 'page.tsx') {
      found.push(base === '' ? '/' : base);
    }
  }
  return found;
}

const source = await readFile(path.join('src', 'lib', 'routes.ts'), 'utf8');

// Pair each declared path with the status that follows it in the same entry.
const declared = [];
const entryPattern = /path:\s*'([^']+)'[\s\S]*?status:\s*'(live|planned)'/g;
let match;
while ((match = entryPattern.exec(source)) !== null) {
  declared.push({ path: match[1], status: match[2] });
}

if (declared.length === 0) {
  throw new Error('Parsed no routes from src/lib/routes.ts.');
}

const pages = new Set(await findPages(APP_DIR));
const live = declared.filter((r) => r.status === 'live').map((r) => r.path);
const declaredPaths = new Set(declared.map((r) => r.path));

// Dynamic segments are matched by their template, not by each generated URL.
const isCovered = (p) =>
  pages.has(p) || [...pages].some((page) => page.includes('[') && p.startsWith(page.split('/[')[0]));

const missingPages = live.filter((p) => !isCovered(p));
const unregistered = [...pages].filter((p) => !declaredPaths.has(p) && !p.includes('['));

let failed = false;
if (missingPages.length > 0) {
  failed = true;
  console.error('Routes marked live with no page file:');
  for (const p of missingPages) console.error(`  ${p}`);
}
if (unregistered.length > 0) {
  failed = true;
  console.error('Pages that exist but are not in the route registry:');
  for (const p of unregistered) console.error(`  ${p}`);
}

if (failed) {
  console.error('\nFix src/lib/routes.ts or add the missing page.');
  process.exit(1);
}

console.log(
  `routes: ${declared.length} declared · ${live.length} live · ${pages.size} page files · consistent`,
);
