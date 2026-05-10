# GEMINI - PROJECT CONTEXT INDEX

Welcome! This file serves as the primary entry point for understanding the **Node-TS-Stream** project. It links to all detailed context files that define our architecture, standards, and goals.

## 🚀 PROJECT ESSENCE
A high-performance video streaming platform built with **Node.js (Fastify)** and **React**. Designed for high bandwidth, low latency, and massive scalability using industry-standard streaming principles (inspired by Netflix/YouTube).

---

## 📚 CONTEXT INDEX

### 1. [Project Overview](file:///home/tomas/learing-projects/node-ts-stream/context/project-overview.md)
General goals, user roles, and core features.

### 2. [Architecture Context](file:///home/tomas/learing-projects/node-ts-stream/context/architecture-context.md)
Detailed technical stack: **Fastify**, **Pino**, **PgBouncer**, and **ABR (HLS/DASH)** streaming strategy.

### 3. [Database Model](file:///home/tomas/learing-projects/node-ts-stream/context/database-model.md)
PostgreSQL schema, **Table Partitioning** for metrics, and connection pooling strategy.

### 4. [UI/UX Context](file:///home/tomas/learing-projects/node-ts-stream/context/ui-context.md)
Design aesthetics (vibrant, premium, glassmorphism) and component guidelines.

### 5. [Code Standards](file:///home/tomas/learing-projects/node-ts-stream/context/code-standards.md)
Naming conventions, monorepo build processes (**Dev: tsx** vs **Prod: Compiled JS**), and repository structure.

### 6. [Testing Strategy](file:///home/tomas/learing-projects/node-ts-stream/context/testing-strategy.md)
Plan for mock data, Range header validation, E2E playback tests, and load testing.

### 7. [Progress Tracker](file:///home/tomas/learing-projects/node-ts-stream/context/progress-tracker.md)
Live status of features and milestones.

---

## 🛠️ CORE ARCHITECTURAL PILLARS
- **Speed**: Fastify + Node.js Streams + Pino logging.
- **Scalability**: PgBouncer + PostgreSQL Partitioning for high-volume telemetry.
- **Quality**: Adaptive Bitrate (ABR) for seamless user experience.
- **Type Safety**: End-to-end TypeScript with a shared package.

## 🤖 AI INSTRUCTIONS
When working on this project, always:
1. Refer to the `context/` files before making architectural or design decisions.
2. Follow the **Code Standards** for all new code.
3. Update the **Progress Tracker** after completing significant tasks.
4. Maintain the "Premium & High Performance" vibe in both code and UI.
