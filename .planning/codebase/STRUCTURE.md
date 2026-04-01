# Directory Structure

## Root

```
geek-room-site/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── data/                   # Local JSON fallback data
├── lib/                    # Shared utilities (prisma, supabase clients)
├── prisma/                 # Database schema
├── public/                 # Static assets
├── scripts/                # Utility scripts
├── .git/                   # Git repository
├── .gitignore
├── eslint.config.mjs       # ESLint flat config
├── middleware.ts            # Clerk auth middleware
├── next.config.ts          # Next.js config (image remote patterns)
├── package.json
├── package-lock.json
├── postcss.config.mjs      # PostCSS/Tailwind config
├── tsconfig.json           # TypeScript config
└── *.log / *.txt           # Build logs (not gitignored — concern)
```

## `app/` — Pages & Server Actions

```
app/
├── layout.tsx              # Root layout (ClerkProvider, fonts, Header, Footer)
├── page.tsx                # Homepage (Server Component)
├── globals.css             # Global CSS
├── hero.css                # Hero-specific styles
├── favicon.ico
├── actions/                # Server Actions ("use server")
│   ├── eventActions.ts     # CRUD for events + registrations
│   ├── teamActions.ts      # CRUD for team members
│   ├── settings.ts         # App settings (hideJoin toggle)
│   └── userActions.ts      # Clerk user management (owner-only)
├── about/
│   └── page.tsx            # About page
├── contact/
│   └── page.tsx            # Contact page
├── events/
│   ├── page.tsx            # Events listing
│   ├── EventsClient.tsx    # Client component for events list
│   ├── data.ts             # EventDetails type definition
│   └── [slug]/
│       ├── page.tsx        # Event detail (server component)
│       └── EventDetailClient.tsx
├── gallery/
│   └── page.tsx            # Gallery page (force-dynamic)
├── join/
│   └── page.tsx            # Join page (dynamic based on settings)
├── register/
│   └── [eventId]/
│       └── page.tsx        # Event registration form
├── sign-in/
│   └── [[...sign-in]]/
│       └── page.tsx        # Clerk sign-in
├── sign-up/
│   └── [[...sign-up]]/
│       └── page.tsx        # Clerk sign-up
├── team/
│   └── page.tsx            # Team page
└── admin/
    ├── layout.tsx           # Admin auth gate (currentUser check)
    ├── page.tsx             # Admin dashboard
    ├── AdminControls.tsx    # Toggle controls component
    ├── create-event/        # Event creation form
    ├── edit-event/
    │   └── [id]/            # Edit event by ID
    ├── events/              # Event management listing
    ├── gallery/             # Gallery management
    ├── roles/               # Role management (owner-only)
    └── team/
        ├── page.tsx         # Team management listing
        ├── create/          # Add team member
        └── edit/
            └── [id]/        # Edit team member
```

## `components/` — UI Components

```
components/
├── Header.tsx              # Site navigation header
├── Footer.tsx              # Site footer
├── HeroSection.tsx         # Hero with animations
├── WhySection.tsx          # "Why Geek Room" section
├── TeamPreview.tsx         # Team preview on homepage
├── EventsPreview.tsx       # Events preview on homepage
├── GalleryPreview.tsx      # Gallery preview on homepage
├── GallerySection.tsx      # Full gallery section
├── CultureSection.tsx      # Culture/values section
├── JoinCTA.tsx             # Join call-to-action
├── EventCard.tsx           # Event card component
├── MinimalEventCard.tsx    # Minimal event card variant
├── MinimalEventCard.css    # Styles for minimal card
├── AnimatedSection.tsx     # Scroll-triggered animations
├── AsciiVisual.tsx         # ASCII art visual
├── LogoSequence.tsx        # Logo animation sequence
├── LunarRunwayBackground.tsx # Background animation
├── MediaArchive.tsx        # Media archive component
├── ScrambleText.tsx        # Text scramble effect
├── SystemInterface.tsx     # System/terminal-style interface
├── TechDecorations.tsx     # Decorative tech elements
├── ImageUpload.tsx         # Supabase image upload
├── about/                  # About page components
│   ├── AboutHero.tsx
│   ├── AboutStory.tsx
│   ├── DynamicBackground.tsx
│   └── NetworkNodes.tsx
└── HeroLogoAnimation.*     # Hero logo animation (separate files)
```

## `lib/` — Shared Utilities

```
lib/
├── prisma.ts               # Prisma client singleton (dev hot-reload safe)
└── supabase.ts             # Supabase client (lazy init + Proxy)
```

## `data/` — Local JSON Fallback

```
data/
├── events.json             # Event data (fallback when no DB)
├── team.json               # Team member data (fallback when no DB)
└── settings.json           # App settings (fallback when no DB)
```

## `public/` — Static Assets

```
public/
├── images/
│   └── events/             # Event images (subdirectories per event)
│       ├── aptiverse/
│       ├── blockgen/
│       ├── geek-veek/
│       ├── geek-veek-2.0/
│       ├── hackforce/
│       └── hackquanta/
├── sounds/                 # Sound effects
└── ezgif-*.jpg             # Optimized GIF frames
```

## `scripts/` — Utility Scripts

```
scripts/
├── seed.mjs                # Database seeding script
├── migrateData.ts          # Data migration script
└── checkBuckets.ts         # Supabase bucket verification
```

## Key Naming Conventions

- **Pages:** `app/[route]/page.tsx` (Next.js App Router convention)
- **Dynamic routes:** `[slug]`, `[id]`, `[eventId]` (bracket notation)
- **Catch-all routes:** `[[...sign-in]]` (optional catch-all for Clerk)
- **Server Actions:** `app/actions/[entity]Actions.ts` with `"use server"` directive
- **Client components:** Separate `*Client.tsx` files for client-side interactivity
- **Admin routes:** All under `app/admin/` with shared layout for auth
