# FEATURE SPEC 02: DATABASE CONNECTION & SETUP
READ GEMINI.MD FILE FIRST, THEN PROCEED. 

This document outlines the setup of PostgreSQL with Prisma ORM, covering configuration for both development and production environments.

## 1. INSTALLATION & PREREQUISITES

### Dependencies
- **ORM**: `prisma` (dev dependency), `@prisma/client` (runtime dependency).
- **Driver**: `pg` (standard PostgreSQL driver).
- **Environment**: `dotenv` for managing `DATABASE_URL`.

### Database Instance
- **Development**: Local PostgreSQL instance or Docker container.
- **Production**: Managed PostgreSQL (e.g., Supabase, RDS) with **PgBouncer** enabled.

## 2. CONFIGURATION

### Prisma Schema
- Model definitions based on `context/database-model.md`.
- Primary keys and composite keys correctly defined.
- Native partitioning for `PlaybackMetric` handled via raw SQL migrations.

### Environment Variables (.env)
- `DATABASE_URL`: 
  - Dev: `postgresql://user:pass@localhost:5432/db_name`
  - Prod: `postgresql://user:pass@host:5432/db_name?pgbouncer=true` (must include pgbouncer flag).
- `DIRECT_URL`: Required by some providers (like Supabase) for migrations (bypasses PgBouncer).

## 3. SETUP PROCESS

### Development Step-by-Step
1. Initialize Prisma: `npx prisma init`.
2. Configure `schema.prisma`.
3. Create initial migration: `npx prisma migrate dev --name init`.
4. Generate client: `npx prisma generate`.
5. Verify connection via a simple script or Fastify plugin.

### Production Considerations
- **Migrations**: Run `prisma migrate deploy` in the CI/CD pipeline.
- **Connection Limits**: Ensure PgBouncer pool size is correctly configured for the number of Fastify instances.
- **Partitioning**: Ensure raw SQL scripts for partition management are executed.

## 4. LOCAL DEVELOPMENT WORKFLOW (DOCKER)

### Setup
1. Create `docker-compose.yml` in root.
2. Services:
   - **Postgres**: Version 16-alpine, listening on `5432`.
   - **Adminer**: Database management tool, listening on `8080`.
3. Run `docker compose up -d` to start the infrastructure.

### Initialization
1. Update `.env` with local credentials: `postgresql://devuser:devpassword@localhost:5432/stream_db`.
2. Run `npx prisma migrate dev` to sync schema.
3. Access Adminer at `http://localhost:8080` to manage the database.

## 5. VERIFICATION GOAL

- [ ] Prisma Client is correctly generated in `apps/server`.
- [ ] Database connection is successfully established during server startup.
- [ ] At least one model (`User` or `Video`) can be queried successfully.
- [ ] **SUCCESS**: Server logs "Database Connection: OK" on startup.
