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
* shadcn/ui using Base UI primitives
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

### Fonts

- Geist Font

Provided through Next.js font optimization.

---

## 3. Project Structure

The frontend follows a feature-based organization to prevent components from becoming tangled as the application grows.

```text
frontend/
│
├── src/
│   │
│   ├── app/
│   │
│   ├── components/
│   │   ├── ui/
│   │   └── shared/
│   │
│   ├── features/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │   ├── api/
│   │   └── utils/
│   │
│   ├── providers/
│   │
│   └── types/
│
├── public/
├── components.json
├── package.json
└── tsconfig.json

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

## API Client Layer

The frontend uses a centralized API client located at:

src/lib/api/

├── client.ts
└── endpoints.ts

The API client is responsible for:

- Backend communication
- Base URL configuration
- Authentication headers
- Error normalization
- Response handling

Feature modules must consume the centralized API client instead of creating independent HTTP clients.

---

## 5. Authentication Flow

Authentication is managed through a global AuthProvider.

Current implementation includes:

- Login
- Registration
- JWT storage
- Authentication Context
- Protected route guard
- Session persistence through localStorage
- Automatic session restoration after page reload

Future iterations will introduce refresh tokens and backend session validation.

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

The dashboard will consume Learning Analytics APIs to display user progress, performance indicators and learning trends.

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

### Questions Feature

Responsible for question practice and knowledge evaluation.

Includes:

- Question listing
- Answer submission
- Practice history
- Performance tracking

*On-screen messages:* "Responder", "Próxima Questão", "Ver Explicação".

### Analytics Feature

The main learning overview is retrieved through:

```http
GET /api/v1/learning/statistics
```

The endpoint provides:

- Overall flashcard accuracy
- Overall question accuracy
- Mock exam performance
- Subject performance summary
- Weak subjects
- Performance trends

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

Subject performance statistics are retrieved through:

```http
GET /api/v1/learning/statistics/subjects
```

The endpoint provides:

- Accuracy per subject
- Questions answered per subject
- Flashcard performance per subject
- Overall subject accuracy
- Weak subject ranking

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

* Next.js project setup
* TypeScript configuration
* Tailwind CSS configuration
* shadcn/ui setup
* Base project structure
* ESLint configuration
* Prettier configuration
* Provider structure

### Planned

* Dashboard implementation
* Certification progress UI
* Flashcard review interface
* Mock exam interface
* Analytics dashboard visualization