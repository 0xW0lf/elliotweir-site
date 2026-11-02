import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elliotweir.co.uk',
  markdown: { syntaxHighlight: 'prism' },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://ipapi.co https://rdap.org https://rdap.arin.net https://rdap.db.ripe.net https://rdap.apnic.net https://rdap.lacnic.net https://rdap.afrinic.net https://dns.google",
        "frame-src https://www.openstreetmap.org",
      ],
    },
  },
  integrations: [sitemap({
    filter: (page) => !new URL(page).pathname.startsWith('/style-guide'),
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
