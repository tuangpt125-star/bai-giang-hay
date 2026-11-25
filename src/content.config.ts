import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/bai-hoc/*.mdx', base: './content' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { lessons };
