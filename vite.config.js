import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sitemapPaths } from './src/lib/seo.js'

// Emits canonical/OG/JSON-LD tags, sitemap.xml and robots.txt. The absolute
// URLs need the production origin, so they are only written when
// VITE_SITE_URL is set (e.g. https://www.example.com).
function siteMeta(siteUrl) {
  const origin = siteUrl.replace(/\/+$/, '')
  return {
    name: 'site-meta',
    transformIndexHtml() {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: 'Selves & Spaces',
        description: 'Mental health practice offering therapy, assessments, workshops and school programmes.',
        telephone: '+919677175894',
        email: 'selvesandspaces@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Adyar, Chennai',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        ...(origin && { url: origin, image: `${origin}/Hero.jpeg` }),
      }
      const tags = [
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(jsonLd), injectTo: 'head' },
      ]
      if (origin) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${origin}/Hero.jpeg` }, injectTo: 'head' },
        )
      }
      return tags
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Disallow: /q/']
      if (origin) {
        robots.push(`Sitemap: ${origin}/sitemap.xml`)
        const urls = sitemapPaths().map((p) => `  <url><loc>${origin}${p === '/' ? '/' : p}</loc></url>`)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
        })
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [
      react(),
      tailwindcss(),
      siteMeta(env.VITE_SITE_URL ?? ''),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
