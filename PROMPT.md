# PROMPT.md — Prompt master pour Cisco CLI Reference

> **Comment l'utiliser :** copie ce fichier (et les 4 autres : `PLAN.md`, `STRUCTURE.md`, `DESIGN.md`, `CONTENT.md`) à la racine d'un dossier vide. Ouvre Claude Code dans ce dossier. Colle le contenu de **PROMPT.md** dans le chat. Claude Code lira les autres fichiers tout seul.

---

## Rôle

Tu es un développeur frontend senior spécialisé dans la documentation technique. Tu vas construire un site de référence sur les commandes CLI Cisco (Packet Tracer / IOS), à destination des étudiants Bac Pro CIEL, BTS SIO/SISR et BUT R&T / GEII.

Le site doit ressembler à une vraie doc d'éditeur (qualité Stripe Docs, Cisco DevNet, Linear) — pas à un projet scolaire.

## Stack imposée

- **Framework** : [Astro 4+](https://astro.build/) (mode statique, output `static`)
- **Styling** : [Tailwind CSS 3+](https://tailwindcss.com/) configuré avec les tokens définis dans `DESIGN.md`
- **Contenu** : MDX (`@astrojs/mdx`) pour les fiches commandes
- **Recherche** : [Pagefind](https://pagefind.app/) (index full-text généré au build, 100 % statique)
- **Police** : IBM Plex Sans (texte) + IBM Plex Mono (code) via fonts auto-hébergés (pas de Google Fonts CDN)
- **Icônes** : `lucide-astro`
- **Markdown plugins** : `rehype-slug`, `rehype-autolink-headings`, `remark-gfm`
- **Aucune dépendance React/Vue lourde** : si une island interactive est nécessaire, utilise du JS vanilla ou Astro components.

## Objectif fonctionnel

Le site doit permettre à un étudiant en TP de :

1. **Trouver une commande en moins de 5 secondes** (recherche `Ctrl+K` instantanée)
2. **Comprendre dans quel mode CLI** elle s'utilise (badge coloré visible)
3. **Copier la commande** d'un clic (bouton sur chaque bloc)
4. **Voir un exemple concret** avec topologie ASCII
5. **Imprimer une cheatsheet** de la catégorie courante (CSS `@media print`)

## Contenu à couvrir (scope Bac Pro CIEL / BTS)

Voir `CONTENT.md` pour le détail. Catégories :

1. **Bases CLI** — modes, navigation, hostname, banner, sauvegarde
2. **Sécurité d'accès** — mots de passe, enable secret, console, vty, SSH
3. **Switching** — VLAN, trunk, port-security, STP, EtherChannel basique
4. **Routing** — interfaces, static routes, RIP, OSPF (single-area), router-on-a-stick
5. **Services réseau** — DHCP server, NAT (static/dynamic/PAT)
6. **ACL** — standard, étendue, named, application sur interface
7. **Diagnostic** — `show`, `ping`, `traceroute`, `debug` (les essentiels)

Chaque commande = une fiche `.mdx` au format défini dans `CONTENT.md`.

## Design (résumé — détail dans DESIGN.md)

- **Esthétique** : doc pro façon Cisco DevNet réinterprétée, **clean, dense, technique**
- **Mode** : light par défaut + dark mode (toggle dans le header)
- **Layout** : 3 colonnes desktop (sidebar 280px / contenu max 760px / TOC 240px), sidebar collapsible mobile
- **Couleur signature** : Cisco Blue `#00BCEB` en accent uniquement (liens, focus, badges)
- **Détail signature** : les blocs de code reproduisent le **vrai prompt CLI** avec couleur du mode (user `>` gris, privileged `#` bleu, config `(config)#` violet, etc.)

## Critères de qualité non-négociables

- [ ] Lighthouse 95+ sur Performance / Accessibility / Best Practices / SEO
- [ ] Aucun layout shift (CLS = 0)
- [ ] Navigation clavier complète (Tab, Enter, `/` pour focus search, `Cmd+K`/`Ctrl+K` pour palette)
- [ ] Responsive impeccable de 360px à 1920px (3 breakpoints : mobile, tablet ≥768px, desktop ≥1024px)
- [ ] Dark mode sans flash (script inline avant le rendu)
- [ ] Aucun warning console au build ou au runtime
- [ ] Sitemap.xml + robots.txt générés automatiquement
- [ ] Open Graph + Twitter Cards sur chaque page

## Méthode de travail

Avant d'écrire du code, lis dans cet ordre :

1. `PLAN.md` — phases de construction et ordre d'exécution
2. `STRUCTURE.md` — arborescence des fichiers et organisation
3. `DESIGN.md` — système de design complet (couleurs, typo, composants, animations)
4. `CONTENT.md` — format des fiches commandes et 3 exemples complets à utiliser comme template

Ensuite, exécute les phases de `PLAN.md` **dans l'ordre**. À chaque fin de phase, fais un récap rapide de ce qui a été fait avant de passer à la suite. **Ne saute aucune phase.**

## Livrable final attendu

Un dépôt Astro :
- `npm install && npm run dev` → site fonctionnel sur `localhost:4321`
- `npm run build` → dossier `dist/` prêt à déployer sur Cloudflare Pages / Nginx
- `README.md` clair : install, dev, build, ajout d'une commande, déploiement
- Au moins **15 fiches commandes** rédigées au format final (les autres en stub avec frontmatter rempli, contenu à compléter)

## Hors-scope (pour cette première version)

- Pas d'authentification, pas de comptes
- Pas de backend, pas de base de données
- Pas de simulateur CLI interactif (peut venir en v2)
- Pas de multi-langue (FR uniquement)
- Pas de versionning IOS (on documente la syntaxe Packet Tracer / IOS 15.x classique)

## Une dernière chose

Ce site doit avoir du caractère. Un étudiant qui le découvre doit penser « ah ouais ça c'est propre » dans les 3 premières secondes. Pas du « bootstrap classique ». Lis bien `DESIGN.md` — chaque détail compte.

Quand tu as fini une phase, **dis-le clairement** avant de passer à la suivante. Si tu hésites entre deux choix de design ou d'architecture, **demande**.

C'est parti.
