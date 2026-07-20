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
- JWT authentication
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
````

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
│   ├── roadmap.md
│   └── adr.md
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

**Current Version:** `v0.6.2`

## Completed

### Backend Foundation

* NestJS backend setup
* PostgreSQL connectivity
* Prisma ORM integration
* Database schema
* Database migrations
* Core domain modeling

### Authentication

* User registration
* Login
* JWT authentication
* Password hashing
* Protected API routes
* Swagger authentication

### Learning Platform

* Certifications
* Subjects
* Enrollments
* Study sessions
* Study history
* Flashcards
* Flashcard reviews
* Question bank
* Question practice
* Mock exams

### Learning Analytics

* Learning statistics API
* Flashcard performance statistics
* Question performance statistics
* Mock exam statistics
* Subject performance analytics

### Frontend Foundation

* Next.js App Router setup
* TypeScript configuration
* Tailwind CSS setup
* shadcn/ui integration
* Base UI configuration
* Lucide Icons integration
* Feature-based folder structure
* ESLint configuration
* Prettier configuration
* Provider architecture

---

## In Progress

* Frontend feature implementation
* Authentication UI
* Application layout
* Dashboard
* Learning analytics visualization

---

# 📄 License

MIT