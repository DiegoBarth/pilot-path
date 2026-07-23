# PilotPath — Frontend

Next.js web application for the PilotPath platform.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui + Base UI
- TanStack Query
- React Hook Form + Zod

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

App URL: `http://localhost:3000`

Requires the backend running at `NEXT_PUBLIC_API_URL` (default `http://localhost:3001/api/v1`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Architecture

Feature-based modules under `src/features/`. App routes in `src/app/` are thin wrappers around feature page containers.

See [ARCHITECTURE.md](./ARCHITECTURE.md) and [docs/frontend-architecture.md](../docs/frontend-architecture.md).

## Main Routes

| Route | Feature |
|-------|---------|
| `/dashboard` | Dashboard |
| `/certifications` | Certifications |
| `/flashcards` | Flashcard review |
| `/mock-exams` | Mock exams |
| `/study/subject/[id]` | Subject study |
| `/analytics` | Analytics (placeholder) |

**Version:** `0.6.0`
