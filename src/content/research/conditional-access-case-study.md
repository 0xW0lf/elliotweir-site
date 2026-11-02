---
title: "Conditional Access implementation: design, testing and deployment"
description: "A sanitised case study of personally designing, testing, reviewing test results, and deploying Microsoft Entra Conditional Access policies."
pubDate: "2026-11-02"
tags: [identity, conditional-access, entra, security-engineering]
---

> This public account omits tenant identifiers, policy names, configuration values, targeting, exclusions, internal screenshots, and test artefacts.

## Context and personal responsibility

In my role as a Junior Security Analyst, I personally designed and created Microsoft Entra Conditional Access policies, tested them, reviewed the test results, and deployed the policies into production. This case study describes that implementation work at a level suitable for public sharing.

## Design decisions

My responsibility included translating the intended access controls into policy configuration. The public account focuses on the implementation lifecycle; it does not reproduce the access conditions, scope, exceptions, or internal requirements. Those details could expose how an employer protects its environment.

## Testing and review

I tested the policies and personally reviewed the results before deployment. Reviewing the results was a distinct part of the work, linking the configured controls to the behaviour observed during testing. Internal test cases, sign-in records, and acceptance criteria are not published here.

## Deployment and outcome

I personally deployed the policies into production after testing and review. The confirmed outcome is delivery of production Conditional Access policies through a lifecycle I carried out: design, configuration, testing, review, and deployment.

User counts, policy counts, risk-reduction percentages, and time savings are not published. I have not added numerical outcomes without verified evidence suitable for public release.

## What this demonstrates

This work demonstrates hands-on delivery of identity controls and responsibility for checking their behaviour before production deployment. It complements my [Microsoft Defender for Office 365 investigation](/research/mdo-technical-writeup), which documents troubleshooting and the interaction between security controls.
