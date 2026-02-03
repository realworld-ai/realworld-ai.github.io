import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://realworld-ai.github.io', // Update this with your actual domain later
  base: '/', 
  integrations: [
    react(), 
    tailwind(),
    mdx()
  ],
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});