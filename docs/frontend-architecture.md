# PilotPath - Frontend Architecture & Implementation Guide

## 1. Overview

The PilotPath frontend is a modern web application built with Next.js and React, responsible for user interaction, data visualization and communication with the backend REST API.

The application follows a feature-based architecture focused on scalability, maintainability and separation of concerns.

---

## 2. Technology Stack

### Core

* Next.js
* React
* TypeScript

### UI

* Tailwind CSS
* shadcn/ui
* Lucide Icons
* **Aesthetic Concept:** "Night Flight" (High-contrast dark mode simulating an aircraft glass cockpit).

### State & Data

* TanStack Query
* React Hook Form
* Zod

### Communication

* REST API
* JWT Authentication

### Tooling

* ESLint
* Prettier
* Vitest
* Playwright (planned)

---

## 3. Project Structure

The frontend follows a feature-based organization to prevent components from becoming tangled as the application grows.

```text
frontend/
│
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   └── shared/
│
├── features/
│   ├── auth/
│   ├── certifications/
│   ├── flashcards/
│   ├── questions/
│   └── mock-exams/
│
├── hooks/
│
├── lib/
│   ├── api/
│   │    ├── client.ts
│   │    └── endpoints.ts
│   ├── auth/
│   └── utils/
│
├── types/
│
└── providers/

```

---

## 4. API Integration

The frontend communicates with the backend through REST endpoints.

The communication layer is centralized.

**Responsibilities:**

* HTTP requests
* Authentication headers
* Error handling
* Response normalization

**Example Feature Structure:**

```text
features/
└── mock-exams/
    ├── api/
    │   └── mock-exams.api.ts
    ├── hooks/
    │   └── useMockExam.ts
    ├── components/
    │   └── ExamTimer.tsx
    └── types.ts

```

---

## 5. Authentication Flow

Authentication uses JWT tokens.

**Flow:**

1. User logs in.
2. Backend returns JWT token.
3. Frontend manages authentication state. *(Note: The specific storage mechanism—e.g., httpOnly cookie, localStorage, Next middleware—will be defined via a future ADR).*
4. API client automatically attaches Authorization header.
5. Protected routes validate authentication state.

**Protected areas:**

* Dashboard
* Certifications
* Flashcards
* Mock Exams
* Analytics

*On-screen messages for Auth module:* "E-mail", "Senha", "Entrar", "Criar Conta".

---

## 6. Data Fetching Strategy

TanStack Query is the standard solution for server state management.

**Responsibilities:**

* API data fetching
* Request caching
* Background synchronization
* Loading and error states
* Query invalidation after mutations

Local component state should only be used for UI state.

**Examples:**

* **Server State:** Certifications, Questions, Flashcards, Mock Exams.
* **Local State:** Modal visibility, Form inputs, Temporary UI interactions.

---

## 7. Form Strategy

Forms use React Hook Form with Zod validation.

**Responsibilities:**

* Client-side validation
* Type-safe schemas
* Error messages
* Form state management

Validation must match backend DTO rules whenever possible to ensure consistency across the stack.

---

## 8. Component Architecture

Components are divided into three levels:

### UI Components

Reusable primitives from shadcn/ui.

* Example: Button, Card, Dialog, Input.

### Shared Components

Application-wide components.

* Example: Sidebar, Header, Loading states.

### Feature Components

Domain-specific components.

* Example: ExamTimer, FlashcardReview, CertificationProgress.

---

## 9. Feature Modules

### Dashboard Feature

The dashboard consumes Learning Analytics APIs to display user progress, performance indicators and learning trends.

* **Components:** Progress summary, quick access actions, and study activity timeline.
* *On-screen messages:* "Painel", "Continuar Última Sessão", "Quiz Rápido", "Minhas Certificações".

### Certifications Feature

Responsible for study management and curriculum tracking.

* **Components:** Certification progress bars, subject grids, and topic starters.
* *On-screen messages:* "Certificações", "Currículo da Certificação", "Histórico de Estudos", "Iniciar Tópico".

### Flashcards Feature

Responsible for the active recall and spaced repetition learning system.

* **Components:** 3D flip cards, review actions, and progress calculation.
* *On-screen messages:* "Mostrar Resposta", "Acertei", "Errei".

### Mock Exams Feature

Responsible for simulated exams.

* **Includes:** Exam creation, Question navigation, Timer management, Answer submission, Result visualization.
* **Timer Logic:**
Timer is calculated from:
* `startedAt`
* configured `duration`
* current time


The frontend must persist unfinished exams and restore the session when reopened. This behavior depends on backend persistence through `MockExam` status fields and frontend session recovery logic.
* *On-screen messages:* "Tempo Restante: [MM:SS]", "Anterior", "Próxima", "Finalizar Simulado", "Pontuação Final", "Aprovado / Reprovado".

### Analytics Feature

Responsible for displaying learning performance insights.

Includes:

- Flashcard accuracy
- Question accuracy
- Mock exam performance
- Subject performance
- Weak subjects
- Performance trends

Data is provided by the backend Learning Statistics API.

Flashcard statistics are retrieved through:

```http
GET /api/v1/learning/statistics/flashcards
```

The endpoint provides:

- Total reviews
- Correct answers
- Wrong answers
- Accuracy percentage
- Monthly review history

Question performance statistics are retrieved through:

```http
GET /api/v1/learning/statistics/questions
```

The endpoint provides:

- Total answered questions
- Correct answers
- Wrong answers
- Overall accuracy
- Performance grouped by difficulty level

Mock exam performance statistics are retrieved through:

```http
GET /api/v1/learning/statistics/mock-exams
```

The endpoint provides:

- Completed exams
- Average score
- Approval rate
- Best result
- Worst result
- Score history over time

---

## 10. UI States

Every data-driven screen must handle:

### Loading

Display skeleton components using `shadcn/ui` skeleton to avoid layout shifts.

### Empty State

Provide contextual actions (e.g., prompting the user to enroll in a certification).

### Error State

Display recoverable errors gracefully.

* *Example On-screen message:* "Não foi possível carregar seus simulados. Tentar novamente."

---

## 11. Responsive Strategy

**Desktop:**

* Persistent sidebar
* Multi-column layouts

**Tablet:**

* Collapsible navigation

**Mobile:**

* Bottom navigation
* Single-column content

---

## 12. Accessibility

The application follows strict accessibility principles to ensure a robust user experience:

* Keyboard navigation (fully operable without a mouse).
* Proper semantic HTML.
* ARIA labels when required (especially for complex UI components).
* Color contrast compliance (crucial for the "Night Flight" high-contrast aesthetic).
* Screen reader compatibility.

---

## 13. Development Principles

The frontend follows:

* Feature-based architecture
* Separation of concerns
* Type safety
* Reusable components
* API-first development
* Server/client state separation
* Accessibility by default
* Consistent UI patterns

---

## 14. Implementation Status

### Completed

* Project setup
* Authentication screens
* API integration foundation

### Planned

* Dashboard
* Certification progress
* Flashcard review
* Mock exam interface
* Analytics dashboard