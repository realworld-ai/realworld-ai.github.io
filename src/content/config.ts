import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.enum(['award', 'activity', 'talk', 'media', 'workshop']).default('activity'),
    members: z.array(z.string()).optional(),
    summary: z.string().optional(),
    links: z.array(z.object({
        label: z.string(),
        url: z.string()
    })).optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(), // Keep for backward compatibility if needed
    lang: z.enum(['ja', 'en']).optional(), // Optional, content can be bilingual or specific
  }),
});

const researchCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
    icon: z.string().optional(), // Lucide icon name or image path
    image: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      status: z.enum(['ongoing', 'completed']).default('ongoing'),
      tags: z.array(z.string()).optional(),
      image: z.string().optional(),
      funding: z.string().optional(),
      period: z.string().optional(),
    }),
});

export const collections = {
  'news': newsCollection,
  'research': researchCollection,
  'projects': projectsCollection,
};
