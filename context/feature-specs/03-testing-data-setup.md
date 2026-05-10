# FEATURE SPEC 03: TESTING DATA & APPLICATIONS
READ GEMINI.MD FILE FIRST, THEN PROCEED. 

This document outlines the strategy for seeding the database with test data and setting up the testing frameworks for both the backend and frontend.

## 1. MOCK DATA SEEDING (PRISMA)

### Seeding Strategy
- Use `prisma/seed.ts` to populate the database.
- **Development**: Small dataset for quick iteration.
- **Integration/CI**: Larger dataset to test scalability and partitioning.

### Data Sets
- **Categories**: Action, Drama, Sci-Fi, Documentary.
- **Videos**: Test video records pointing to `/assets/test-videos/`.
- **Users**: Admin user and several test users with varying watch histories.
- **Metrics**: Synthetic heartbeat data to verify partitioning logic.

### Implementation
```typescript
// prisma/seed.ts snippet
async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Action' },
      { name: 'Sci-Fi' },
    ],
  });
}
```

## 2. BACKEND TESTING (VITEST + SUPERTEST)

### Setup
- Install `vitest`, `supertest`, and `@types/supertest` in `apps/server`.
- Configure `vitest.config.ts`.

### Test Categories
- **Unit Tests**: Helper functions, validation logic.
- **Integration Tests**: API endpoints (Health, Auth, Video Metadata).
- **Stream Tests**: Validation of Range headers and 206 status codes.

## 3. FRONTEND TESTING (VITEST)

### Setup
- Install `vitest` and `@testing-library/react` in `apps/client`.
- Configure `vitest.config.ts`.

### Focus
- Component rendering (Smoke tests).
- Hook logic (Connection testing).

## 4. E2E TESTING (PLAYWRIGHT)

### Setup
- Initialize Playwright in the root or a dedicated package.
- Configure to run against dev servers.

### Scenarios
- Page load and backend connection verification.
- (Future) Video playback and seeking.

## 5. VERIFICATION GOAL

- [ ] Seeding command `npx prisma db seed` runs successfully.
- [ ] `npm run test` in `apps/server` executes without errors.
- [ ] `npm run test` in `apps/client` executes without errors.
- [ ] **SUCCESS**: All test runners are initialized and a "Smoke Test" passes on both sides.
