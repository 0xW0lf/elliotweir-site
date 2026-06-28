import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://elliotweir.co.uk',
  integrations: [sitemap()],
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});