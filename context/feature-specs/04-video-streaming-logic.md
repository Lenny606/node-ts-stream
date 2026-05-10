# FEATURE SPEC 04: CORE VIDEO STREAMING LOGIC

This document defines the implementation of high-performance video streaming using Node.js streams, focusing on HTTP Range Requests (RFC 7233) and efficient resource management.

## 1. STREAMING STRATEGY

### Progressive Streaming (MP4)
- Serve MP4 files using `fs.createReadStream`.
- Support for **HTTP 206 Partial Content**.
- Handle **Range Headers** (`bytes=start-end`) to allow seeking/scrubbing.

### Backpressure & Performance
- Use `stream.pipe()` or Fastify's native stream handling to manage backpressure.
- Prevent memory spikes by avoiding loading entire files into buffers.
- Use `fs.stat` to retrieve file size and metadata before streaming.

## 2. BACKEND IMPLEMENTATION (FASTIFY)

### Range Header Parsing
- Extract `Range` from request headers.
- Validate range format and bounds.
- Calculate `Content-Range`, `Content-Length`, and `Accept-Ranges: bytes`.

### Response Structure
- **Headers**:
  - `Content-Type`: `video/mp4`
  - `Content-Length`: Size of the requested chunk.
  - `Content-Range`: `bytes <start>-<end>/<total>`
  - `Accept-Ranges`: `bytes`
- **Status Codes**:
  - `206 Partial Content` for range requests.
  - `200 OK` if no range is specified (optional, depending on file size).
  - `416 Range Not Satisfiable` for invalid ranges.

### Example Flow
1. Receive `GET /api/v1/videos/:id/stream` with `Range: bytes=0-1023`.
2. Check file existence and size.
3. Open read stream for the specific byte range.
4. Pipe stream to response with appropriate headers.

## 3. FRONTEND INTEGRATION

### HTML5 Video Element
- Direct usage of the `<video>` tag with the stream URL.
- Verify that the browser's native controls can seek and scrub successfully.

## 4. VERIFICATION GOAL

- [ ] `curl` request with `Range` header returns `206 Partial Content`.
- [ ] Response headers include correct `Content-Length` and `Content-Range`.
- [ ] Video playback in browser allows seeking without restarting from the beginning.
- [ ] **SUCCESS**: Video scrubbing is smooth and verified by network logs (multiple 206 requests).
