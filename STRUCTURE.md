# STRUCTURE.md — Arborescence du projet

> **Référence canonique** de l'organisation des fichiers. Toute déviation doit être justifiée.

---

## Arborescence cible

```
cisco-cli-ref/
├── .gitignore
├── README.md
├── LICENSE
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
│
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og-default.png              # 1200×630, image OG par défaut
│   ├── robots.txt
│   └── fonts/
│       ├── ibm-plex-sans-400.woff2
│       ├── ibm-plex-sans-500.woff2
│       ├── ibm-plex-sans-600.woff2
│       ├── ibm-plex-sans-700.woff2
│       ├── ibm-plex-mono-400.woff2
│       ├── ibm-plex-mono-500.woff2
│       └── ibm-plex-mono-600.woff2
│
├── src/
│   ├── env.d.ts
│   │
│   ├── content/
│   │   ├── config.ts               # Schéma Zod de la collection
│   │   └── commands/
│   │       ├── _category.json      # Métadonnées de la racine (optionnel)
│   │       ├── bases/
│   │       │   ├── _category.json  # { name, icon, order, description }
│   │       │   ├── modes-cli.mdx
│   │       │   ├── configurer-hostname.mdx
│   │       │   ├── banner-motd.mdx
│   │       │   ├── sauvegarder-config.mdx
│   │       │   └── ...
│   │       ├── securite/
│   │       │   ├── _category.json
│   │       │   ├── enable-secret.mdx
│   │       │   ├── mot-de-passe-console.mdx
│   │       │   ├── mot-de-passe-vty.mdx
│   │       │   ├── service-password-encryption.mdx
│   │       │   └── configurer-ssh.mdx
│   │       ├── switching/
│   │       │   ├── _category.json
│   │       │   ├── creer-vlan.mdx
│   │       │   ├── attribuer-port-vlan.mdx
│   │       │   ├── configurer-trunk.mdx
│   │       │   ├── port-security.mdx
│   │       │   ├── stp-bases.mdx
│   │       │   ├── etherchannel.mdx
│   │       │   └── voice-vlan.mdx
│   │       ├── routing/
│   │       │   ├── _category.json
│   │       │   ├── configurer-interface.mdx
│   │       │   ├── route-statique.mdx
│   │       │   ├── route-par-defaut.mdx
│   │       │   ├── rip-v2.mdx
│   │       │   ├── ospf-single-area.mdx
│   │       │   └── router-on-a-stick.mdx
│   │       ├── services/
│   │       │   ├── _category.json
│   │       │   ├── dhcp-server.mdx
│   │       │   ├── nat-static.mdx
│   │       │   ├── nat-dynamic.mdx
│   │       │   └── nat-pat.mdx
│   │       ├── acl/
│   │       │   ├── _category.json
│   │       │   ├── acl-standard.mdx
│   │       │   ├── acl-etendue.mdx
│   │       │   ├── acl-named.mdx
│   │       │   └── appliquer-acl.mdx
│   │       └── diagnostic/
│   │           ├── _category.json
│   │           ├── show-running-config.mdx
│   │           ├── show-ip-interface-brief.mdx
│   │           ├── show-vlan.mdx
│   │           ├── show-ip-route.mdx
│   │           ├── ping.mdx
│   │           ├── traceroute.mdx
│   │           └── debug-bases.mdx
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.astro
│   │   │   ├── Kbd.astro
│   │   │   ├── CodeBlock.astro
│   │   │   ├── CliPrompt.astro          # ⭐ composant signature
│   │   │   ├── Callout.astro
│   │   │   ├── Topology.astro
│   │   │   └── ThemeToggle.astro
│   │   ├── Header.astro
│   │   ├── Sidebar.astro
│   │   ├── TableOfContents.astro
│   │   ├── Footer.astro
│   │   ├── SearchPalette.astro          # palette Ctrl+K
│   │   ├── CategoryCard.astro           # carte catégorie en home
│   │   └── RelatedCommands.astro        # bas de fiche
│   │
│   ├── layouts/
│   │   ├── Layout.astro                 # layout racine (head, fonts, theme)
│   │   ├── DocsLayout.astro             # 3 colonnes pour les pages doc
│   │   └── HomeLayout.astro             # layout simple pour la home
│   │
│   ├── pages/
│   │   ├── index.astro                  # accueil
│   │   ├── 404.astro
│   │   ├── about.astro                  # à propos / mentions
│   │   ├── commands/
│   │   │   ├── index.astro              # liste de toutes les commandes
│   │   │   └── [...slug].astro          # page dynamique de chaque fiche
│   │   └── categories/
│   │       └── [category].astro         # page de catégorie (liste + cheatsheet)
│   │
│   ├── lib/
│   │   ├── commands.ts                  # helpers : getCommandsByCategory, getRelated
│   │   ├── search.ts                    # init Pagefind côté client
│   │   └── theme.ts                     # gestion du theme (init, toggle)
│   │
│   └── styles/
│       ├── tokens.css                   # CSS variables (light + dark)
│       ├── fonts.css                    # @font-face
│       ├── prose.css                    # styles du contenu MDX
│       └── global.css                   # reset, base
│
└── scripts/
    └── postbuild.mjs                    # génère l'index Pagefind après build
```

