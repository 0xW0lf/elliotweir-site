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

The public CV is available as Word and PDF downloads in `public/`. Keep both aligned
with `/cv` and `/certifications`: SAL1 passed, Terraform Associate first, then planned
AZ-104 and SC-200; SC-300 remains a later option. Review rendered pages after Word
edits and regenerate the PDF from the same source. Public copies omit internal
policy names and configuration details.

Featured case studies live at `/research/conditional-access-case-study` and
`/research/atlas-homelab`; the sitemap includes these automatically during build.
Atlas currently runs Proxmox, VLANs, UniFi, a USG with firewall rules, and Wazuh. Terraform provisioning is planned.

## Research

Posts live in `src/content/research`. Set `draft: true` in frontmatter to keep an
unfinished article out of page generation, research listings, and the sitemap.
Remove the flag or set it to false when the article is ready to publish.
The style guide is available for local design reference but excluded from search indexing.
