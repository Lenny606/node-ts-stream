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
- **Video Player**: Custom implementation using **Shaka Player** or **hls.js**. 
    - **Reasoning**: Native `<video>` tag does not support HLS/DASH in most desktop browsers (Chrome, Firefox). These libraries provide the necessary Media Source Extensions (MSE) polyfills.
- **Adaptive Bitrate**: Managed by the player library based on network conditions.

### 2. Backend Layer (Server-Side)
- **Runtime**: Node.js + TypeScript.
- **Framework**: **Fastify**.
- **Streaming Logic**:
    - **MVP (Progressive)**: Serving single MP4 files using `fs.createReadStream` with **Range Header** support (HTTP 206) via `fastify-static` or custom stream piping.
    - **Production (Segmented)**: Serving static `.m3u8` manifests and `.ts` / `.m4s` segments. 
    - **Backpressure**: Essential for progressive streaming to prevent Node.js process memory spikes.

### 3. Video Processing & Adaptive Bitrate (ABR)
- **Strategy**: Offline transcoding for the MVP.
- **Tooling**: FFmpeg for generating multi-resolution ladders (360p, 720p, 1080p) and segmenting.
- **Separation of Concerns**: 
    - **API Server**: Handles metadata and serves segments.
    - **Worker Node (Future)**: Dedicated high-CPU instances for FFmpeg transcoding to prevent API latency.
- **Packaging**: Segments served with aggressive caching headers (`Cache-Control: public, max-age=31536000`).

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
