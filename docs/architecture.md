# PilotPath Architecture

## Overview

PilotPath is an aviation learning platform designed to help student pilots organize their studies, track progress and prepare for aviation certifications.

The system will be developed as a full-stack application using a separated frontend and backend architecture.

---

# High Level Architecture
          User
            |
            |
        Next.js
            |
            |
        REST API
            |
            |
        NestJS
            |
            |
        Prisma
            |
            |
      PostgreSQL
---

# Backend

Technology:

- NestJS
- TypeScript
- Prisma ORM
- REST API

Responsibilities:

- Business rules
- Authentication
- Data persistence
- API management

---

# Frontend

Technology:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query

Responsibilities:

- User interface
- Client-side state
- User interactions

---

# Database

Technology:

- PostgreSQL

Responsibilities:

- Store users
- Courses
- Subjects
- Study sessions
- Questions
- Statistics

---

# API Style

The backend will expose REST APIs using JSON communication.

Example:
GET /api/v1/subjects

POST /api/v1/study-sessions

GET /api/v1/dashboard

---

# Architecture Principles

- Clean Code
- SOLID principles
- Separation of responsibilities
- Database migrations
- Automated tests
- Documentation