# PilotPath — Backend

NestJS REST API for the PilotPath platform.

## Stack

- NestJS 11
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication (access + refresh tokens)
- Swagger/OpenAPI

## Quick Start

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

API base URL: `http://localhost:3001/api/v1`

Swagger: `http://localhost:3001/docs`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start in watch mode |
| `npm run build` | Compile for production |
| `npm run start:prod` | Run compiled app |
| `npm run lint` | ESLint |
| `npm run test` | Unit tests |

## Prisma

Run Prisma commands from this directory. Stop `start:dev` before `npx prisma generate` on Windows.

See [docs/database.md](../docs/database.md) and [docs/setup.md](../docs/setup.md).

## Documentation

- [Architecture](../docs/architecture.md)
- [Database](../docs/database.md)
- [Feature docs](../docs/features/)

**Version:** `0.6.0`
