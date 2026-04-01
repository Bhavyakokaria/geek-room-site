# Technical Concerns & Debt

## Critical Issues

### 1. Hardcoded Owner Email
**File:** `app/actions/userActions.ts:29`, `app/admin/page.tsx:19-20`
```typescript
if (role !== "owner" && email !== "sahilnwal975@gmail.com")
```
Owner access is determined by both role AND a hardcoded email. If this email changes or the user leaves, access breaks. Should be role-only.

### 2. Admin Auth Guard Disabled
**File:** `app/admin/layout.tsx:21-24`
The admin layout's role check is commented out ("TEMPORARILY DISABLED"). Only per-page checks remain. Any new admin page without explicit role checking is unprotected.

### 3. Git Merge Conflict in .gitignore
**File:** `.gitignore:43-56`
Unresolved merge conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>> main`). Both branches' content exist. The `/.clerk/` entry from main is needed but missing from HEAD's version.

### 4. No Test Coverage
Zero tests. Server actions mutate data without any verification. No safety net for refactoring.

## Moderate Concerns

### 5. Duplicate Type Definitions
Two separate type systems for events:
- `EventItem` in `app/actions/eventActions.ts`
- `EventDetails` in `app/events/data.ts`

Manual mapping between them in page components is fragile and error-prone.

### 6. Dual Storage Pattern
The app falls back to local JSON files when `DATABASE_URL` is missing. This creates two data sources that can drift. The JSON files may become stale if the database is the source of truth.

### 7. No Input Validation
Server Actions accept data without validation (no Zod, no schema validation). Malformed input can cause Prisma errors or data corruption.

### 8. No Error Boundaries
No React error boundaries. A component crash takes down the entire page. Next.js App Router supports `error.tsx` files but none exist.

### 9. Build Logs Committed
Files like `build.log`, `lint.txt`, `tsc.log`, `tsc_check.log`, `prisma.log`, etc. are in the repo. These should be gitignored.

## Minor Concerns

### 10. Settings Model Anti-Pattern
The `Setting` model stores JSON as a string in a `value` column. Querying individual settings requires parsing the entire blob. Consider dedicated columns or a structured approach.

### 11. Auto-Status Transition Side Effect
**File:** `app/actions/eventActions.ts:179`
Events automatically transition from "upcoming" to "past" during fetch, with a fire-and-forget DB update (`prisma.event.update(...).catch(console.error)`). This is a side effect in a read operation.

### 12. No Rate Limiting
Event registration (`registerForEvent`) has no rate limiting or duplicate prevention. The same email can register multiple times.

### 13. Missing .env Validation
No validation that required env vars exist at startup. Missing vars cause runtime crashes (e.g., Prisma connection failure, Supabase client initialization error).

### 14. Console.log Fallback Warning
When `DATABASE_URL` is missing, `console.warn` is used — this could leak information in production logs.

### 15. No Loading States (Some Pages)
Some admin pages and forms lack loading states, leading to poor UX during data fetching.
