# 🧱 Yabasha.dev Monorepo

A modern full-stack monorepo powered by **Bun workspaces**, combining a **Laravel 12 backend**, **Next.js 16 frontend**, and a **shared React UI library** built with **Tailwind + shadcn/ui**.

This repo is designed for **high DX**, **clear boundaries**, and **long-term scalability** — no framework wars, just solid engineering.

---

## 🧠 Architecture Overview

This monorepo uses **Bun v1.3.0 workspaces** to manage multiple applications and shared packages in a single repository.

### Tech Stack

| Layer      | Technology       | Notes                               |
| ---------- | ---------------- | ----------------------------------- |
| Backend    | Laravel 12       | API, Jobs, Queues, Filament Admin   |
| Frontend   | Next.js 16       | App Router, TypeScript              |
| UI         | React + Tailwind | Shared components (shadcn/ui style) |
| Workspaces | Bun              | Fast installs, workspace linking    |
| Infra      | Docker           | MySQL, Redis, Horizon, Nginx        |

---

## 📁 Repository Structure

```txt
.
├── apps/
│   ├── backend/                 # Laravel 12 API + Filament Admin
│   │   ├── app/                 # Core application code
│   │   ├── bootstrap/
│   │   ├── config/
│   │   ├── database/
│   │   ├── public/
│   │   ├── resources/
│   │   ├── routes/
│   │   ├── storage/
│   │   ├── tests/
│   │   ├── composer.json
│   │   ├── artisan
│   │   └── ...                  # Standard Laravel structure
│   │
│   └── web/                     # Next.js 16 frontend application
│       ├── src/
│       │   ├── app/             # App Router pages/layouts
│       │   ├── components/      # App-specific components
│       │   ├── lib/             # Utilities/helpers
│       │   └── styles/
│       ├── public/
│       ├── next.config.ts       # Includes transpilePackages config
│       ├── package.json
│       ├── tailwind.config.ts
│       └── tsconfig.json
│
├── packages/
│   └── ui/                      # Shared UI library (@yabasha/ui)
│       ├── src/
│       │   ├── components/      # Shared components (shadcn/ui style)
│       │   ├── lib/
│       │   │   └── utils.ts     # cn(), helpers, etc.
│       │   └── index.ts         # Export surface
│       ├── package.json
│       ├── tsconfig.json
│       └── tailwind.config.ts   # (optional) if needed for building
│
├── docker/
│   └── nginx/
│       └── default.conf         # Nginx config for Laravel
│
├── docker-compose.yml           # MySQL + Redis + Horizon + Nginx + Backend
├── package.json                 # Root Bun workspaces + proxy scripts
├── bun.lock
├── tsconfig.json                # Base TS config shared by web + ui
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- **Bun v1.3.0+**
- **Docker + Docker Compose**
- **PHP 8.3+**
- **Composer**

---

## 📦 Install Dependencies

From the repo root:

```bash
bun install
```

---

| Bun automatically links workspace packages like @yabasha/ui using workspace:\*.

🐳 Start Backend (Laravel + MySQL + Redis)

```bash
docker compose up -d --build
```

Laravel will be available at:

👉 http://localhost:8080

Useful services:

Mailpit → http://localhost:8025

Meilisearch → http://localhost:7700

---

## First-time Laravel setup

```bash
docker exec -it yabasha-backend bash

php artisan key:generate
php artisan migrate
php artisan storage:link
```

---

## 🌐 Start Frontend (Next.js)

From the repo root:

```bash
bun run dev
```

Frontend runs at:

👉 http://localhost:3000

---

## 🎨 Shared UI Package (@yabasha/ui)

The UI package lives in:

```bash
packages/ui
```

It contains reusable React components (shadcn-style) shared across apps.

---

Add a new UI component

```bash
bun run ui:add
```

This runs shadcn add **inside the UI package**, not the app — intentional and clean.

### Using UI components in Next.js

```tsx
import { Button } from "@yabasha/ui";

export default function Page() {
  return <Button>Click me</Button>;
}
```

---

## ⚙️ Why transpilePackages Is Required

Next.js does not transpile workspace packages by default.

We explicitly enable this in:

```bash
apps/web/next.config.ts
```

```ts
transpilePackages: ["@yabasha/ui"];
```

Without this:
❌ Tailwind classes may break
❌ TypeScript may fail
❌ Hot reload becomes unreliable

With it:
✅ Clean imports
✅ Proper HMR
✅ Zero hacks

---

## 🧑‍💻 Developer Experience (DX) Tips

### 🔥 Strong Recommendations

- Run frontend locally, backend via Docker
  → Faster HMR, fewer container rebuilds

- Keep UI logic dumb
  → No API calls, no app-specific state in packages/ui

- Prefer composition over inheritance
  → Especially for UI primitives

---

🧠 Optional DX Upgrades (Worth It)

If this repo grows, strongly consider:

- ✅ Turborepo for task orchestration
- ✅ Shared ESLint + Prettier config
- ✅ Docker Compose override for Next.js container
- ✅ GitHub Actions CI
- ✅ Storybook for @yabasha/ui
- ✅ Changesets if you ever publish UI packages

## 🧭 Philosophy

This monorepo is built around a few principles:

- Clear ownership (apps vs packages)
- Fast feedback loops
- Minimal magic
- Explicit configuration over convention
- Scales from solo dev → team

---

## 🧪 Common Commands

```bash
bun run dev           # Start Next.js frontend
bun run build         # Build frontend
bun run lint          # Lint frontend
bun run ui:add        # Add shadcn component to UI package

docker compose up -d  # Start backend stack
docker compose down   # Stop backend stack
```

### Happy hacking 🚀

If you break it — good, that means you’re pushing it 😄

---

## 📚 License

MIT License
