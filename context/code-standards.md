# CODE STANDARDS

## GENERAL PRINCIPLES
- **Monorepo First**: Respect the separation between `apps/server`, `apps/client`, and `packages/shared`.
- **Type Safety**: No `any`. Share types between frontend and backend via the `shared` package.
- **Asynchronous Logic**: Use `async/await` exclusively. Handle errors with try-catch blocks in controllers/handlers.

## TYPESCRIPT
- **Naming**: PascalCase for Components/Interfaces, camelCase for functions/variables.
- **Shared Package**: All common interfaces (Video, User, Category) must reside in `packages/shared`.
- **Strictness**: Enable `strict` mode in all `tsconfig.json` files.

## BACKEND (FASTIFY)
- **Modular Plugins**: Use Fastify plugins (`fastify-plugin`) to encapsulate routes, database connection, and utilities.
- **Schema Validation**: Use Zod or Fastify's native JSON schema for request/response validation.
- **Piping**: Use Node.js streams to pipe video files directly to the response for efficiency.

## FRONTEND (REACT + VITE)
- **Functional Components**: Use arrow functions.
- **Custom Hooks**: Encapsulate data fetching (TanStack Query) and complex logic in hooks.
- **Tailwind v4**: Use the new `@theme` block in CSS and avoid legacy configuration where possible.

## DATABASE (PRISMA)
- **Naming**: Use PascalCase for models and camelCase for fields.
- **Relations**: Define explicit relations in `schema.prisma`.
- **Migrations**: Always commit migrations and keep the schema in sync across environments.

## FILE STRUCTURE
```text
/
├── apps/
│   ├── server/           # Fastify + TypeScript
│   │   ├── src/
│   │   │   ├── routes/   # API endpoints
│   │   │   ├── plugins/  # Fastify plugins (DB, Auth)
│   │   │   └── services/ # Business logic (Streaming, CRUD)
│   │   └── prisma/       # Prisma schema & migrations
│   └── client/           # React + Vite
│       ├── src/
│       │   ├── components/
│       │   ├── hooks/
│       │   └── pages/
├── packages/
│   └── shared/           # Common types & Zod schemas
└── package.json          # Root workspaces config
```
## BUILD & ARTIFACTS
- **Development**: Use `tsx` for running TypeScript files directly without manual compilation.
- **Production**: Compile all packages to JavaScript (`dist/`) using `tsc` or `esbuild` for maximum performance.
- **Shared First**: Always build `packages/shared` before applications to ensure type availability.
- **Production Runtime**: Use the native `node` command to run the compiled JavaScript from the `dist/` folder.
- **Prisma**: Always run `prisma generate` as part of the build step.

## GENERAL RULES
- **No Build Artifacts in Git**: Ensure `dist`, `build`, `node_modules`, and `.env` are always in `.gitignore`.
- **CI/CD**: Build processes must be idempotent and deterministic.
