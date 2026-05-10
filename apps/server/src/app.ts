import 'dotenv/config';
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import databasePlugin from './plugins/database.js';
import videoRoutes from './routes/video.js';

export async function buildApp(): Promise<FastifyInstance> {
  const isDev = process.env.NODE_ENV === 'development';

  const fastify = Fastify({
    logger: {
      transport: isDev
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    },
  });

  // Register Plugins
  await fastify.register(helmet, {
    contentSecurityPolicy: isDev ? false : undefined, // Relaxed for dev
  });

  await fastify.register(cors, {
    origin: isDev ? 'http://localhost:5173' : process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  // Register Database
  await fastify.register(databasePlugin);

  // Register Routes
  await fastify.register(videoRoutes, { prefix: '/api/v1/videos' });

  // Health Check
  fastify.get('/health', async () => {
    return { status: 'OK', environment: process.env.NODE_ENV };
  });

  // Root Ping
  fastify.get('/api/v1/ping', async () => {
    return { message: 'pong', timestamp: new Date().toISOString() };
  });

  return fastify;
}
