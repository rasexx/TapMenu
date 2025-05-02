# 📄 README — TapMenu  
*Digital NFC Menus for Restaurants / Menús digitales NFC para restaurantes*  
<https://studio--tapmenu-c9bbc.us-central1.hosted.app>

---

## 🇪🇸 Versión en Español
<details>
<summary>Haz clic para desplegar</summary>

### Índice
1. [Visión general](#visión-general)
2. [Características principales](#características-principales)
3. [Tecnologías y librerías](#tecnologías-y-librerías)
4. [Arquitectura y estructura de carpetas](#arquitectura-y-estructura-de-carpetas)
5. [Flujo funcional](#flujo-funcional)
6. [Variables de entorno](#variables-de-entorno)
7. [Instalación y desarrollo local](#instalación-y-desarrollo-local)
8. [Despliegue a Firebase Hosting](#despliegue-a-firebase-hosting)
9. [CI/CD con GitHub Actions](#cicd-con-github-actions)
10. [Actualización de contenido (menús y paquetes)](#actualización-de-contenido-menús-y-paquetes)
11. [Pruebas](#pruebas)
12. [Métricas Lighthouse](#métricas-lighthouse)
13. [Mejoras futuras](#mejoras-futuras)
14. [Contribución](#contribución)
15. [Créditos](#créditos)

---

### Visión general
**TapMenu** es una landing page + web app que permite a los restaurantes compartir su menú mediante **tarjetas NFC** (con QR de respaldo).  
Planes disponibles: **Starter**, **Pyme**, **Premium**. El formulario de contacto genera un mensaje pre‑llenado a WhatsApp. Construido con Next.js 14 + Firebase.

### Características principales
| Módulo | Descripción |
|--------|-------------|
| Hero | Sección principal con imagen gastronómica y CTA suave |
| Beneficios “¿Por qué NFC?” | Tarjetas animadas (rapidez, seguridad, actualización, branding) |
| Cómo funciona | Pasos ilustrados con animaciones al hacer scroll |
| Menú de paquetes | Paquetes desde **Firestore**; botones rellenan formulario y hacen scroll |
| Formulario de contacto | React Hook Form + Zod; abre WhatsApp al `+57 324 108 3976` |
| Integración WhatsApp | `https://wa.me/573241083976?text=<mensaje>` |
| Animaciones | Framer Motion, react‑hot‑toast |
| Responsive | Grid de 12 columnas con Tailwind |
| Accesibilidad & SEO | Lighthouse ≥ 95 |
| Backend Firebase | Hosting (SSR), Firestore `packages`, Functions opcionales |
| CI/CD | GitHub Actions (lint→test→build→deploy) |

### Tecnologías y librerías
| Capa | Stack |
|------|-------|
| Frontend | Next.js 14 (React 18), TypeScript, Tailwind CSS |
| UI | Framer Motion, react‑icons |
| Formularios | react‑hook‑form, zod, react‑hot‑toast |
| Backend | Firebase Hosting, Firestore, (opc.) Functions |
| Herramientas | ESLint+Prettier, Jest+RTL, Husky+lint‑staged |

### Arquitectura y estructura de carpetas
```text
src/
 ├─ components/ (Header, Hero, Benefits, HowItWorks, Packages, Contacto, Footer)
 ├─ hooks/       usePackages.ts
 ├─ lib/         firebaseClient.ts, firebaseAdmin.ts
 ├─ app/         page.tsx, layout.tsx, globals.css
public/          assets, manifest, robots, sitemap
functions/       (opcional Cloud Functions)
```

### Flujo funcional
1. El usuario pulsa “Seleccionar Pyme” → `selectedPackage="Pyme"` → scroll suave a `#contact-section`.  
2. El formulario se pre‑rellena con el paquete.  
3. Validación `onBlur`.  
4. Submit → construye mensaje de texto → `window.open(waUrl)`.  
5. WhatsApp se abre listo para enviar.

### Variables de entorno
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Instalación y desarrollo local
```bash
git clone https://github.com/your-org/tapmenu.git
cd tapmenu
pnpm install
firebase emulators:start
pnpm dev
```

### Despliegue a Firebase Hosting
```bash
pnpm build
firebase deploy --only hosting
```

### CI/CD con GitHub Actions
Workflow `deploy.yml`: lint → test → build → `firebase deploy` con secret de servicio.

### Actualización de contenido (menús y paquetes)
1. Firestore → colección `packages`.  
2. Editar/crear documentos con mismos campos (`name`, `range`, `price`, `features`).  
3. La landing refleja los cambios en tiempo real.

### Pruebas
```bash
pnpm test           # ejecutar todos los tests
pnpm test:watch     # modo observación
```

### Métricas Lighthouse
Optimizada para puntuar **≥ 95** en Rendimiento, Accesibilidad, SEO y Buenas Prácticas.

### Mejoras futuras
* Functions para lógica avanzada  
* Pasarela de pagos  
* CMS para manejar menús  
* Analítica avanzada  
* Accesibilidad WCAG continua  

### Contribución
1. `git checkout -b feature/<nombre>`  
2. Commits convencionales.  
3. PR → revisión → _squash & merge_.

### Créditos
Creado y mantenido por **José Ramón** — <https://linktr.ee/jseramn>  
Diseñado con ❤️ para la industria gastronómica.

</details>

## 🇬🇧 English Version
<details>
<summary>Click to expand</summary>

### Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Technologies and Libraries](#technologies-and-libraries)
4. [Architecture & Folder Structure](#architecture-and-folder-structure)
5. [Functional Flow](#functional-flow)
6. [Environment Variables](#environment-variables)
7. [Installation & Local Development](#installation-and-local-development)
8. [Deployment to Firebase Hosting](#deployment-to-firebase-hosting)
9. [CI/CD with GitHub Actions](#cicd-with-github-actions)
10. [Content Update (Menus & Packages)](#content-update-menus-and-packages)
11. [Testing](#testing)
12. [Lighthouse Metrics](#lighthouse-metrics)
13. [Future Improvements](#future-improvements)
14. [Contribution](#contribution)
15. [Credits](#credits)

---

### Overview
**TapMenu** is a landing page & web app that lets restaurants share their menus via **NFC cards** (with QR fallback).  
Plans offered: **Starter**, **SME**, **Premium**. The contact form pre‑fills a WhatsApp message to request a quote. Built on Next.js 14 + Firebase.

### Key Features
| Module | Description |
|--------|-------------|
| Landing Hero | Restaurant‑themed hero + smooth CTA |
| Benefits “Why NFC?” | Animated cards (speed, security, updates, branding) |
| How It Works | Illustrated steps with scroll animations |
| Package Menu | Packages from **Firestore**; buttons auto‑scroll & pre‑fill form |
| Contact Form | React Hook Form + Zod; opens WhatsApp to `+57 324 108 3976` |
| WhatsApp link | `https://wa.me/573241083976?text=<msg>` |
| Animations | Framer Motion, react‑hot‑toast |
| Responsive | Tailwind 12‑col grid |
| Accessibility & SEO | Lighthouse ≥ 95 |
| Firebase backend | Hosting (SSR), Firestore `packages`, optional Functions |
| CI/CD | GitHub Actions (lint→test→build→deploy) |

### Technologies and Libraries
| Layer | Stack |
|-------|-------|
| Front | Next.js 14 (React 18), TypeScript, Tailwind CSS |
| UI | Framer Motion, react‑icons |
| Forms | react‑hook‑form, zod, react‑hot‑toast |
| Back | Firebase Hosting, Firestore, (opt.) Functions |
| Dev Tools | ESLint+Prettier, Jest+RTL, Husky+lint‑staged |

### Architecture and Folder Structure
```text
src/
 ├─ components/ (Header, Hero, Benefits, HowItWorks, Packages, Contact, Footer)
 ├─ hooks/       usePackages.ts
 ├─ lib/         firebaseClient.ts, firebaseAdmin.ts
 ├─ app/         page.tsx, layout.tsx, globals.css
public/          assets, manifest, robots, sitemap
functions/       (optional Cloud Functions)
```

### Functional Flow
1. User clicks “Select SME” → `selectedPackage="SME"` → smooth‑scroll to `#contact-section`.  
2. Form defaults pre‑filled.  
3. Validation `onBlur`.  
4. Submit → builds plain‑text WhatsApp message → `window.open(waUrl)`.  
5. WhatsApp opens ready to send.

### Environment Variables
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Installation and Local Development
```bash
git clone https://github.com/your-org/tapmenu.git
cd tapmenu
pnpm install           # or yarn / npm
firebase emulators:start
pnpm dev               # next dev
```

### Deployment to Firebase Hosting
```bash
pnpm build
firebase deploy --only hosting
```

### CI/CD with GitHub Actions
Workflow `deploy.yml` runs lint → test → build → `firebase deploy` using a service‑account secret.

### Content Update (Menus and Packages)
1. Firestore → `packages` collection.  
2. Edit docs like:
```json
{
  "name": "Starter",
  "range": "1 – 3",
  "price": 70000,
  "features": ["Basic link (PDF/web)", "QR backup"]
}
```
3. Landing updates in real‑time via hook.

### Testing
Run all tests:
```bash
pnpm test
```
Watch mode:
```bash
pnpm test:watch
```

### Lighthouse Metrics
Optimised to score **≥ 95** in Performance, A11y, SEO and Best Practices.

### Future Improvements
* Cloud Functions for advanced backend  
* Payment gateway integration  
* CMS for menu management  
* Enhanced analytics & accessibility  

### Contribution
1. `git checkout -b feature/<name>`  
2. Commit with Conventional Commits.  
3. PR → review → squash & merge.

### Credits
Created & maintained by **José Ramón** — <https://linktr.ee/jseramn>  
Designed with ❤️ for the food industry.

</details>

---