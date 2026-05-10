import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { buildApp } from '../app.js';
import { FastifyInstance } from 'fastify';

describe('Health & Ping API', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return OK on /health', async () => {
    const response = await request(app.server).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
  });

  it('should return pong on /api/v1/ping', async () => {
    const response = await request(app.server).get('/api/v1/ping');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'pong');
  });
});
