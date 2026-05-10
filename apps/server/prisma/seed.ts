import Prisma from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

const { PrismaClient } = Prisma;

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log('🌱 Seeding database...');

    // 1. Categories
    const action = await prisma.category.upsert({
      where: { name: 'Action' },
      update: {},
      create: { name: 'Action' },
    });

    const scifi = await prisma.category.upsert({
      where: { name: 'Sci-Fi' },
      update: {},
      create: { name: 'Sci-Fi' },
    });

    const documentary = await prisma.category.upsert({
      where: { name: 'Documentary' },
      update: {},
      create: { name: 'Documentary' },
    });

    // 2. Test User
    const admin = await prisma.user.upsert({
      where: { email: 'admin@stream.dev' },
      update: {},
      create: {
        email: 'admin@stream.dev',
        password: 'password123', // In real app, hash this!
        name: 'Admin User',
      },
    });

    // 3. Test Video
    await prisma.video.upsert({
      where: { id: 'test-video-id' },
      update: {},
      create: {
        id: 'test-video-id',
        title: 'Big Buck Bunny',
        description: 'A large, lovable rabbit is poked and prodded by three mischievous rodents.',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_Buck_Bunny_Main_Characters.jpg',
        videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 596,
        categoryId: scifi.id,
      },
    });

    console.log('✅ Seeding completed successfully');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
