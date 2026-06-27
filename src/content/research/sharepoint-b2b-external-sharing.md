---
title: "SharePoint B2B: Behaviour Changes, Security Implications, and Guest Access Controls"
description: "A look at the behaviour changes in SharePoint B2B collaboration, the security implications, and the identity controls implemented."
pubDate: "2026-06-19"
tags:
  - sharepoint
  - entra-id
  - b2b
  - security
  - conditional-access
  - m365
---

## Introduction

During the deployment of SharePoint B2B collaboration, a change was identified in how external sharing behaves within modern Entra ID and SharePoint Online environments.

This post outlines:

- The behaviour change
- The operational impact
- The security implications
- The identity and Conditional Access controls implemented

---

## The Issue Observed

During deployment, external users were unable to access shared SharePoint resources unless they had already been provisioned as Guest users in Entra ID.

This behaviour differed from previous expectations around just-in-time (JIT) sharing using domain-based trust.

---

## External Sharing Behaviour Change

Microsoft have confirmed this behaviour is **intentional** and aligns with the current Entra ID B2B external collaboration and SharePoint Online sharing model.

There is **no service issue or misconfiguration** within the tenant.

---

## SharePoint One-Time Passcode (OTP)

Historically, SharePoint Online supported external access using a One-Time Passcode (OTP) model.

With OTP:

- External users could access shared content using an email address
- A one-time code was sent to their email
- No Entra ID guest account was required

This enabled simple, ad-hoc sharing without identity provisioning.

---

## End of OTP-Based Access

As part of the move to a modern identity-first model, SharePoint OTP-based access is being deprecated in favour of Entra ID B2B guest identities.

This aligns with Microsoft's broader direction toward:

- Centralised identity management
- Conditional Access enforcement
- Zero Trust architecture

---

## Impact of OTP Removal

The removal of OTP-based access introduces a significant behavioural change:

- External users **must now exist as Guest users in Entra ID**
- Access is tied to a managed identity rather than an email address
- Just-in-time (JIT) sharing is no longer supported in the same way

---

## Security Improvements

Moving away from OTP enables:

- Stronger authentication controls (MFA)
- Conditional Access enforcement
- Improved audit and logging capabilities
- Proper lifecycle management of external identities

---

## Operational Considerations

However, this introduces:

- Increased reliance on provisioning workflows
- Additional administrative overhead
- Reduced flexibility for ad-hoc sharing

---

## Summary

The deprecation of SharePoint OTP marks a clear shift from **email-based access** to **identity-based access**.

While this improves security and governance, it requires organisations to adapt their processes to support structured external identity management.

---

## Updated Access Model

The enforced flow now requires external identities to be **pre-provisioned as Guest (B2B) objects in Entra ID** before any SharePoint resource access can be granted.

This removes the ability to perform just-in-time (JIT) sharing to arbitrary external email addresses, even where domain allowlisting is configured.

---

## Old vs New Behaviour

### Previous Model (Implicit Sharing)

- Share content directly to external email
- Guest account created automatically (JIT)
- Domain-based trust enabled flexible sharing

### Current Model (Identity-First)

- Guest must exist in Entra ID first
- Access tied to explicit identity provisioning
- No implicit sharing via domain trust

---

## Current Workflow Requirement

External users must exist as a Guest user (`UserType = Guest`) in Entra ID before access can be granted.

Access is then assigned via:

- Direct permissions
- Microsoft 365 Group membership
- SharePoint sharing links targeting that identity

---

## Validation Summary

Microsoft validated the following with no issues identified:

- SharePoint Online external sharing configuration
- Entra ID External Identities (B2B settings and cross-tenant access)

---

## Why This Change Matters

This shift aligns with Zero Trust principles by moving to an **identity-first access model**.

Benefits include:

- Stronger identity validation
- Improved auditability
- Better lifecycle management of external users

---

## Operational Impact

This change introduces:

- Loss of domain-based implicit trust
- Increased dependency on identity provisioning
- Additional administrative overhead

---

## Net Result

Greater control and visibility over external access, but at the cost of reduced flexibility and increased friction for ad-hoc sharing.

---

## Automation and Identity Governance Improvements

To support this model, several automation and governance improvements were implemented.

### Inactive Guest User Monitoring

A script was developed to identify guest users who have not signed in within the last 45 days.

This enables:

- Identification of dormant accounts
- Reporting on inactive users as a percentage of total guests
- Improved visibility of guest usage

Dormant accounts present a security risk as they may no longer be required, can remain over-permissioned, and increase the attack surface.

### Guest Account Metrics

Reporting includes:

- Total guest users
- Number of inactive accounts
- Percentage of inactive users

This supports visibility, cleanup, and governance.

### Bulk Guest Provisioning

A script was created to import users via CSV, ensuring consistent onboarding, reduced misconfiguration, and scalable provisioning.

---

## Conditional Access Approach

Conditional Access policies are recommended to ensure secure, controlled access for external users by:

- Enforcing **MFA for all guest access**
- Blocking **legacy authentication methods**
- Restricting **high-risk sign-ins**
- Applying **additional controls for medium-risk activity**
- Limiting access strictly to **approved collaboration services (Teams, SharePoint, OneDrive, Exchange)**

These controls align with Zero Trust principles and ensure that external identities are verified, risk is assessed at sign-in, and access is restricted to intended use cases.

---

## Detection Considerations

From a defensive standpoint, the following should be monitored:

- Guest account creation
- Inactive guest accounts
- Unusual sign-in locations
- Access to sensitive resources

Relevant data sources include Entra ID sign-in logs and Microsoft 365 audit logs.

---

## Recommended Approach

- Introduce automation for guest lifecycle management
- Enforce identity-first access controls
- Monitor guest usage and activity
- Gradually implement Conditional Access controls

---

## Lessons Learned

- External access is now identity-driven, not domain-driven
- Pre-provisioning workflows are essential
- Conditional Access is critical for securing external users
- Automation improves scalability and governance

---

## Final Thoughts

Microsoft's move toward identity-first access strengthens security and aligns with Zero Trust principles.

However, organisations must adapt their processes to manage increased operational overhead and changes in collaboration workflows.

With the right combination of identity governance, Conditional Access, and monitoring, secure and scalable external collaboration can be achieved.
