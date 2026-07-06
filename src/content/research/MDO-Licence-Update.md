---
title: "Microsoft Defender for Office 365 Plan 1 Rollout Caught Us by Surprise"
description: "While investigating unexpected URL rewriting in Exchange Online, we discovered Microsoft had enabled Defender for Office 365 Plan 1 as part of its rollout to Microsoft 365 E3 tenants."
pubDate: "2026-07-07"
tags:
  - microsoft365
  - defender
  - office365
  - exchange
  - email-security
  - m365
  - blog
---

# Microsoft Defender for Office 365 Plan 1 Rollout Caught Us by Surprise

## What Happened Today

A user messaged me today reporting issues with URL rewrites appearing in One Time Sign-In links. When I started investigating, I noticed the rewritten URLs were coming from Exchange Online. Since we already use a third‑party email security platform for URL rewriting, seeing Microsoft modify links wasn’t something I expected.

## Why This Was Confusing

My first assumption was that a policy had changed or someone had misconfigured something. But the more I checked, the more it looked like something had changed in the tenant itself rather than in our configuration.

## The Actual Cause

Later on, we came across Microsoft’s announcement confirming that **Microsoft Defender for Office 365 Plan 1 is now rolling out to Microsoft 365 E3 and Office 365 E3 tenants**.

We hadn’t seen the announcement beforehand, so the new licensing caught us off guard. That explained why the investigation felt so odd, Defender features had quietly become available without us realising.

Once we knew about the rollout, the behaviour made complete sense.

## What’s Included in Plan 1

Microsoft is now bundling **Defender for Office 365 Plan 1** with E3 licences at no extra cost. This adds several features that previously required additional licensing:

- Safe Links  
- Safe Attachments  
- Enhanced anti‑phishing  
- Malicious URL and attachment protection  
- Other Defender email security capabilities  

As this rolls out, admins may suddenly see new Defender features active even if they already use another email security solution.

## Things to Check in Your Tenant

If you’re seeing unexpected URL rewriting or new Defender behaviour, it’s worth reviewing:

- Whether Defender for Office 365 Plan 1 has recently been enabled  
- Safe Links policies (new ones may have been created automatically)  
- Preset Security Policies  
- Existing mail flow and transport rules  
- Any overlap with your third‑party email security platform  

## Takeaway

This wasn’t a service issue or a misconfiguration, it was simply Microsoft enabling new licensing before we’d seen the announcement. If your organisation already uses another email security platform, it’s worth checking whether Defender for Office 365 Plan 1 has been activated. Otherwise, you may end up troubleshooting behaviour that’s just part of the rollout.

## References

Microsoft’s announcement:  
https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/microsoft-defender-for-office-365-plan-1-is-now-rolling-out-to-microsoft-365-e3-/4527287

## Further Reading

A detailed technical write-up covering Microsoft Defender for Office 365 Plan 1, Safe Links, licensing changes, policy configuration, and operational considerations is currently in progress and will be linked here once published.