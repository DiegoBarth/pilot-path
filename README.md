# ✈️ PilotPath

> Your journey to becoming a pilot.

PilotPath is a platform built to accompany a pilot throughout their entire journey, from the first certification to their professional career. It combines study management, operational tools, performance tracking, and aviation resources in a single ecosystem.

---

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)

---

## 🚀 Features

### 📚 Study Management

- Certification enrollments
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

### 🔐 Authentication

- User registration
- User login
- JWT authentication
- Protected API routes
- Role-based authorization foundation

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
      Authentication Layer
                  │
             Prisma ORM
                  │
                  ▼
            PostgreSQL

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
- Database Migrations
- Database Seeding

---

## 🚧 Project Status

**Current Version:** `v0.2.0`

### Completed

- NestJS backend
- Next.js frontend
- PostgreSQL connectivity
- Prisma ORM integration
- Initial database schema
- First database migration
- Initial project documentation
- Core database modeling
- JWT authentication
- User registration and login
- Password hashing
- Protected API routes
- Swagger/OpenAPI documentation

### In Progress


---

## 📄 License

MIT