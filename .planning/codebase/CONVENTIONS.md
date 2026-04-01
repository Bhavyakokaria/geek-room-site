# Code Conventions

## General Style

- **TypeScript strict mode** enabled
- **No explicit React imports** — uses `react-jsx` transform
- **Path aliases:** `@/*` maps to project root (e.g., `@/components/Header`)
- **File naming:** PascalCase for components (`EventCard.tsx`), camelCase for utilities (`eventActions.ts`)
- **Exports:** Named exports preferred for components (`export function EventCard`), default exports for pages (`export default function Page`)

## Server vs Client Components

- **Default:** Server Components (Next.js App Router default)
- **Client components:** Marked with `"use client"` directive, typically for:
  - Animations (GSAP, Framer Motion)
  - User interaction (forms, toggles)
  - Browser APIs (scroll, resize listeners)
- **Server Actions:** Marked with `"use server"` in `app/actions/` files

## Data Fetching Pattern

All data fetching goes through Server Actions in `app/actions/`:

```typescript
// Pattern: try/catch with fallback to local JSON
export async function getEvents(): Promise<EventItem[]> {
  try {
    if (!process.env.DATABASE_URL) {
      // Fallback to local JSON
      return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }
    // Prisma query
    const raw = await prisma.event.findMany({ ... });
    return raw.map(formatEvent);
  } catch (error: any) {
    console.error("Failed to fetch events", error);
    return [];
  }
}
```

## Mutation Pattern

Mutations use Server Actions with `revalidatePath`:

```typescript
export async function addEvent(eventData: EventItem) {
  try {
    await prisma.event.create({ data: ... });
    revalidatePath("/events");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
```

## Error Handling

- **Try/catch** blocks around all Prisma operations
- **Graceful fallbacks** — return empty arrays or default settings on failure
- **Console logging** for errors (no custom error boundary)
- Error responses use `{ success: false, error: message }` pattern

## Styling

- **Tailwind CSS v4** — utility-first
- **Inline styles** for dark theme base colors (background `#050505`, text `#ededed`)
- **CSS variables** for fonts (`--font-syne`, `--font-inter`)
- **Accent palette:** `#00F2FF` (cyan), `#B026FF` (purple), `#FF8C00` (orange)
- **Selection colors:** `bg-[#00F2FF]/30`

## Animation Patterns

- **GSAP:** Used for complex timeline animations, scroll-triggered effects
- **Framer Motion:** Used for component-level animations, page transitions
- **Lenis:** Smooth scrolling throughout the site

## Type Definitions

Two parallel event type systems exist:

1. `EventItem` in `app/actions/eventActions.ts` — Prisma-sourced, string dates
2. `EventDetails` in `app/events/data.ts` — UI-sourced, with additional fields

Mapping between them happens at page level (see `app/events/[slug]/page.tsx`).

## Authentication & Authorization

- **Middleware:** `middleware.ts` protects `/admin(.*)` routes
- **Layout guard:** `app/admin/layout.tsx` checks `currentUser()` (currently commented out)
- **Page guard:** `app/admin/page.tsx` checks role/email inline
- **Role hierarchy:** owner > admin > member
- **Owner detection:** Clerk `publicMetadata.role === "owner"` OR hardcoded email

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (Prisma)
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- Clerk vars (managed by `@clerk/nextjs`, auto-detected)
