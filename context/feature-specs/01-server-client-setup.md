# FEATURE SPEC 01: SERVER & CLIENT INITIALIZATION
READ GEMINI.MD FILE FIRST, THEN PROCEED. 

This document outlines the initial setup of the Fastify backend and React + Vite frontend, establishing a secure and functional connection between them.

## 1. BACKEND: FASTIFY SETUP

### Environment Configuration
- Support for `development` and `production` environments.
- Use `.env` files for environment variables (never committed).
- **Development**: Fast reloading using `tsx`.
- **Production**: Optimized runtime using compiled JavaScript.

### Security (CORS & CSP)
- **CORS**:
  - Development: Allow requests from `http://localhost:5173`.
  - Production: Strict origin validation based on environment variables.
- **CSP (Content Security Policy)**:
  - Configure basic CSP headers to prevent XSS and data injection.
  - Development: Relaxed for HMR and debugging.
  - Production: Strict policy allowing only trusted sources.

### Router Structure
- Modular structure using Fastify plugins.
- Main entry point: `src/index.ts`.
- Route prefixing (e.g., `/api/v1`).
- Healthy check endpoint: `GET /health`.

## 2. FRONTEND: REACT + VITE SETUP

### Core Setup
- Initialize using Vite with React + TypeScript.
- Clean structure: `src/components`, `src/hooks`, `src/pages`.
- Connection to Backend:
  - Base API URL configured via environment variables (`VITE_API_URL`).
  - Use `fetch` or a simple wrapper for initial connection testing.

### Backend Connection
- Implementation of a simple `Ping` component or hook to verify connectivity.
- Display "Connected" status in the console or a minimal UI element.

## 3. VERIFICATION & SUCCESS GOAL

- [ ] Fastify server starts in dev mode without errors.
- [ ] React + Vite client starts in dev mode without errors.
- [ ] Client can successfully fetch data from the server's health/test endpoint.
- [ ] CORS and CSP headers are correctly applied in both environments.
- [ ] **SUCCESS**: Console output in browser confirms: "Backend Connection: OK".
