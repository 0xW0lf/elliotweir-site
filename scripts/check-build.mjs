import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const root = resolve('dist');
function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}
const pages = files(root).filter((path) => path.endsWith('.html'));
assert(pages.length > 0, 'Build the site before checking it');
for (const path of pages) {
  const html = readFileSync(path, 'utf8');
  const policy = html.match(/http-equiv="content-security-policy" content="([^"]*)"/i)?.[1];
  assert(policy?.includes("object-src 'none'"), `Missing CSP: ${path}`);
  assert(!policy.includes("'unsafe-inline'"), `Unsafe inline policy: ${path}`);
  for (const [, tag, attrs, text] of html.matchAll(/<(script|style)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    // JSON-LD is an inert data block, not executable JavaScript.
    if (/\bsrc=/.test(attrs) || /type="application\/ld\+json"/.test(attrs)) continue;
    const hash = 'sha256-' + createHash('sha256').update(text).digest('base64');
    assert(policy.includes(hash), `CSP does not authorise inline ${tag}: ${path}`);
  }
  for (const [, url] of html.matchAll(/(?:href|src)="(\/(?!\/)[^"#?]*)/g)) {
    const asset = join(root, decodeURIComponent(url));
    assert(existsSync(asset) || existsSync(join(asset, 'index.html')), `Broken local asset/link ${url}: ${path}`);
  }
}
const headers = readFileSync(join(root, '_headers'), 'utf8');
for (const expected of ["frame-ancestors 'none'", 'X-Frame-Options: DENY', 'Strict-Transport-Security: max-age=31536000', 'X-Content-Type-Options: nosniff']) {
  assert(headers.includes(expected), `Missing security header: ${expected}`);
}
console.log(`Checked ${pages.length} pages: CSP, inline script/style hashes, internal links/assets and security headers.`);
