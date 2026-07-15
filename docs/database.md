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

DATABASE_URL=postgresql://user:password@localhost:5432/pilotpath

## Naming Convention

- snake_case for tables
- snake_case for columns
- UUID as primary keys
- created_at
- updated_at
- deleted_at (soft delete when applicable)