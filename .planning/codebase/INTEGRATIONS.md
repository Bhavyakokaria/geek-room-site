# External Integrations

## Database: PostgreSQL (via Prisma)

- **Provider:** PostgreSQL
- **ORM:** Prisma Client JS
- **Connection:** `DATABASE_URL` env var
- **Schema:** `prisma/schema.prisma`
- **Models:** Event, Winner, EventRegistration, TeamMember, Setting
- **Fallback:** When `DATABASE_URL` is missing, falls back to local JSON files in `data/`

## Authentication: Clerk

- **Package:** `@clerk/nextjs` v7.0.1
- **Integration points:**
  - `app/layout.tsx` — `ClerkProvider` wraps entire app
  - `middleware.ts` — Route protection for `/admin(.*)`
  - `app/sign-in/[[...sign-in]]/page.tsx` — Sign-in page
  - `app/sign-up/[[...sign-up]]/page.tsx` — Sign-up page
  - `app/actions/userActions.ts` — Server actions for user management via Clerk Backend API
  - `app/admin/` — All admin pages check `currentUser()` for role-based access
- **Role management:** Roles stored in Clerk's `publicMetadata.role` field
- **Owner verification:** Hardcoded email check alongside role check

## File Storage: Supabase Storage

- **Package:** `@supabase/supabase-js` v2.99.1
- **Client:** `lib/supabase.ts` — lazy initialization with Proxy pattern
- **Environment vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Usage:** Image uploads for events, team photos, gallery images
- **Image hosting:** Remote images served from `tcoqhpyxmulrmshqjhte.supabase.co` (configured in `next.config.ts`)
- **Upload component:** `components/ImageUpload.tsx`

## Data Storage: Local JSON (Fallback)

When DATABASE_URL is not available, the app falls back to:
- `data/events.json` — Event data
- `data/team.json` — Team member data
- `data/settings.json` — App settings
