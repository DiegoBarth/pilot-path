# PilotPath Frontend Architecture

## Directory layout

```
src/
  app/              # Next.js routes — thin re-exports only
  features/         # Product domains (api, hooks, components, lib, constants, types)
  domain/           # Shared types mirroring backend Prisma enums
  components/       # Shared UI (ui/, shared/)
  lib/              # Infrastructure (api, query-keys, routes, breadcrumbs)
  providers/        # Global React context (auth, react-query)
```

## Feature module convention

Every feature should follow this structure when it has a route:

```
features/<name>/
  api/              # API calls for this domain
  hooks/            # React Query hooks and page orchestration
  components/       # UI, including <Name>Page.tsx container
  lib/              # Pure helpers scoped to the feature
  constants/        # Labels, defaults, config
  types.ts          # Feature-specific response models
```

**Rules**

- `app/**/page.tsx` only imports a feature container (e.g. `DashboardPage`).
- Cross-feature shared types live in `domain/`, not duplicated in feature `types.ts`.
- Cross-feature UI helpers live in `components/shared/` or `domain/`.
- Sub-features without routes (e.g. `enrollments/`) are imported by other features.

## Auth

- Session: `localStorage` + `access_token` cookie (for middleware).
- `middleware.ts` protects `(app)` routes at the edge.
- `AuthGuard` handles client-side loading/redirect with `PageLoading`.
- API 401: `ApiAuthHandler` clears session and redirects to login.

## Data fetching

- React Query keys: `lib/query-keys.ts`
- Invalidation helpers colocated in `query-keys.ts`
- API client: `lib/api/client.ts` (retry, 401, typed errors)

## Hooks naming

| Hook | Purpose |
|------|---------|
| `use<Feature>Page` | Page-level orchestration (params, breadcrumbs, derived state) |
| `use<Feature>` | Domain data fetching/mutations |
| `use<Feature>Query` | Lightweight single-query fetch (e.g. breadcrumbs) |
