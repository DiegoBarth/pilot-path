# ✈️ PilotPath

> Your journey to becoming a pilot.

PilotPath is a platform built to accompany pilots throughout their entire journey, from the first aviation certification to their professional career.

The platform combines study management, aviation knowledge, performance tracking and future operational tools into a single ecosystem.

---

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)

---

# 🚀 Features

## 📚 Study Management

- Certification enrollments
- Certification curriculum
- Subject management
- Study sessions
- Paginated study history
- Study activity filtering

---

## 🛫 Aviation Knowledge

- Aviation subjects
- Question bank
- Question practice
- Flashcards
- Mock exams

---

## 📊 Learning Analytics

- Learning statistics aggregation
- Flashcard performance analysis
- Question performance analysis
- Mock exam analytics
- Subject performance analysis
- Weak subject detection
- Performance trends

---

## 🔐 Authentication

- User registration
- User login
- JWT authentication (access + refresh tokens)
- Protected API routes

---

# 🛠 Tech Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Base UI
- Lucide Icons
- TanStack Query
- React Hook Form
- Zod

## Backend

- NestJS
- TypeScript
- Prisma ORM
- REST API
- Swagger/OpenAPI

## Database

- PostgreSQL

## Infrastructure

- Docker (optional)
- GitHub Actions (planned)

---

# 🏗 Architecture

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
```

The frontend follows a feature-based architecture using Next.js App Router.

The backend follows a modular architecture using NestJS modules.

---

# 📁 Project Structure

```text
pilot-path/
│
├── backend/
│   └── NestJS application
│
├── frontend/
│   └── Next.js application
│
├── docs/
│   ├── architecture.md
│   ├── frontend-architecture.md
│   ├── database.md
│   ├── setup.md
│   ├── roadmap.md
│   ├── decisions.md
│   └── features/
│       ├── flashcards.md
│       ├── mock-exams.md
│       ├── question-bank.md
│       └── question-practice.md
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 📖 Documentation

Project documentation is available in the `docs` directory.

Includes:

* System Architecture
* Frontend Architecture
* Development Setup
* Roadmap
* Architecture Decision Records (ADR)
* Database Migrations
* Database Seeding
* Feature Documentation (`docs/features/`)

---

# 🚀 Development

## Backend

```bash
cd backend

npm install

npm run start:dev
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Useful commands:

```bash
npm run lint

npm run build
```

---

# 🚧 Project Status

**Current version:** `v0.6.0` (backend and frontend)

**Roadmap milestone:** `v0.6 - Frontend Application` (see [docs/roadmap.md](docs/roadmap.md))

## Completed

### Backend Foundation

* NestJS backend setup
* PostgreSQL connectivity
* Prisma ORM integration
* Database schema and migrations
* Core domain modeling

### Authentication

* User registration and login
* JWT access and refresh tokens
* Password hashing
* Protected API routes
* Swagger authentication

### Learning Platform

* Certifications, subjects and enrollments
* Study sessions and study history
* Flashcards and flashcard reviews
* Question bank and question practice
* Mock exams

### Learning Analytics (API)

* Learning statistics aggregation
* Flashcard, question and mock exam performance
* Subject performance analytics and weak subject detection

### Frontend Application

* Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
* Feature-based architecture, API client, TanStack Query
* Authentication flow with protected routes and session persistence
* Application shell (sidebar + layout)
* Dashboard with learning statistics and recent activity
* Certification list and detail pages
* Subject study page with practice history
* Flashcard review interface
* Mock exam flow (create, session, results, history)

---

## In Progress

* Dedicated analytics page (full learning statistics UI)
* Question practice interface
* Responsive design and UX refinements

---

# 📄 License

MIT