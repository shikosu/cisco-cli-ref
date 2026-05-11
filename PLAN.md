# PLAN.md — Plan de construction phasé

> **Lire avant de coder.** Ce plan définit l'ordre d'exécution. Chaque phase produit un livrable testable. Ne passe à la phase N+1 que quand la phase N est validée.

---

## Phase 0 — Setup (≈ 30 min)

**Objectif :** un projet Astro vide qui démarre, avec Tailwind, MDX et les polices.

### Tâches

```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
npx astro add tailwind mdx sitemap
npm i -D pagefind @astrojs/sitemap rehype-slug rehype-autolink-headings remark-gfm
npm i lucide-astro
```

- [ ] Initialiser Astro en mode statique (`output: 'static'` dans `astro.config.mjs`)
- [ ] Configurer Tailwind avec les tokens de `DESIGN.md` (voir section "Tokens" → copier dans `tailwind.config.mjs`)
- [ ] Télécharger IBM Plex Sans (400, 500, 600, 700) et IBM Plex Mono (400, 500, 600) en woff2 dans `public/fonts/`
- [ ] Déclarer les `@font-face` dans `src/styles/fonts.css`
- [ ] Configurer le site dans `astro.config.mjs` : `site: 'https://cisco-cli.teovidal.eu'` (adapte le sous-domaine)

### Critère de validation
`npm run dev` ouvre une page blanche sans erreur, les polices sont chargées (vérifier dans DevTools > Network).

---

## Phase 1 — Design system (≈ 1 h)

**Objectif :** tous les tokens et composants atomiques sont en place. Une page de "showcase" interne montre tous les éléments.

### Tâches

