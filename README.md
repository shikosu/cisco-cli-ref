# Cisco CLI Reference

Référence des commandes CLI Cisco IOS destinée aux étudiants **Bac Pro CIEL**, **BTS SIO/SISR** et **BUT RT**. Qualité Stripe Docs / Cisco DevNet — site 100 % statique, zéro backend.

**Site en production :** https://cisco-cli.teovidal.eu

---

## Fonctionnalités

- **38 fiches** sur les commandes IOS (16 complètes, 22 stubs) dans 7 catégories
- Recherche full-text instantanée (`Ctrl+K`) avec Pagefind
- Composant `CliPrompt` coloré par mode IOS (user, privileged, config, config-if…)
- Mode sombre/clair avec respect de `prefers-color-scheme`
- Mode impression optimisé pour cheatsheets de TP
- Accessibilité : skip-link, navigation clavier, ARIA

---

## Stack

| Outil | Rôle |
|---|---|
| [Astro 6](https://astro.build) | Framework SSG, output statique |
| [Tailwind CSS v4](https://tailwindcss.com) | Utilitaires CSS |
| [@astrojs/mdx](https://docs.astro.build/en/guides/markdown-content/) | Fiches commandes en MDX |
| [Pagefind](https://pagefind.app) | Recherche full-text statique |
| [IBM Plex Sans/Mono](https://www.ibm.com/plex/) | Polices auto-hébergées |

---

## Développement

### Prérequis

- Node.js >= 20
- npm >= 10

### Installation

```bash
git clone https://github.com/shikosu/cisco-cli-ref.git
cd cisco-cli-ref
npm install
```

### Lancer en développement

```bash
npm run dev
# -> http://localhost:4321
```

### Build de production

```bash
npm run build
# Génère dist/ (site statique complet + index Pagefind)

npm run preview
# Prévisualiser le build localement
```

---

## Ajouter une fiche de commande

1. Créer `src/content/commands/<catégorie>/<nom-slug>.mdx`
2. Remplir le frontmatter (tous les champs obligatoires) :

```yaml
---
title: "nom de la commande"
description: "Description courte (1 phrase, verbe à l'infinitif)."
category: "bases"          # bases | securite | switching | routing | services | acl | diagnostic
mode: "config"             # user | privileged | config | config-if | config-line | config-router | config-vlan
syntax: "commande <arg>"   # syntaxe canonique avec placeholders
devices: ["router"]        # ["switch"] | ["router"] | ["switch", "router"]
difficulty: "debutant"     # debutant | intermediaire | avance
related:                   # slugs relatifs sans extension
  - "bases/configurer-hostname"
examTags: ["bts-sio"]      # bac-pro-ciel | bts-sio | bts-cyber | but-rt
updated: 2026-01-15
---
```

3. Écrire le contenu MDX avec les composants disponibles :

```mdx
import { Callout, CliPrompt, CodeBlock, Topology, Kbd, Badge } from '@/components/ui';

## Usage

<CliPrompt mode="config" />

<CodeBlock lang="cisco" title="Exemple">
Router(config)# commande exemple
</CodeBlock>

<Callout type="warning" title="Attention">
  Message important.
</Callout>
```

4. Le fichier est automatiquement indexé au prochain `npm run build`.

---

## Structure du projet

```
src/
  content/commands/        <- Fiches MDX (7 catégories, 38 fiches)
    bases/
    securite/
    switching/
    routing/
    services/
    acl/
    diagnostic/
  components/
    ui/                    <- Composants atomiques (Badge, CliPrompt, CodeBlock...)
    Header.astro
    Sidebar.astro
    TableOfContents.astro
    SearchPalette.astro
  layouts/
    Layout.astro           <- Head SEO + script anti-flash
    DocsLayout.astro       <- 3 colonnes responsive
  pages/
    index.astro            <- Page d'accueil
    commands/[...slug].astro
    categories/[category].astro
  styles/
    tokens.css             <- CSS variables light + dark
public/
  fonts/                   <- IBM Plex (woff2, auto-hébergé)
scripts/
  postbuild.mjs            <- Index Pagefind post-build
```

---

## Déploiement

### Cloudflare Pages (recommandé)

1. Connecter le dépôt GitHub sur [Cloudflare Pages](https://pages.cloudflare.com)
2. Build command : `npm run build`
3. Output directory : `dist`
4. Variable d'environnement : aucune requise

### Nginx / Raspberry Pi

```bash
npm run build
rsync -avz dist/ user@serveur:/var/www/cisco-cli/
```

Configuration Nginx minimale :

```nginx
server {
  listen 80;
  server_name cisco-cli.teovidal.eu;
  root /var/www/cisco-cli;
  index index.html;

  location / {
    try_files $uri $uri/ $uri.html =404;
  }
}
```

---

## Licence

MIT — voir [LICENSE](LICENSE).