---

## Conventions de nommage

### Fichiers

| Type | Convention | Exemple |
|---|---|---|
| Composant Astro | PascalCase | `CliPrompt.astro` |
| Page | kebab-case | `route-statique.mdx` |
| Helper TS | camelCase | `getCommandsByCategory` |
| Variable CSS | kebab-case avec préfixe | `--color-cisco-blue` |
| Catégorie (dossier) | kebab-case singulier | `routing/`, `acl/` |

### Slugs des commandes

Format : **action + objet, en français, kebab-case**.

✅ Bon :
- `creer-vlan`
- `configurer-trunk`
- `route-statique`
- `nat-pat`

❌ Mauvais :
- `vlan-create` (ordre anglais)
- `creerVlan` (camelCase)
- `Créer-VLAN` (majuscules + accents)

---

## Schéma de la collection (résumé)

Détail complet dans `CONTENT.md`. Aperçu :

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const commands = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    category: z.enum(['bases', 'securite', 'switching', 'routing', 'services', 'acl', 'diagnostic']),
    mode: z.enum(['user', 'privileged', 'config', 'config-if', 'config-line', 'config-router', 'config-vlan']),
    syntax: z.string(),                       // syntaxe générique
    devices: z.array(z.enum(['switch', 'router'])),
    related: z.array(z.string()).optional(),  // slugs des fiches liées
    difficulty: z.enum(['debutant', 'intermediaire', 'avance']).default('debutant'),
    examTags: z.array(z.string()).optional(), // ex: ['bac-pro-ciel', 'bts-sio']
    updated: z.date(),
  }),
});

export const collections = { commands };
```

---

## Métadonnées de catégorie (`_category.json`)

Chaque dossier de catégorie contient un fichier `_category.json` :

```json
{
  "name": "Switching",
  "description": "Tout ce qui concerne les commutateurs : VLAN, trunk, port-security, STP",
  "icon": "network",
  "order": 3,
  "color": "switching"
}
```

Ces métadonnées sont chargées dans la sidebar et la page d'accueil pour générer les cartes de catégorie.

---

## Routes générées (vue logique)

```
/                              → src/pages/index.astro
/about                         → src/pages/about.astro
/commands                      → liste de toutes les commandes
/commands/bases/configurer-hostname  → fiche
/commands/switching/creer-vlan       → fiche
/categories/switching          → liste + cheatsheet imprimable de la catégorie
/404                           → page erreur
```

Le slug d'une fiche = `<category>/<slug-du-fichier>` (ex : `switching/creer-vlan`).

---

## Décisions d'architecture (et pourquoi)

| Décision | Pourquoi |
|---|---|
| **Astro vs Next.js** | Site 100 % statique, pas besoin de SSR. Astro = HTML pur, JS minimal. |
| **MDX vs MD pur** | On a besoin d'embarquer des composants custom (`<CliPrompt>`, `<Topology>`) dans le contenu. |
| **Pagefind vs Algolia** | Pagefind est gratuit, statique, fonctionne offline. Algolia = compte + clé API + quota. |
| **Tailwind vs CSS pur** | Vélocité de prototypage, design tokens centralisés, purge automatique. |
| **`data-theme` vs classe `dark`** | Plus de contrôle, permet de gérer plusieurs thèmes futurs (`high-contrast`, etc.) facilement. |
| **Pas de framework UI (shadcn, etc.)** | Surdimensionné pour 6 composants. On garde le contrôle total du design. |
| **Lucide icons** | Cohérent avec l'écosystème dev moderne, tree-shakable. |

---

## Ce qui n'est **pas** dans la structure (volontairement)

- ❌ Dossier `tests/` — pas de tests automatisés sur ce projet (à ajouter en v2 si le contenu se complexifie)
- ❌ `.storybook/` — surdimensionné, la page `/dev/showcase` suffit
- ❌ `i18n/` — site mono-langue (FR)
- ❌ Backend / API routes — site purement statique
