import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { buildApp } from '../app.js';
import { FastifyInstance } from 'fastify';

describe('Video Streaming API', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 OK for full video stream (no range)', async () => {
    const response = await request(app.server).get('/api/v1/videos/test-id/stream');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('video/mp4');
    expect(response.header).toHaveProperty('content-length');
  });

  it('should return 206 Partial Content for range request', async () => {
    const response = await request(app.server)
      .get('/api/v1/videos/test-id/stream')
      .set('Range', 'bytes=0-1023');
    
    expect(response.status).toBe(206);
    expect(response.header['content-type']).toBe('video/mp4');
    expect(response.header['content-range']).toMatch(/^bytes 0-1023\/\d+/);
    expect(response.header['content-length']).toBe('1024');
    expect(response.header['accept-ranges']).toBe('bytes');
  });

  it('should return 416 for out-of-bounds range request', async () => {
    const response = await request(app.server)
      .get('/api/v1/videos/test-id/stream')
      .set('Range', 'bytes=999999999-');
    
    expect(response.status).toBe(416);
    expect(response.header['content-range']).toMatch(/^bytes \*\/\d+/);
  });
});
