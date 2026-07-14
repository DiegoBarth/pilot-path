# Architecture Decision Records

---

## ADR-001

### Title

Database Selection

### Status

Accepted

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

### Status

Accepted

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

### Status

Accepted

### Date

2026-07-14

### Decision

Use npm as the project's package manager.

### Rationale

npm is the default package manager for Node.js, requires no additional setup, has excellent ecosystem compatibility, and is sufficient for the project's size and complexity.