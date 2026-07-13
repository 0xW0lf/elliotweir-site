---
title: "Microsoft Defender for Office 365 Plan 1 Technical Write-Up"
description: "Technical notes on Microsoft Defender for Office 365 Plan 1, Safe Links behaviour, policy overlap, and operational checks after the E3 rollout."
pubDate: "2026-07-13"
tags:
  - microsoft365
  - defender
  - office365
  - exchange
  - email-security
  - m365
  - technical-writeup
---

# Microsoft Defender for Office 365 Plan 1 Technical Write-Up

> This write-up is generalised for public sharing. It avoids tenant names, internal tooling names, policy names, screenshots, and exact configuration values.

## Overview

In this technical write-up, I’ll cover Microsoft’s rollout of Microsoft Defender for Office 365 Plan 1 to Microsoft 365 E3 and Office 365 E3 tenants.

Microsoft announced that these changes are expected to be fully rolled out by Fall 2026. Once the rollout reached our tenant, we noticed unexpected email security behaviour, especially around URL rewriting.

At first, this looked like a configuration issue. After investigating, it became clear that new Defender for Office 365 features had become available and were overlapping with existing email security controls.

This write-up explains what changed, what I checked, and what I would review first if I saw similar behaviour again.

## Background

At the time of the investigation, the organisation already used a third-party email security platform. This meant URL rewriting, link inspection, and email protection were already being handled outside of Microsoft Defender for Office 365.

Only a small number of users had Microsoft 365 E3 licensing, so Defender for Office 365 Plan 1 appearing in the tenant was unexpected. It was not something I had been actively looking for, and it was not immediately obvious that a licensing change had introduced new Defender capabilities.

The behaviour mainly affected Microsoft 365 services where users interact with links, including Outlook, Teams, and SharePoint. This made the issue more confusing, because it did not look like a single email problem at first. It looked like link handling had changed across parts of the Microsoft 365 environment.

The key point was that Microsoft Defender for Office 365 was now overlapping with controls we already had in place, especially around Safe Links and URL rewriting.

## Initial Indicator

I first started investigating the issue through the existing third-party email security platform, as URL rewriting was already handled there.

When another user reported the same behaviour, it started to look like a wider issue rather than a one-off problem. I also knew what the existing rewritten URLs normally looked like, so getting a full copy of the affected URL helped confirm that it was not being rewritten by the expected system.

From there, I checked Microsoft documentation and public community posts. That helped point the investigation towards Microsoft Defender for Office 365 and the recent Plan 1 rollout.

## Investigation Steps

Once we had a full copy of the affected URL, it became clear that it did not match the format normally used by the existing third-party email security platform. The link structure, redirect behaviour, and user experience were different from what I expected to see.

At that point, I started looking beyond the existing email security platform and checked Microsoft documentation, public community posts, and Microsoft 365 admin areas. This led me to information about Defender for Office 365 Plan 1 becoming available to E3 tenants.

After that, the URL rewriting behaviour made more sense. The next step was to use Microsoft Learn and the Defender portal to understand where the setting lived, which policy was involved, and how it could overlap with the controls already in place.

The main checks were:

- Reviewing the reported URL behaviour.
- Comparing the rewritten link against the expected third-party format.
- Checking Exchange Online and Defender-related settings.
- Reviewing Safe Links configuration.
- Looking for newly available or active Defender policies.
- Checking whether Preset Security Policies were involved.
- Comparing Microsoft controls with the existing third-party email security platform.

## Licensing Change

According to Microsoft’s community post, Microsoft Defender for Office 365 Plan 1 is being rolled out to eligible E3 tenants, with the rollout expected to complete by Fall 2026.

The important point for admins is that features which were previously unavailable may now appear in the tenant. This can make the portal confusing at first, especially if some menus or options still appear to reference missing licensing.

During the investigation, I saw inconsistent behaviour in the Defender portal. One URL protection area appeared locked because of licensing, while another option was available. Signing out and back into the Defender portal cleared this for me, which suggests the portal had not fully refreshed the available licensing state.

This was a useful reminder that licensing changes can affect both the available features and the admin experience in the portal.

## Defender for Office 365 Plan 1 Features

Microsoft Defender for Office 365 Plan 1 adds extra email and collaboration protection features into Microsoft 365. For this investigation, I was mainly interested in the features that could explain the link behaviour: Safe Links, Safe Attachments, anti-phishing protection, and the extra policy options that became visible in the Defender portal.

These features are useful, but in my case they needed checking because email protection was not starting from a blank slate. There were already controls in place, so I needed to understand what Microsoft had added and whether it was now doing the same job as something else.

### Safe Links

Safe Links provides time-of-click protection for URLs. Instead of only checking a link when the email is delivered, Microsoft can rewrite the link and check it again when the user clicks it.

This made sense once I understood what was happening. A link that was safe when the email arrived may become malicious later, so checking it again at click time is valuable. The confusing part was seeing Microsoft rewritten URLs when I was expecting the existing email security platform to be the system handling link rewriting.

### Safe Attachments

Safe Attachments provides additional protection for email attachments. At a high level, suspicious attachments can be checked before they are delivered or opened by the user.

I did not start this investigation because of an attachment issue, but it was still worth checking because the same overlap problem can apply. If another platform is already scanning attachments, admins need to know whether Microsoft is also scanning them and what behaviour users might see.

### Anti-Phishing Protection

Anti-phishing protection helps detect suspicious messages, spoofing attempts, and impersonation-style attacks. These controls are useful because many real-world attacks rely on users trusting a sender, brand, or domain that looks familiar.

I would not assume the default policy state is right for every tenant. If these protections appear unexpectedly, I would check what is enabled, what is only visible, and what overlaps with existing policy.

### Policy and Reporting Changes

