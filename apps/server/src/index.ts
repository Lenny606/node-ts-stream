import { buildApp } from './app.js';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function start() {
  const app = await buildApp();
  
  try {
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Server ready at http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
