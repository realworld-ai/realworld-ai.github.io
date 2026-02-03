import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://mc.net.ist.osaka-u.ac.jp', // Update this with your actual domain later
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