# Architecture Decision Records

---

## ADR-001

### Title

Database Selection

### Date

2026-07-14

### Decision

Use PostgreSQL as the primary relational database.

### Rationale

PilotPath manages highly relational entities such as users, subjects, study sessions, flashcards and exams.

PostgreSQL provides excellent consistency, performance and long-term scalability.

---

## ADR-002

### Title

Backend Framework

### Date

2026-07-14

### Decision

Use NestJS with TypeScript.

### Rationale

NestJS offers a scalable modular architecture, dependency injection and excellent TypeScript support, making it well suited for medium and large applications.

---

## ADR-003

### Title

Package Manager

### Date

2026-07-14

### Decision

Use npm as the project's package manager.

### Rationale

npm is the default package manager for Node.js, requires no additional setup, has excellent ecosystem compatibility, and is sufficient for the project's size and complexity.

---

## ADR-004

### Title

Authentication Strategy

### Date

2026-07-16

### Decision

Use JWT Bearer Authentication with bcrypt password hashing.

### Rationale

JWT provides a stateless authentication mechanism suitable for REST APIs.

Passwords are never stored in plain text and are hashed using bcrypt before persistence.

The initial implementation uses access tokens only, keeping the authentication layer simple while allowing refresh tokens and session management to be introduced in future iterations.

---

# ADR 005

### Title

Standard Pagination Response

### Date

2026-07-16

## Decision

All paginated endpoints will return:

{
  data: [],
  meta: {}
}

using shared pagination DTOs and utilities.

## Rationale

Multiple API resources require pagination.

Pros:
- Consistent API responses
- Easier frontend integration
- Less duplicated code

Cons:
- Small initial abstraction cost

---

# ADR-006

## Title

Frontend Framework

## Date

2026-07-19

## Decision

Use Next.js with React and TypeScript as the frontend framework.

## Rationale

PilotPath requires a scalable frontend architecture capable of supporting authentication, dashboards, study interfaces, analytics and future aviation operational features.

Next.js provides:

* Modern React architecture
* File-based routing
* Server-side capabilities
* Performance optimizations
* Strong ecosystem support

The App Router architecture will be used as the foundation for the frontend application.

Pros:

* Scalable application structure
* Excellent TypeScript support
* Good production performance
* Large ecosystem

Cons:

* Requires understanding of Server Components and Client Components
* Introduces framework-specific conventions

---

# ADR-007

## Title

Frontend Feature-Based Architecture

## Date

2026-07-19

## Decision

Organize the frontend using a feature-based architecture.

## Rationale

PilotPath contains multiple independent business domains:

* Authentication
* Certifications
* Flashcards
* Questions
* Mock Exams
* Analytics

The frontend will organize code by business capability instead of only technical layers.

Example:

```
features/

mock-exams/
 ├── api/
 ├── components/
 ├── hooks/
 └── types.ts
```

Each feature owns its domain-specific logic, API communication and components.

Pros:

* Better separation of concerns
* Easier maintenance
* Easier future team scaling
* Reduced coupling

Cons:

* Possible duplication between features

---

# ADR-008

## Title

Frontend Design System

## Date

2026-07-19

## Decision

Use Tailwind CSS combined with shadcn/ui as the frontend design system.

## Rationale

PilotPath requires a consistent and customizable interface across multiple modules.

Tailwind CSS provides utility-based styling while shadcn/ui provides accessible and reusable UI primitives.

The application visual identity follows the "Night Flight" concept:

* Dark interface
* High contrast
* Aviation cockpit inspired design
* Amber primary accents

Pros:

* Consistent UI patterns
* Accessibility-focused components
* Fast development
* Easy customization

Cons:

* Components are maintained inside the project repository

---

# ADR-009

## Title

Frontend Server State Management

## Date

2026-07-19

## Decision

Use TanStack Query for frontend server state management.

## Rationale

PilotPath consumes multiple backend resources:

* Certifications
* Subjects
* Questions
* Flashcards
* Mock Exams
* User progress

TanStack Query will manage:

* API data fetching
* Caching
* Background synchronization
* Mutation invalidation
* Loading and error states

Local React state should only be used for UI-specific state.

Pros:

* Automatic caching
* Reduced boilerplate
* Better synchronization with backend data

Cons:

* Adds another abstraction layer

---

# ADR-010

## Title

Frontend Form Management and Validation

## Date

2026-07-19

## Decision

Use React Hook Form with Zod validation for frontend forms.

## Rationale

PilotPath contains multiple forms requiring reliable validation:

* Authentication
* Study sessions
* Mock exams
* Future administrative features

React Hook Form provides performant form state management while Zod provides type-safe schemas.

Frontend validation rules should match backend DTO validations whenever possible.

Pros:

* Type safety
* Better developer experience
* Consistent validation rules

Cons:

* Requires maintaining validation schemas in two layers

---

# ADR-011

## Title

Frontend API Communication Layer

## Date

2026-07-19

## Decision

Use a centralized API client for frontend-backend communication.

## Rationale

The frontend communicates exclusively through the backend REST API.

API communication will be centralized to handle:

* HTTP requests
* Authentication headers
* Error handling
* Response normalization

Structure:

```
lib/

api/
 └── client.ts
```

Each feature owns its own `api/*.api.ts` file, calling `apiClient` with the relative endpoint path. Feature modules consume the centralized client instead of creating independent HTTP configurations.

Pros:

* Consistent API behavior
* Easier maintenance
* Simplified authentication handling

Cons:

* Requires careful abstraction boundaries

---

# ADR-012

## Title

Frontend Component Architecture

## Date

2026-07-19

## Decision

Use three component layers:

1. UI Components
2. Shared Components
3. Feature Components

## Rationale

Components have different responsibilities and reuse levels.

### UI Components

Generic primitives.

Examples:

* Button
* Card
* Dialog

### Shared Components

Application-wide components.

Examples:

* Sidebar
* Header
* Loading states

### Feature Components

Domain-specific components.

Examples:

* ExamTimer
* FlashcardReview
* CertificationProgress

This separation prevents domain logic from leaking into reusable components.

Pros:

* Clear ownership
* Better reuse
* Easier maintenance

Cons:

* Requires discipline when deciding component ownership