// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://cisco-cli.teovidal.eu',

  integrations: [
    mdx(),
    sitemap(),
  ],

  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',
        properties: { className: ['anchor-link'] },
      }],
    ],
    shikiConfig: {
      // Thème sombre pour les blocs de code (terminal)
      theme: 'github-dark-dimmed',
      wrap: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        /* Pagefind est généré après le build dans dist/pagefind/
           Ce n'est pas un module résolvable à la compilation. */
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
});