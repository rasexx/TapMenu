# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

### 📄 **README — TapMenu**

*Digital NFC Menus for Restaurants*

---

#### Table of Contents

1.  [Overview](#overview)
2.  [Key Features](#key-features)
3.  [Technologies and Libraries](#technologies-and-libraries)
4.  [Architecture and Folder Structure](#architecture-and-folder-structure)
5.  [Functional Flow](#functional-flow)
6.  [Environment Variables](#environment-variables)
7.  [Installation and Local Development](#installation-and-local-development)
8.  [Deployment to Firebase Hosting](#deployment-to-firebase-hosting)
9.  [CI/CD with GitHub Actions](#cicd-with-github-actions)
10. [Content Update (Menus and Packages)](#content-update-menus-and-packages)
11. [Testing](#testing)
12. [Lighthouse Metrics](#lighthouse-metrics)
13. [Future Improvements](#future-improvements)
14. [Contribution](#contribution)
15. [Credits](#credits)

---

## Overview

**TapMenu** is a landing page and web app that offers restaurants a system of **NFC** cards (with QR code backup) to access their menus instantly and contactlessly.
The application features *Starter*, *SME*, and *Premium* plans, integrates a **contact form** that generates a pre-filled message to WhatsApp, and is built on the Jamstack (Next.js + Firebase) stack.

---

## Key Features

| Module                         | Description                                                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Landing Hero**               | Hero section with a restaurant-themed image and smooth navigation CTA.                                                                                      |
| **Benefits "Why NFC?"**        | Animated cards with Framer Motion describing speed, security, updating, and personalization.                                                              |
| **How It Works**              | Illustrated steps with scroll-animations.                                                                                                                  |
| **Package Menu**              | Packages dynamically loaded from **Firestore** (Starter, SME, Premium). Each button pre-fills the contact form and scrolls to the contact section. |
| **Contact Form**              | Validated with **React Hook Form + Zod**; when submitted, it opens WhatsApp with a plain text message to the number `+57 324 108 3976`.          |
| **WhatsApp Integration**      | URL `https://wa.me/573241083976?text=<message>` generated on the fly with `encodeURIComponent`.                                                          |
| **Animations and Micro UX**    | Framer Motion for fades/slide-ups; react-hot-toast for feedback.                                                                                           |
| **Responsive**                 | Tailwind CSS + 12-column grid. Supports mobile ↔ desktop.                                                                                             |
| **Accessibility & SEO**        | Lighthouse ≥ 95 in A11y/SEO; OG meta tags, sitemap, and robots.                                                                                         |
| **Firebase Backend**           | Hosting (SSR Next), Firestore (`packages` collection), optional Functions (pending).                                                                    |
| **CI/CD**                      | GitHub Actions: lint + test + build + firebase deploy.                                                                                                    |
| **Footer**                     | About TapMenu, quick links, contact, and credits (linktree).                                                                                               |

---

## Technologies and Libraries

| Layer             | Stack                                                                     |
| ----------------- | ------------------------------------------------------------------------- |
| Frontend          | **Next.js 14** (React 18) • TypeScript • Tailwind CSS                     |
| UI / Animations   | Framer Motion • react-icons                                               |
| Forms             | react-hook-form • zod • react-hot-toast                                     |
| Backend           | Firebase Hosting (SSR) • Cloud Firestore • (Optional) Cloud Functions |
| Development Tools | ESLint + Prettier • Jest + RTL • Husky + lint-staged                      |

---

## Architecture and Folder Structure

