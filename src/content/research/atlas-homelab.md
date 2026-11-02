---
title: "Atlas: a practical security homelab"
description: "Atlas runs Proxmox, VLANs, UniFi, a USG with firewall rules, and Wazuh. Terraform provisioning is planned while I learn infrastructure as code."
pubDate: "2026-11-02"
tags: [homelab, proxmox, networking, unifi, firewall, wazuh, terraform]
---

## Purpose

Atlas is my personal homelab for practising infrastructure, networking, Active Directory, and security tooling outside work. It provides a place to investigate how systems behave and develop practical engineering skills.

## Working components

As of 2 November 2026, Proxmox, VLANs, UniFi, a USG with firewall rules, and Wazuh are working as expected in Atlas.

| Component | Current status | Role in the lab |
| --- | --- | --- |
| Proxmox | Working | Virtualisation platform for lab workloads |
| VLANs | Working | Network segmentation for lab environments |
| UniFi | Working | Network management in the lab |
| USG firewall | Working | Firewall rules controlling lab network traffic |
| Wazuh | Working | Security monitoring and investigation practice |
| Terraform provisioning | Planned; not implemented | Future repeatable infrastructure provisioning |

## Architecture at a glance

Proxmox provides the virtualisation foundation. VLANs provide network segmentation, UniFi supports network management, and a USG applies firewall rules. Wazuh provides the security monitoring component. This overview deliberately avoids publishing management addresses, credentials, detailed firewall rules, or an inventory of exposed services.

## Current learning and planned work

I am learning Terraform. It is not yet installed or used for provisioning in Atlas. My next development goal is to apply that learning to repeatable, version-controlled lab provisioning and document the results when implemented and tested.

My certification roadmap puts Terraform Associate first, followed by planned AZ-104 and SC-200 study. SC-300 remains a later option. These are development goals, not awarded credentials. [View certifications and the current learning roadmap](/certifications).

## Evidence and scope

This page separates the working lab foundation from planned automation. It does not claim a completed Terraform deployment, Azure integration, monitoring coverage figures, or measured performance improvements.
