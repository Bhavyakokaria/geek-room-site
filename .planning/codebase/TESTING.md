# Testing

## Current State

**No tests exist.** The project has zero test files, no test framework configured, and no test scripts in `package.json`.

## Missing Infrastructure

- No test runner (Jest, Vitest, Playwright, etc.)
- No test configuration files
- No `__tests__/` or `*.test.*` or `*.spec.*` files
- No CI/CD pipeline configuration
- No test coverage tooling

## What Would Need Testing

### Server Actions (highest priority)
- `app/actions/eventActions.ts` — CRUD operations, date formatting, status transitions
- `app/actions/teamActions.ts` — CRUD operations
- `app/actions/settings.ts` — Settings read/write
- `app/actions/userActions.ts` — Role verification, permission checks

### Components (medium priority)
- `components/Header.tsx` — Navigation links, auth state display
- `components/EventCard.tsx` — Event data rendering
- `components/ImageUpload.tsx` — Supabase upload flow
- Admin pages — Role-based access, CRUD forms

### Integration Points (high priority)
- Prisma client singleton (`lib/prisma.ts`) — hot-reload safety
- Supabase client (`lib/supabase.ts`) — lazy initialization
- Clerk auth flow — middleware + role checks
- Database fallback pattern — JSON fallback when no DATABASE_URL

## Recommended Testing Stack

- **Unit/Integration:** Vitest (fast, ESM-native, good Next.js support)
- **E2E:** Playwright (Next.js first-party support)
- **Mocking:** Vitest mocks for Prisma, Clerk, Supabase
