/**
 * Configuration de la Content Layer (Astro 6)
 * Chaque fiche commande est un fichier .mdx dans src/content/commands/
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const commands = defineCollection({
  /* Loader glob : scanne tous les .mdx dans le dossier commands et sous-dossiers */
  loader: glob({ pattern: '**/*.mdx', base: './src/content/commands' }),

  schema: z.object({
    title:       z.string(),
    description: z.string(),
    category: z.enum([
      'bases', 'securite', 'switching', 'routing', 'services', 'acl', 'diagnostic',
    ]),
    mode: z.enum([
      'user', 'privileged', 'config', 'config-if', 'config-line', 'config-router', 'config-vlan',
    ]),
    syntax:     z.string(),
    devices:    z.array(z.enum(['switch', 'router'])),
    difficulty: z.enum(['debutant', 'intermediaire', 'avance']),
    related:    z.array(z.string()).optional().default([]),
    examTags:   z.array(z.string()).optional().default([]),
    updated:    z.coerce.date(),
  }),
});

export const collections = { commands };