- [ ] Implémenter les CSS variables de `DESIGN.md` dans `src/styles/tokens.css`
- [ ] Créer le mode dark via `[data-theme="dark"]` (et **pas** via classe `dark` Tailwind, on contrôle nous-mêmes)
- [ ] Script inline anti-flash dans `Layout.astro` (lit localStorage AVANT le rendu)
- [ ] Composants atomiques dans `src/components/ui/` :
  - `Badge.astro` (variants : `user`, `privileged`, `config`, `config-if`, `config-line`, `config-router`, `info`, `warning`)
  - `Kbd.astro` (touche clavier stylée)
  - `CodeBlock.astro` (bloc de code avec bouton copier + numérotation des lignes optionnelle)
  - `CliPrompt.astro` (le composant signature : prompt CLI avec couleur du mode)
  - `Callout.astro` (variants : `note`, `tip`, `warning`, `danger`)
  - `Topology.astro` (rendu d'une topologie ASCII avec monospace stylé)
- [ ] Page interne `/dev/showcase` qui affiche tous les composants (à supprimer en prod)

### Critère de validation
La page `/dev/showcase` affiche tous les composants en light ET dark mode, sans casse visuelle.

---

## Phase 2 — Layout & navigation (≈ 1 h 30)

**Objectif :** le squelette du site (header, sidebar, footer, TOC) est construit et responsive.

### Tâches

- [ ] `Layout.astro` (layout racine avec `<head>` SEO complet, fonts, theme script)
- [ ] `DocsLayout.astro` (layout 3 colonnes pour les pages de doc)
- [ ] `components/Header.astro` :
  - Logo (à gauche) — un SVG simple "Cisco CLI Ref" stylé
  - Recherche (au centre, ouvre la palette `Ctrl+K`)
  - Boutons (à droite) : toggle theme, lien GitHub
- [ ] `components/Sidebar.astro` :
  - Génération **automatique** depuis l'arborescence `src/content/commands/` (utilise `getCollection`)
  - Catégories repliables, sous-catégories, items
  - Highlight de l'item actif
  - Mobile : devient un drawer (slide-in depuis la gauche)
- [ ] `components/TableOfContents.astro` :
  - Génère le TOC depuis les headings `h2`/`h3` de la page courante
  - Highlight de la section visible (Intersection Observer)
- [ ] `components/Footer.astro` :
  - Lien dépôt, mention légale, version du site, lien "Suggérer une correction"
- [ ] Page d'accueil `src/pages/index.astro` :
  - Hero court (titre, sous-titre, CTA "Parcourir les commandes" + recherche inline)
  - Grille des 7 catégories avec icône + nb de commandes
  - Section "Démarrer rapidement" avec 3-4 commandes les plus utilisées
- [ ] Page 404 personnalisée `src/pages/404.astro`

### Critère de validation
- Naviguer entre 3 pages factices via la sidebar fonctionne
- Mobile (DevTools 360px) : header + drawer fonctionnels
- Tab navigation OK, focus visible partout

---

## Phase 3 — Système de contenu (≈ 1 h)

**Objectif :** le format des fiches commandes est en place et rendu correctement. Une fiche modèle est rédigée.

### Tâches

- [ ] Définir la collection `commands` dans `src/content/config.ts` avec un schéma Zod (voir `CONTENT.md`)
- [ ] Créer le template de page dynamique `src/pages/commands/[...slug].astro` qui :
  - Récupère la fiche
  - Affiche le frontmatter (titre, description, mode, catégorie, syntaxe)
  - Rend le MDX avec les composants custom (`CliPrompt`, `Topology`, `Callout`, etc.)
  - Affiche le TOC
  - Affiche les "commandes liées" en bas
- [ ] Rédiger **3 fiches modèles complètes** au format final (voir `CONTENT.md` § "Exemples") :
  1. `bases/configurer-hostname.mdx`
  2. `switching/creer-vlan.mdx`
  3. `routing/configurer-ssh.mdx`
- [ ] Configurer le rendu Markdown (Shiki theme adapté à notre design system, plugins rehype/remark)

### Critère de validation
Les 3 fiches modèles s'affichent parfaitement, les composants MDX custom fonctionnent, le TOC se met à jour.

---

## Phase 4 — Recherche & interactions (≈ 1 h)

**Objectif :** les features qui rendent le site utile en TP.

### Tâches

- [ ] Intégrer Pagefind :
  - Hook post-build dans `astro.config.mjs` ou script npm pour générer l'index
  - Composant `SearchPalette.astro` (modal avec input + résultats)
  - Raccourci clavier global : `Ctrl+K` / `Cmd+K` ouvre la palette
  - Raccourci `/` focus la barre de recherche du header
  - Échap ferme la palette
- [ ] Bouton "Copier" sur chaque `CodeBlock` :
  - Animation de feedback (icône check pendant 1.5s)
  - `navigator.clipboard.writeText()`
- [ ] Toggle theme :
  - Persist dans `localStorage` (clé `theme`)
  - Animation de transition douce (`transition: colors 200ms`)
  - Respecte `prefers-color-scheme` au premier chargement
- [ ] Navigation au clavier dans la palette de recherche (↑/↓ pour naviguer, Enter pour aller à la page)
- [ ] Mode "Print friendly" :
  - CSS `@media print` cache header/sidebar/footer/TOC
  - Affiche tout le contenu de la catégorie courante en flux linéaire
  - Bouton "Imprimer cette catégorie" dans la sidebar

### Critère de validation
- `Ctrl+K` ouvre la palette, taper "vlan" trouve la fiche, Enter y va
- Toggle theme fonctionne sans flash, persiste après reload
- `Ctrl+P` sur une page de catégorie produit un PDF lisible

---

## Phase 5 — Rédaction du contenu (≈ 3-5 h)

**Objectif :** au moins 15 fiches complètes, les autres en stub.

### Tâches

- [ ] Créer **toutes** les fiches en stub (frontmatter rempli, contenu = `TODO`) — voir liste dans `CONTENT.md` § "Inventaire"
- [ ] Compléter les **15 fiches prioritaires** (voir `CONTENT.md` § "Priorités")
- [ ] Vérifier qu'aucune fiche n'a de syntaxe Markdown cassée (`npm run build` sans warning)

### Critère de validation
- 15 fiches complètes minimum
- Toutes les autres au moins en stub (page accessible, contenu "À venir")
- Aucun lien mort

---

## Phase 6 — Polish & déploiement (≈ 1 h)

**Objectif :** le site est prêt pour la prod.

### Tâches

- [ ] Audit Lighthouse → corriger jusqu'à 95+ partout
- [ ] Vérifier les Open Graph (utiliser `https://www.opengraph.xyz/`)
- [ ] Générer un favicon multi-formats (`favicon.ico`, `apple-touch-icon.png`, `icon.svg`)
- [ ] Image OG par défaut (1200×630, design cohérent avec le site)
- [ ] `README.md` complet : install, dev, build, ajout d'une commande, déploiement
- [ ] `LICENSE` (MIT recommandé)
- [ ] Build de prod : `npm run build` → vérifier que le `dist/` fait < 5 Mo
- [ ] Déploiement :
  - **Option A (recommandée)** : Cloudflare Pages, connecter le repo GitHub, build command `npm run build`, output `dist`
  - **Option B** : copier `dist/` vers Nginx (ton infra Raspberry Pi)
- [ ] Tester en prod sur 3 navigateurs (Firefox, Chromium, Safari/iOS)

### Critère de validation
Le site est en ligne, accessible, performant, partageable sur réseaux sociaux avec preview correcte.

---

## Récap temps estimé

| Phase | Durée | Cumulé |
|---|---|---|
| 0 — Setup | 0:30 | 0:30 |
| 1 — Design system | 1:00 | 1:30 |
| 2 — Layout | 1:30 | 3:00 |
| 3 — Contenu | 1:00 | 4:00 |
| 4 — Recherche & interactions | 1:00 | 5:00 |
| 5 — Rédaction | 3:00 — 5:00 | 8:00 — 10:00 |
| 6 — Polish & deploy | 1:00 | 9:00 — 11:00 |

**Total réaliste : 9 à 11 heures de travail focalisé.** Découpe sur 2-3 sessions.

---

## Ordre de priorité si manque de temps

Si tu dois couper, voici l'ordre dans lequel sacrifier (du moins coûteux au plus coûteux) :

1. **Sacrifier le mode print** (Phase 4) — peut être ajouté en v1.1
2. **Sacrifier les 15 fiches** → faire 8 fiches mais excellentes (Phase 5)
3. **Sacrifier la palette Ctrl+K** → garder juste une recherche dans le header (Phase 4)
4. **Ne JAMAIS sacrifier** le design system, le layout responsive, le dark mode

Le squelette doit être impeccable même si le contenu est partiel — le contenu, tu le rempliras au fil de l'année.
