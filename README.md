# ✈️ PilotPath

> Your journey to becoming a pilot.

PilotPath is a modern aviation learning platform designed to help student pilots organize their studies, track their progress, and prepare for aviation certifications.

The project aims to provide a complete study ecosystem, combining learning management, knowledge assessment, and performance analytics.

---

## 🚀 Features

### 📚 Study Management

- Study plans
- Study sessions
- Study history
- Learning progress
- Personal goals

### 🛫 Aviation Knowledge

- Subjects
- Question bank
- Flashcards
- Mock exams

### 📊 Analytics

- Dashboard
- Performance statistics
- Progress tracking
- Achievements

### 👤 User Experience

- Authentication
- User profile
- Responsive interface
- Modern UI

---

## 🛠 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query

### Backend

- NestJS
- TypeScript
- Prisma ORM
- REST API

### Database

- PostgreSQL

### Infrastructure

- Docker
- GitHub Actions

---

## 🏗 Architecture

```text
                User
                  │
                  ▼
          Next.js Frontend
                  │
           REST / JSON API
                  │
                  ▼
          NestJS Backend
                  │
               Prisma ORM
                  │
                  ▼
            PostgreSQL
```

---

## 📁 Project Structure

```text
pilot-path/
│
├── backend/
├── frontend/
├── docs/
├── docker/
├── .github/
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 📖 Documentation

Project documentation is available in the `docs` directory.

- Architecture
- Development Setup
- Roadmap
- Architecture Decision Records (ADR)
- Database Design
- API Documentation

---

## 🚧 Project Status

**Current Version:** `v0.1 - Foundation`

The project is currently focused on establishing the development environment and application architecture.

---

## 📄 License

MIT