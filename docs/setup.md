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

Create a `.env` file inside the `backend` directory.

Example:

```env
NODE_ENV=development

PORT=3001

DATABASE_URL=postgresql://user:password@localhost:5432/pilotpath

JWT_SECRET=development_secret
JWT_EXPIRES_IN=7d
```

> Docker is optional. Any PostgreSQL instance can be used by updating the `DATABASE_URL`, including local installations or cloud providers such as Supabase.

---

## Database

If using Docker:

```bash
docker compose up -d
```

---

## Prisma

Generate Prisma Client:

```bash
npx prisma generate
```

Validate Prisma schema:

```bash
npx prisma validate
```

Apply database migrations:

```bash
npx prisma migrate dev
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