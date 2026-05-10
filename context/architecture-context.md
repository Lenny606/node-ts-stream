# ARCHITECTURE CONTEXT

## OVERVIEW
The application follows a high-performance, full-stack monorepo architecture. It is designed to handle high-bandwidth video streaming by minimizing framework overhead and leveraging native Node.js streaming capabilities. The system is architected to transition from a local MVP to a globally distributed CDN-based delivery model (inspired by the "Open Connect" principle).

## PROJECT STRUCTURE (MONOREPO)
- `apps/server/`: Node.js backend using **Fastify** and **Pino**.
- `apps/client/`: React frontend using **Vite**.
- `packages/shared/`: Shared TypeScript types and Zod schemas.

## TECHNOLOGY LAYERS

### 1. Frontend Layer (UI/UX)
- **Framework**: React 19 (Client-side rendering for responsiveness).
- **Bundler**: Vite.
- **Styling**: Tailwind CSS v4.
- **Video Player**: Custom implementation using native `<video>` API or specialized libraries (e.g., Video.js / Shaka Player) to support **HLS/DASH** and adaptive bitrate.
- **State Management**:
    - **Server State**: TanStack Query.
    - **Client State**: Zustand / React Context.

### 2. Backend Layer (Server-Side)
- **Runtime**: Node.js + TypeScript.
- **Framework**: **Fastify** (Chosen for low overhead and superior performance).
- **Logging**: **Pino** (High-speed, non-blocking JSON logging).
- **Streaming Logic**: 
    - **Native Streams**: Direct use of `fs.createReadStream` piped to Fastify response.
    - **Backpressure Handling**: Automatic flow control to prevent memory overflow.
    - **Partial Content**: Full support for RFC 7233 (HTTP 206) via Range headers for seamless seeking.
- **Validation**: Zod (Shared with frontend).

### 3. Video Processing & Adaptive Bitrate (ABR)
- **Strategy**: Transitioning from single-file MP4 streaming to **HLS (HTTP Live Streaming)** or **MPEG-DASH**.
- **Encoding**: 
    - **FFmpeg**: For segmenting and multi-resolution transcoding.
    - **Per-Title Optimization**: (Future) Optimizing bitrates based on content complexity.
- **Packaging**: Segments (.ts / .m4s) served as static assets with low-latency headers.

### 4. Database Layer (Persistence)
- **Database**: PostgreSQL.
- **ORM**: Prisma ORM.
- **Connection Pooling**: **PgBouncer** (Running in Transaction Mode to handle thousands of concurrent client connections).

### 5. Monitoring & Telemetry
- **Storage**: Time-based partitioning in PostgreSQL for high-volume metrics.
- **Metrics**: Real-time tracking of Quality of Experience (QoE) including buffering, bitrate, and playback errors.

### 6. Storage & Delivery
- **Assets**: 
    - **Local**: `uploads/` for development.
    - **Production**: S3-compatible object storage.
### 7. Delivery (CDN)
    - **Origin**: Fastify serves as the origin server.
    - **Edge**: Integrated with CDNs (Cloudflare/CloudFront) to cache segments close to the user.

## DATA FLOW
1. **Metadata Request**: Client fetches video lists/details via TanStack Query.
2. **Playback Initiation**: Client requests a manifest file (`.m3u8` or `.mpd`).
3. **Segment Streaming**: Client player dynamically requests video segments based on network throughput. Fastify/CDN serves these segments via HTTP 206.
4. **Telemetry**: Real-time playback metrics are sent to the API. Requests pass through **PgBouncer** and are written to **partitioned tables** for maximum throughput.

## SECURITY & STANDARDS
- **Environment Variables**: Managed via `.env`.
- **Type Safety**: End-to-end type safety via `shared` package.
- **CORS**: Strict policy to allow only authorized domains.
- **Standard Adherence**: Strict adherence to RFC 7233 for range requests.
