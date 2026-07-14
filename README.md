# ✈️ PilotPath

> Your journey to becoming a pilot.

PilotPath is a modern aviation learning platform designed to help student pilots organize their studies, track their progress, and prepare for aviation certifications.

The project aims to provide a complete study ecosystem, combining learning management, knowledge assessment, and performance analytics.

---

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)

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

- Docker (optional)
- GitHub Actions (planned)

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

---

## 🚧 Project Status

**Current Version:** `v0.1.0`

### Completed

- NestJS backend
- Next.js frontend
- PostgreSQL connectivity
- Initial project documentation

### In Progress

- Prisma ORM
- Database modeling

---

## 📄 License

MIT