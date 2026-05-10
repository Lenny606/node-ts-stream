import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import Prisma from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = Prisma;

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const databasePlugin: FastifyPluginAsync = async (fastify) => {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  });

  try {
    await prisma.$connect();
    fastify.log.info('Database Connection: OK');
  } catch (err) {
    fastify.log.error('Database Connection: FAILED', err);
    process.exit(1);
  }

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (fastify) => {
    await fastify.prisma.$disconnect();
  });
};

export default fp(databasePlugin);
