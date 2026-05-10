import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/:id/stream', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    // In a real app, we would fetch the video path from the DB
    // For now, we use our test video
    const videoPath = path.resolve(__dirname, '../../assets/test-videos/sample.mp4');
    
    if (!fs.existsSync(videoPath)) {
      return reply.code(404).send({ error: 'Video not found' });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = request.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        reply.header('Content-Range', `bytes */${fileSize}`);
        return reply.code(416).send({ error: 'Requested range not satisfiable' });
      }

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      
      reply.code(206).headers({
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      });

      return reply.send(file);
    } else {
      reply.headers({
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });
      return reply.send(fs.createReadStream(videoPath));
    }
  });
};

export default videoRoutes;
