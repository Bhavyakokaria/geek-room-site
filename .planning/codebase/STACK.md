# Technology Stack

## Runtime & Language

- **Runtime:** Node.js (v18+)
- **Language:** TypeScript 5.9.3
- **Target:** ES2017 with bundler module resolution
- **Strict mode:** Enabled

## Framework

- **Next.js 16.1.6** — App Router (not Pages Router)
- **React 19.2.3** with React DOM 19.2.3
- **React JSX:** `react-jsx` transform (no React import needed)

## Styling

- **Tailwind CSS v4** with `@tailwindcss/postcss`
- **PostCSS** configured via `postcss.config.mjs`
- **Fonts:** Google Fonts — Syne (headings, 400-800), Inter (body, 300-600)
- Dark theme by default — background `#050505`, text `#ededed`
- Accent colors: `#00F2FF` (cyan), `#B026FF` (purple), `#FF8C00` (orange)

## Database

- **PostgreSQL** via Prisma ORM (Prisma Client 6.19.2, Prisma CLI 6.19.2)
- Connection string: `DATABASE_URL` environment variable
- **Prisma schema location:** `prisma/schema.prisma`

## Authentication

- **Clerk** (`@clerk/nextjs` v7.0.1)
- Middleware-based route protection for `/admin(.*)` routes
- Role system via `publicMetadata.role`: `admin`, `member`, `owner`
- Hardcoded owner email fallback: `sahilnwal975@gmail.com`
- Sign-in/sign-up routes: `/sign-in/[[...sign-in]]`, `/sign-up/[[...sign-up]]`

## Storage / File Upload

- **Supabase** (`@supabase/supabase-js` v2.99.1) — used for image storage
- Client initialized lazily via `lib/supabase.ts`
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Image remote patterns configured for `tcoqhpyxmulrmshqjhte.supabase.co`

## Animation Libraries

- **GSAP** (v3.14.2) with `@gsap/react` hook-based integration
- **Framer Motion** (v12.35.0) — component animations, scroll-triggered effects
- **Lenis** (v1.3.21) — smooth scrolling
- **Three.js** (v0.183.2) — 3D visualizations
- **tsparticles** (engine v3.9.1, react v3.0.0, slim v3.9.1) — particle effects

## UI Components

- **Lucide React** (v0.577.0) — icon library
- No component library (all custom components)

## Linting

- **ESLint v9** with `eslint-config-next` (core-web-vitals + typescript presets)
- Config: `eslint.config.mjs` (flat config format)

## Build & Scripts

- `npm run dev` — Next.js dev server
- `npm run build` — Production build
- `npm run start` — Production server
- `npm run lint` — ESLint check
- Additional scripts in `scripts/`: `seed.mjs`, `migrateData.ts`, `checkBuckets.ts`
