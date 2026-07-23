# Development Setup

## Requirements

| Software | Version |
|----------|---------|
| Node.js | 22 LTS |
| npm | Latest |
| Git | Latest |
| PostgreSQL | 16 |
| Docker Desktop | Optional |

---

## Clone Repository

```bash
git clone https://github.com/DiegoBarth/pilot-path.git
cd pilot-path
```

---

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## Configure Environment

### Backend

Create a `.env` file inside the `backend` directory (see `backend/.env.example`).

```env
NODE_ENV=development

PORT=3001

DATABASE_URL=postgresql://pilotpath:pilotpath@localhost:5432/pilotpath

JWT_SECRET=development_secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=7d

CORS_ORIGINS=http://localhost:3000
```

### Frontend

Create a `.env.local` file inside the `frontend` directory (see `frontend/.env.example`).

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

> Docker is optional. Any PostgreSQL instance can be used by updating the `DATABASE_URL`, including local installations or cloud providers such as Supabase.

---

## Database

Start PostgreSQL (if using Docker):

```bash
docker compose up -d
```

Apply all database migrations:

```bash
cd backend
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

> **Windows note:** stop the backend (`npm run start:dev`) before running `npx prisma generate`. A running NestJS process locks the Prisma query engine binary and may cause an `EPERM` error.

Populate the database with initial data:

```bash
npx prisma db seed
```

Open Prisma Studio (optional):

```bash
npx prisma studio
```

---

## Run Applications

### Backend

```bash
cd backend
npm run start:dev
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## Local URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:3001 |
| API Base | http://localhost:3001/api/v1 |
| Swagger | http://localhost:3001/docs |

---

## Common Prisma Commands

| Command | Description |
|----------|-------------|
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma validate` | Validate the Prisma schema |
| `npx prisma format` | Format the Prisma schema |
| `npx prisma migrate dev` | Create and apply a new migration |
| `npx prisma migrate reset` | Reset the database and reapply all migrations |
| `npx prisma db seed` | Execute the database seed |
| `npx prisma studio` | Open Prisma Studio |
