import { z } from 'zod';

export const VideoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  thumbnail: z.string().url().or(z.string().startsWith('/')),
  videoUrl: z.string().url().or(z.string().startsWith('/')),
  duration: z.number().int().positive(),
  categoryId: z.string().uuid().optional(),
});

export type Video = z.infer<typeof VideoSchema>;
