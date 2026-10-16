# Elliot Buckland-Weir portfolio

Static Astro site for https://elliotweir.co.uk.

## Local development

Use Node.js 22.12 or later and install dependencies with `npm ci`.

- Start: `npm run dev -- --background`
- Status: `npm run dev -- status`
- Logs: `npm run dev -- logs`
- Stop: `npm run dev -- stop`

Use the URL reported by the server. Keep only one development server running.
Stop development before a production build, then restart it afterwards; this avoids
stale Astro/Vite state in an already-running preview.

## Production

Run `npm run build` and publish the generated `dist` directory to the static host.
The build command is `npm run build`; the output directory is `dist`.
The host should serve `404.html` for unknown paths and redirect HTTP to HTTPS.
Verify the custom domain, certificate, navigation, and external lookup tools after deployment.

The CV PDF is maintained separately and should be reviewed before publishing CV updates.

## Research

Posts live in `src/content/research`. Set `draft: true` in frontmatter to keep an
unfinished article out of page generation, research listings, and the sitemap.
Remove the flag or set it to false when the article is ready to publish.
The style guide is available for local design reference but excluded from search indexing.
