# Development Setup

## Requirements

| Software | Version |
|----------|---------|
| Node.js | 22 LTS |
| npm | Latest |
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
npx @nestjs/cli new backend --package-manager npm
```

### Frontend

```bash
cd frontend
npm install
```

---

## Run Applications

### Backend

```bash
cd backend
npm start:dev
```

### Frontend

```bash
npm dev
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