# TESTING STRATEGY & MOCK DATA

## OVERVIEW
Testing a high-bandwidth streaming application requires focus on three areas: **Correctness** (Range headers/206 status), **Performance** (latency/throughput), and **Scalability** (telemetry data volume/partitioning).

## 1. MOCK DATA STRATEGY
To simulate a production-like environment, we use a multi-tiered seeding strategy.

### Database Seeding (Prisma)
- **Users**: 1,000+ mock users with different roles.
- **Categories**: Standard genres (Action, Sci-Fi, etc.).
- **Videos**: 100+ metadata records pointing to various test files.
- **Playback Metrics**: 1,000,000+ records pre-seeded into different partitions to test query performance.

### Asset Seeding (Filesystem)
- `test-video-tiny.mp4`: (1MB) For rapid unit tests.
- `test-video-large.mp4`: (500MB+) For bandwidth testing.
- `test-video-4k.mp4`: For testing high-bitrate scenarios.

---

## 2. TESTING TIERS

### A. Unit & Integration (Vitest + Supertest)
Focus on the Fastify backend logic.
- **Range Header Parsing**: Verify that `bytes=0-1023` returns exactly 1024 bytes.
- **Status Codes**: Ensure `206 Partial Content` is returned when a range is requested.
- **Boundary Conditions**: Test requesting the last byte, invalid ranges (out of bounds), and missing ranges (200 OK).
- **Telemetry API**: Verify that heartbeats are correctly written to the DB through PgBouncer.

### B. End-to-End Testing (Playwright)
Focus on the real user experience in the browser.
- **Playback Success**: Verify that the `<video>` element starts playing.
- **Seeking/Scrubbing**: Click on the timeline and verify that the browser sends a new Range request.
- **ABR Simulation**: Use Playwright's network throttling to force the player to switch bitrates and verify the `PlaybackMetric` event is sent.
- **Watch Progress**: Stop video at 01:20, refresh, and verify it resumes from the same spot.

### C. Load Testing (k6 / Artillery)
Focus on scalability and high bandwidth.
- **Concurrent Streams**: Simulate 100+ concurrent users streaming segments.
- **Telemetry Flood**: Simulate 1,000+ heartbeats per second to verify PgBouncer and PostgreSQL partitioning.
- **Bandwidth Saturation**: Measure the point where Fastify throughput starts to degrade.

---

## 3. INFRASTRUCTURE TESTING
- **PgBouncer**: Verify that connections are correctly pooled and reused in transaction mode.
- **Partitioning**: Verify that `PlaybackMetric` records are being written into the correct daily partition.
- **Cache Hits**: If using a CDN, verify `X-Cache: HIT` headers on segment requests.

## 4. RECOMMENDED TOOLS
| Tool | Purpose |
| :--- | :--- |
| **Vitest** | Unit & Integration testing. |
| **Playwright** | E2E, Video playback, and UI testing. |
| **k6** | Load testing (written in JS). |
| **Supertest** | HTTP assertions for Fastify. |
| **Prisma Studio** | Manual data verification. |
