# Database

## DBMS

PostgreSQL

## ORM

Prisma ORM

Prisma is used as the database access layer between the NestJS application and PostgreSQL.

Responsibilities:

- Database queries
- Schema management
- Migrations
- Type-safe database access

## Connection

Database connection is configured through environment variables.

Example:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pilotpath
```

## Naming Convention

- snake_case for tables
- snake_case for columns
- UUID as primary keys
- created_at
- updated_at
- deleted_at (soft delete when applicable)

## Current Schema

Current entities:

- User
- Certification
- Subject
- CertificationSubject
- Enrollment
- StudySession
- Flashcard
- UserFlashcard
- FlashcardReview
- Question
- QuestionAlternative
- UserQuestion
- MockExam
- MockExamQuestion

### Enums

`StudyType` values:

- `READING`
- `EXERCISES`
- `FLASHCARDS`
- `VIDEO`
- `SIMULATOR` (flight simulator sessions)
- `MOCK_EXAM` (mock certification exams)
- `OTHER`

Analytics features are generated dynamically from existing learning activity data, including flashcards, questions and mock exams. No dedicated analytics tables are currently required.

## Development Workflow

Whenever the database schema changes:

1. Update the Prisma schema.
2. Validate the schema.
3. Generate a new migration.
4. Apply the migration.
5. Regenerate the Prisma Client.
6. Update the seed if necessary.

## Common Commands

Run from the `backend` directory:

```bash
npx prisma validate
npx prisma format
npx prisma migrate dev --name <migration-name>
npx prisma generate
npx prisma db seed
```

> Stop the backend before `npx prisma generate` on Windows to avoid file lock errors (`EPERM`).

## Reset Development Database (Only if Necessary)

Use the following command **only when you need to completely recreate the local development database**, such as after migration conflicts or inconsistent local data.

> **Warning:** This command deletes all data, reapplies every migration, and executes the project seed.

```bash
npx prisma migrate reset
```

If reset fails with `P3015` (missing `migration.sql`), remove any empty migration folder under `prisma/migrations/` and run the command again.
