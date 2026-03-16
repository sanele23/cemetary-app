# Cebisa Memorial

**Municipal Cemetery Management System** — A high-fidelity frontend prototype built by [Cebisa Group](https://github.com/sanele23) to help families locate the burial sites of loved ones and assist municipalities in managing cemetery records across South Africa.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌍 Overview

Cebisa Memorial is a cemetery locator and management platform designed for South African municipalities. It enables:

- **Families** to search for and locate graves of deceased loved ones
- **Municipalities** to digitise and manage cemetery records efficiently
- **Administrators** to track burials, generate reports, and manage cemetery data

This repository contains a **frontend-only prototype** with mock data, intended as a stakeholder demo and proof-of-concept.

## ✨ Features

### Public-Facing Pages

- **Home** — Hero section with key statistics, quick links, and feature highlights
- **Cemeteries** — Browse all cemeteries with city-based filtering
- **Family Search** — Search graves by name, ID number, cemetery, or burial date
- **Grave Detail** — View burial information, photo gallery, and interactive Leaflet map with directions

### Admin Portal

- **Dashboard** — Overview stats, monthly burial charts, and recent records
- **Cemetery Management** — View and manage all registered cemeteries
- **Grave Management** — Browse grave records with section/plot details
- **Burial Records** — Track burial registrations and statuses
- **User Management** — Manage admin users and roles
- **Reports** — Burial trend charts and cemetery utilisation analytics

## 🏘️ Pilot Municipalities (Mock Data)

| Municipality            | Cemeteries | Graves |
| ----------------------- | ---------- | ------ |
| City of Johannesburg    | 2          | 4      |
| City of Cape Town       | 2          | 2      |
| eThekwini (Durban)      | 2          | 2      |
| Nelson Mandela Bay      | 1          | 2      |
| Mangaung (Bloemfontein) | 1          | 2      |
| Buffalo City            | 3          | 6      |

**Total:** 11 cemeteries · 18 graves · 18 burial records · 8 admin users

## 🛠️ Tech Stack

| Layer         | Technology                                                                       |
| ------------- | -------------------------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router)                                    |
| Language      | [TypeScript](https://www.typescriptlang.org)                                     |
| Styling       | [Tailwind CSS 4](https://tailwindcss.com)                                        |
| UI Components | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com)            |
| Maps          | [Leaflet](https://leafletjs.com) + [React Leaflet](https://react-leaflet.js.org) |
| Charts        | [Recharts](https://recharts.org)                                                 |
| Icons         | [Lucide React](https://lucide.dev)                                               |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin portal (dashboard, cemeteries, graves, burials, users, reports)
│   ├── cemeteries/         # Public cemetery listing
│   ├── graves/[id]/        # Grave detail with map
│   ├── search/             # Family search page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── admin/              # Admin dashboard widgets (stats, charts, recent records)
│   ├── cemetery/           # Cemetery card component
│   ├── grave/              # Grave map (Leaflet) component
│   ├── home/               # Hero, quick links, features sections
│   ├── layout/             # Header, footer, admin sidebar
│   ├── search/             # Search form and results table
│   └── ui/                 # Reusable UI primitives (button, card, input, table, badge, etc.)
├── data/                   # Mock data (cemeteries, graves, burials, types)
├── lib/                    # Utility functions (cn, formatDate)
└── services/               # Mock API service with simulated async calls
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/sanele23/cemetary-app.git
cd cemetary-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start development server (Turbopack) |
| `npm run build` | Create production build              |
| `npm run start` | Serve production build               |
| `npm run lint`  | Run ESLint                           |

## 🗺️ Roadmap

- [ ] Backend API integration (Node.js / .NET)
- [ ] Database integration (PostgreSQL)
- [ ] User authentication & role-based access
- [ ] Real cemetery data import from municipalities
- [ ] Mobile-responsive admin portal
- [ ] Offline-capable PWA for field workers
- [ ] SMS/USSD search for non-smartphone users

## 🏢 About Cebisa Group

Cebisa Memorial is part of the **Cebisa Group** ecosystem of digital solutions:

- **Cebisa Career Builder** — Career guidance and job matching
- **Cebisa Education** — Educational resources and learning tools
- **Cebisa Memorial** — Cemetery management and family search

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ by <strong>Cebisa Group</strong> · South Africa 🇿🇦
</p>
# cemetary-app