The rollout may also make new policy areas, reports, alerts, or configuration options visible in Microsoft Defender. This was part of what made the issue confusing: options appeared that I was not expecting to be available.

For me, the important lesson was to check both the policy configuration and the licensing state before treating unexpected behaviour as a fault or a misconfiguration.

## Safe Links Behaviour

Safe Links was the most visible change because it affected how URLs appeared to users. When Safe Links is active, Microsoft can rewrite a URL so the click is routed through Microsoft’s protection service first.

The issue I saw was not simply “a URL looked different”. The full rewritten link did not match the format I normally expected. That was the clue that made me look outside the existing email security platform.

This matters most for links that are time-sensitive or authentication-related. One-time sign-in links, password reset links, Teams links, SharePoint links, and other Microsoft 365 links are the sort of workflows I would test carefully if URL rewriting changes.

The key troubleshooting step is to capture the full affected URL. A partial screenshot or copied fragment may not be enough to identify which system rewrote it.

## Policy Overlap

The issue for me was not that Defender for Office 365 Plan 1 became available. The issue was that it introduced controls which could overlap with existing email security controls.

For example, Microsoft Defender and a third-party email security platform may both inspect links, rewrite URLs, and scan attachments. That might be fine in some environments, but it can also create duplicate scanning, confusing user experience, or harder troubleshooting.

This is why control ownership matters. I would want it documented which platform is responsible for URL rewriting, attachment scanning, anti-phishing controls, alerting, and user-facing warnings.

Without that ownership, it becomes harder to answer simple questions such as:

- Which system changed this link?
- Which system blocked this message?
- Which policy caused this behaviour?
- Which portal should an analyst check first?

## Checks I Would Recommend

If I saw this again, these are the areas I would check first:

- Confirm whether Defender for Office 365 Plan 1 is now available in the tenant.
- Review Safe Links policies.
- Review Safe Attachments policies.
- Review Preset Security Policies.
- Review Exchange Online mail flow and transport rules.
- Check whether third-party URL rewriting is already enabled.
- Test known safe links, authentication links, and business-critical workflows.
- Confirm what users will see when links are rewritten.
- Check whether alerts or reports are now appearing in Defender.
- Document which platform owns each email security control.

I would also test with a small number of known links before making broad changes. This helps confirm whether the behaviour is coming from Microsoft Defender, an existing email security platform, or a combination of both.

## Operational Considerations

Before leaving the new controls enabled, I would look at the operational impact as well as the security benefit.

Useful questions to ask:

- Do users need to be told that links may look different?
- Does the helpdesk know what Microsoft rewritten URLs look like?
- Could this create extra alerts or false positives?
- Are authentication links and business-critical workflows still working as expected?
- Is there a clear rollback plan?
- Is there a clear owner for Defender policies?
- Is there a clear owner for the existing third-party email security policies?

The technical change may be small, but the support impact can be larger if users suddenly see unfamiliar links or if analysts are not sure which platform produced an alert.

## Security Value

Even though this rollout caused some confusion, I can see the security value in Defender for Office 365 Plan 1.

Safe Links can help protect users when a URL becomes malicious after delivery. Safe Attachments can add another layer of attachment inspection. Anti-phishing protection can help with spoofing and impersonation attempts. The Microsoft Defender portal also gives more Microsoft-native visibility into email security activity.

For tenants without a dedicated email security platform, these features may be a significant improvement. For tenants that already have email security tooling, the value is still there, but I would review it alongside the existing controls rather than just leaving everything enabled by default.

The important point is that more tools do not automatically mean better protection. The controls need to be understood, tested, and configured properly.

## Risks and Limitations

The main limitation I saw was overlap. If multiple platforms are inspecting and rewriting the same links, troubleshooting becomes harder. Users may also lose confidence if links start looking different without warning.

There is also a risk of assuming the new features are fully configured just because they are visible. Availability does not always mean the policies are configured in the way the tenant expects.

Some workflows need careful testing. This is especially true for one-time sign-in links, password reset links, Teams links, SharePoint links, and other time-sensitive URLs.

The safest approach is to review the policy state, test the user experience, document the expected behaviour, and make sure support teams know what changed.

## What I Learned

The biggest lesson for me was that licensing changes can create real technical changes in a tenant. This did not start as a planned configuration change, but it still changed what was available and affected how links were handled.

I also learned the value of checking the full URL rather than relying on a partial copy or screenshot. Seeing the full rewritten link helped confirm that the behaviour did not match the expected third-party format.

The investigation was a reminder that overlapping security products need clear ownership. If two platforms can perform similar controls, admins need to know which one is expected to handle each part of the email security flow.

Finally, user reports are useful signals. What looked like a small link issue helped uncover a wider platform change.

## Safe Summary

This issue was not caused by a fault or a user mistake. It was the result of new Microsoft Defender for Office 365 capabilities becoming available and interacting with existing email security controls.

The investigation started with unexpected URL rewriting, but the root cause was wider than a single link. Defender for Office 365 Plan 1 had become available in the tenant, which introduced new policy areas and behaviour that needed to be reviewed.

The main lesson was to check licensing, policy state, and overlapping security controls when unexpected Microsoft 365 behaviour appears. This is especially important where a third-party email security platform is already in use.

## References

- [About Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/mdo-about)
- [Microsoft Defender for Office 365 Plan 1 is now rolling out to Microsoft 365 E3](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/microsoft-defender-for-office-365-plan-1-is-now-rolling-out-to-microsoft-365-e3-/4527287)
- [Configure Safe Links policies in Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/safe-links-policies-configure)
- [Configure Safe Attachments policies in Microsoft Defender for Office 365](https://learn.microsoft.com/en-us/defender-office-365/safe-attachments-policies-configure)
