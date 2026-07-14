# Development Setup

## Requirements

| Software | Version |
|----------|---------|
| Node.js | 22 LTS |
| pnpm | Latest |
| PostgreSQL | 16 |
| Docker Desktop | Optional |
| Git | Latest |

---

## Clone Repository

```bash
git clone https://github.com/DiegoBarth/pilot-path.git
cd pilot-path
```

---

## Install Dependencies

### Backend

Generate the project:

```bash
npx @nestjs/cli new backend --package-manager pnpm
```

### Frontend

```bash
cd frontend
pnpm install
```

---

## Run Applications

### Backend

```bash
cd backend
pnpm start:dev
```

### Frontend

```bash
pnpm dev
```

---

## Database

```bash
docker compose up -d
```

---

## Local URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:3001 |
| Swagger | http://localhost:3001/api |