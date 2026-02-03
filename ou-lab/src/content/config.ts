import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content', // v2.5+; 'content' for markdown/mdx
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    lang: z.enum(['ja', 'en']).default('ja'),
    image: z.string().optional(),
  }),
});

const researchCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
    icon: z.string().optional(), // Lucide icon name or image path
  }),
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      status: z.enum(['ongoing', 'completed']).default('ongoing'),
      tags: z.array(z.string()).optional(),
      image: z.string().optional(),
    }),
});

export const collections = {
  'news': newsCollection,
  'research': researchCollection,
  'projects': projectsCollection,
};
