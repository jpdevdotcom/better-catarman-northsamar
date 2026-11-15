// Writes sitemap.xml from the pages `nuxt generate` actually produced, so it can never list a
// page that doesn't exist or miss one that does. Runs after every `pnpm generate`.
// Leaves out redirects, error pages, and pages marked noindex (QR posters, search, report).
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const SITE = 'https://bettercatarman.org'
const ROOT = '.output/public'

const pages = []
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (name !== '_nuxt') walk(p)
    }
    else if (name === 'index.html') {
      const html = readFileSync(p, 'utf8')
      if (/http-equiv="refresh"/.test(html) || /name="robots" content="noindex/.test(html)) continue
      // Pages drawn in the browser have no content in the file; they are noindex anyway.
      if (!/<h1/.test(html)) continue
      const path = `/${relative(ROOT, dir)}`.replace(/\/$/, '') || '/'
      pages.push(path === '' ? '/' : path)
    }
  }
}
walk(ROOT)
pages.sort((a, b) => a.split('/').length - b.split('/').length || a.localeCompare(b))

const today = new Date().toISOString().slice(0, 10)
const priority = p => (p === '/' ? '1.0' : p.split('/').length === 2 ? '0.8' : '0.6')
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${SITE}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(join(ROOT, 'sitemap.xml'), xml)
console.log(`sitemap.xml: ${pages.length} pages`)
