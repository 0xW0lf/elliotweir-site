---
title: "SecToolBox: July 2026 Overview"
description: "An update on the development of SecToolBox, a personal PowerShell-based security toolkit I'm building to consolidate common triage, investigation, and report generation tasks into a single tool."
pubDate: "2026-07-01"
tags:
  - tooling
  - powershell
  - security
  - automation
  - networking
  - nmap
---

## What I Set Out to Build This Quarter

SecToolBox has come a long way since the initial introduction post. Development has been slower than expected due to migrating away from GitHub Pages, which introduced some unexpected issues — but things are now back on track.

The big milestone this quarter is that SecToolBox has officially moved out of Version 1 (Proof of Concept). All core features are functional and the foundation is solid.

---

## Version Roadmap

### Version 1 — Foundation (Completed)

The proof of concept focused on getting the core functionality working:

- Target input box
- Scan type dropdown
- Run scan button
- Output box displaying raw results

All Version 1 features are working as expected.

---

### Version 2 — Making it a Functional Tool (In Progress)

This is where development currently sits. Version 2 focuses on turning the proof of concept into a genuinely usable tool:

**Completed**
- IP range input support
- Clear output button
- Export to HTML report template
- Custom application icon
- Integrated into the main UI script

**In Progress**
- Disclosure prompt requiring users to confirm they have permission to use Nmap
- Blocking IP range input on Ping scans to prevent errors
- "Are you sure" confirmation prompt
- DNS queries — A, CNAME, and MX record lookups

**Awaiting Start**
- WinForms static window sizing
- GitHub profile link in the UI footer

---

### Version 3 — UI Upgrade (Planned)

The longer term plan is to migrate from PowerShell to C# using Visual Studio. This will allow the tool to be compiled and distributed as a standalone EXE, making it more accessible for others to use.

---

## What's Coming Next Quarter

The focus for next quarter is completing the remaining Version 2 features, particularly the DNS query module and the Nmap disclosure prompt. Once Version 2 is feature complete, the plan is to open SecToolBox up for UAT with a small group of users to gather feedback before moving into the C# migration.

All versions and source code will be made available publicly to demonstrate the development journey.

---

## New Site

Alongside SecToolBox development, this quarter also saw the launch of a completely rebuilt personal site at [elliotweir.co.uk](https://elliotweir.co.uk).

The previous site was hosted via GitHub Pages and encountered a number of issues that contributed to slower post and tool updates. The new site is built with:

- **Astro** — static site generator
- **Tailwind CSS** — styling
- **Cloudflare Pages** — hosting and DNS

The new site includes a Research section for write-ups and development updates like this one, a CV page, and a Tools section currently in development. It also features tag-based filtering, a table of contents on longer posts, and reading time estimates.

---

### Custom Domain Email

As part of the site infrastructure work, a custom domain email has been set up via Zoho Mail with DNS configured through Cloudflare. All contact and professional correspondence now goes through [elliot@elliotweir.co.uk](mailto:elliot@elliotweir.co.uk) rather than a generic email address, giving a more professional and consistent personal brand across the site, CV, and LinkedIn.

---

## Learning and Development

Alongside SecToolBox development, I have been actively working on my formal certifications through TryHackMe.

This quarter I completed and passed **SEC0**, the first in TryHackMe's Security Operations series. While SEC0 covers foundational concepts, it forms part of a structured pathway I am working through this year:

- **SEC0** — Completed ✅
- **SEC1** — Planned 📅
- **SAL1** — Planned 📅

SEC1 and SAL1 are both scheduled for later this year, progressively building on the blue team and SOC analyst skills I am developing both in my day job and through SecToolBox.

You can follow my TryHackMe progress at [tryhackme.com/p/0xW0lf](https://tryhackme.com/p/0xW0lf).

---

## Final Thoughts

Moving out of proof of concept and into a functional tool is a significant milestone. The export to HTML report feature in particular is something I am proud of — turning raw Nmap output into a readable report is genuinely useful for triage and documentation workflows.

The new site and improved hosting setup means updates going forward should be more frequent and reliable.

More updates to follow at the end of Q3.