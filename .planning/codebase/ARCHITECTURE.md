# Architecture

## Pattern

Next.js App Router with Server Components + Server Actions pattern. No API routes — all server-side mutations go through Server Actions (`"use server"` directives).

## Layers

```
┌─────────────────────────────────────┐
│  Pages (app/)                        │
│  Server Components fetch data,       │
│  delegate interactivity to clients   │
├─────────────────────────────────────┤
│  Components (components/)           │
│  Mix of Server and Client components │
│  Framer Motion / GSAP animations     │
├─────────────────────────────────────┤
│  Server Actions (app/actions/)       │
│  "use server" — all mutations        │
│  Prisma queries + Clerk API calls    │
├─────────────────────────────────────┤
│  Data Layer (lib/)                   │
│  prisma.ts — singleton client        │
│  supabase.ts — lazy client           │
├─────────────────────────────────────┤
│  External Services                   │
│  PostgreSQL (Prisma)                 │
│  Clerk (Auth)                        │
│  Supabase (Storage)                  │
└─────────────────────────────────────┘
```

## Data Flow

1. **Page request** → Next.js server component loads
2. **Server component** calls Server Actions (`getEvents()`, `getMembers()`, `getSettings()`)
3. **Server Actions** query Prisma (PostgreSQL) or fall back to local JSON
4. **Data returns** to server component as props
5. **Client components** receive data for rendering + interactivity (GSAP, Framer Motion)
6. **Mutations** go through Server Actions → Prisma → `revalidatePath()` for cache invalidation

## Key Entry Points

- `app/layout.tsx` — Root layout, ClerkProvider, global styles, fonts
- `app/page.tsx` — Homepage: Hero, Why, Team, Events, Gallery, Culture, Join CTA
- `middleware.ts` — Clerk auth middleware for route protection
- `app/admin/page.tsx` — Admin dashboard with role-based access

## Route Structure

| Route | Type | Auth Required |
|-------|------|---------------|
| `/` | Public | No |
| `/about` | Public | No |
| `/events` | Public | No |
| `/events/[slug]` | Public | No |
| `/gallery` | Public | No |
| `/team` | Public | No |
| `/join` | Public (dynamic) | No |
| `/contact` | Public | No |
| `/register/[eventId]` | Public | No |
| `/sign-in` | Auth | No |
| `/sign-up` | Auth | No |
| `/admin` | Protected | admin/owner |
| `/admin/events` | Protected | admin/owner |
| `/admin/create-event` | Protected | admin/owner |
| `/admin/edit-event/[id]` | Protected | admin/owner |
| `/admin/gallery` | Protected | admin/owner |
| `/admin/team` | Protected | admin/owner |
| `/admin/team/create` | Protected | admin/owner |
| `/admin/team/edit/[id]` | Protected | admin/owner |
| `/admin/roles` | Protected | owner only |

## Abstractions

- **Event type system:** `EventItem` (from `eventActions.ts`) and `EventDetails` (from `events/data.ts`) — two parallel type definitions that need mapping between them
- **Settings system:** `Setting` model stores arbitrary JSON keyed by `global_settings`
- **Role hierarchy:** `owner` > `admin` > `member` — managed via Clerk metadata + hardcoded email fallback
