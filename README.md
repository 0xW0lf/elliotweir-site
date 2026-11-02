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

## Security maintenance

Run `npm ci`, `npm audit`, `npm run build`, then `npm run check:build` before release.
The Security and build workflow supplied with the maintenance handover runs these
checks on dev/main pushes and pull requests once added through GitHub. The current
push credential cannot create workflow files. Dependabot proposes npm and GitHub
Actions updates weekly against dev.
Branch protection and personal notification preferences are managed in GitHub settings.

Astro generates a CSP with hashes for executable inline scripts and styles. Code
highlighting uses Prism classes to avoid inline style exceptions. The policy allows
the public lookup providers and OpenStreetMap used by the tools. `public/_headers`
adds HSTS for this host, frame protection, MIME protection and browser feature limits
on the static host. Verify headers on the deployed domain after hosting changes.

The scoped selector-parser override keeps Tailwind typography on its current version
while using the patched compatible 6.x parser. Revisit it when typography updates its
own dependency; do not remove it without repeating the audit and rendering checks.
