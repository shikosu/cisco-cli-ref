# DESIGN.md — Système de design

> **Référence canonique** du design. Tout choix visuel doit être ancré ici. Si une situation n'est pas couverte, **étendre ce document avant de coder**.

---

## 1. Philosophie

**Doc technique pro réinterprétée.** Lisible comme une vraie doc Cisco, mais avec des détails de craft qui sortent du lot :

- Densité maîtrisée — beaucoup d'info au m², sans claustrophobie
- Hiérarchie typographique forte — on sait toujours où on est
- Couleur fonctionnelle — chaque couleur a un sens, pas de décoration gratuite
- Composant signature : `CliPrompt` qui imite **fidèlement** le rendu d'un terminal IOS

**À éviter absolument** :
- ❌ Glassmorphism, gradients pastels, illustrations 3D
- ❌ Bordures arrondies excessives (max 8px sur les gros éléments, 4px sur les petits)
- ❌ Drop shadows lourdes
- ❌ Police Inter, Roboto, Poppins (vues partout)
- ❌ Couleurs Cisco partout — le bleu est un **accent**, pas une dominante

---

## 2. Tokens — Couleurs

CSS variables dans `src/styles/tokens.css`. **Toutes** les couleurs passent par des tokens, **aucune** valeur en dur dans les composants.

### Light mode (par défaut)

```css
:root {
  /* Surfaces */
  --color-bg:               #FFFFFF;        /* fond principal */
  --color-bg-subtle:        #F8FAFC;        /* sidebar, code blocks bg */
  --color-bg-muted:         #F1F5F9;        /* hover, callouts */
  --color-bg-elevated:      #FFFFFF;        /* modals, palette */

  /* Bordures */
  --color-border:           #E2E8F0;        /* bordures par défaut */
  --color-border-strong:    #CBD5E1;        /* bordures emphasis */

  /* Texte */
  --color-text:             #0F172A;        /* texte principal */
  --color-text-muted:       #475569;        /* secondaire, descriptions */
  --color-text-subtle:      #94A3B8;        /* tertiaire, captions */
  --color-text-inverse:     #FFFFFF;        /* sur fond coloré */

  /* Cisco Blue (accent signature) */
  --color-accent:           #00BCEB;        /* Cisco Blue officiel */
  --color-accent-hover:     #0098BC;        /* accent au hover */
  --color-accent-bg:        #E6F8FD;        /* fond accent léger */

  /* Couleurs des modes CLI (le détail signature) */
  --color-mode-user:        #64748B;        /* > prompt user mode (gris ardoise) */
  --color-mode-priv:        #00BCEB;        /* # prompt privileged (Cisco Blue) */
  --color-mode-config:      #7C3AED;        /* (config)# global config (violet) */
  --color-mode-config-if:   #059669;        /* (config-if)# interface (vert) */
  --color-mode-config-line: #DB2777;        /* (config-line)# line (rose) */
  --color-mode-config-rtr:  #DC2626;        /* (config-router)# routing (rouge) */
  --color-mode-config-vlan: #D97706;        /* (config-vlan)# vlan (orange) */

  /* États sémantiques */
  --color-success:          #16A34A;
  --color-success-bg:       #F0FDF4;
  --color-warning:          #D97706;
  --color-warning-bg:       #FFFBEB;
  --color-danger:           #DC2626;
  --color-danger-bg:        #FEF2F2;
  --color-info:             #0284C7;
  --color-info-bg:          #F0F9FF;

  /* Difficulté */
  --color-diff-debutant:    #16A34A;
  --color-diff-intermed:    #D97706;
  --color-diff-avance:      #DC2626;

  /* Code (Shiki theme tokens) */
  --color-code-bg:          #0F172A;        /* fond bloc code (sombre même en light) */
  --color-code-fg:          #E2E8F0;        /* texte code par défaut */
  --color-code-comment:     #64748B;
  --color-code-keyword:     #00BCEB;        /* enable, configure, ip, etc. */
  --color-code-string:      #4ADE80;
  --color-code-number:      #FB923C;
  --color-code-punct:       #94A3B8;

  /* Focus ring */
  --ring:                   0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-accent);

  /* Ombres (très légères, on est dans du flat-ish) */
  --shadow-sm:              0 1px 2px rgb(15 23 42 / 0.04);
  --shadow-md:              0 2px 8px rgb(15 23 42 / 0.06), 0 1px 2px rgb(15 23 42 / 0.04);
  --shadow-lg:              0 8px 24px rgb(15 23 42 / 0.08), 0 2px 4px rgb(15 23 42 / 0.04);
}
```

### Dark mode

```css
[data-theme="dark"] {
  --color-bg:               #0B1221;        /* bleu nuit, pas noir pur */
  --color-bg-subtle:        #111827;
  --color-bg-muted:         #1E293B;
  --color-bg-elevated:      #1E293B;

  --color-border:           #1E293B;
  --color-border-strong:    #334155;

  --color-text:             #F1F5F9;
  --color-text-muted:       #94A3B8;
  --color-text-subtle:      #64748B;
  --color-text-inverse:     #0F172A;

  --color-accent:           #22D3EE;        /* + lumineux en dark */
  --color-accent-hover:     #67E8F9;
  --color-accent-bg:        #083344;

  /* Modes CLI (saturation augmentée pour contraste sur fond sombre) */
  --color-mode-user:        #94A3B8;
  --color-mode-priv:        #22D3EE;
  --color-mode-config:      #A78BFA;
  --color-mode-config-if:   #34D399;
  --color-mode-config-line: #F472B6;
  --color-mode-config-rtr:  #F87171;
  --color-mode-config-vlan: #FBBF24;

  --color-success:          #4ADE80;
  --color-success-bg:       #052E16;
  --color-warning:          #FBBF24;
  --color-warning-bg:       #422006;
  --color-danger:           #F87171;
  --color-danger-bg:        #450A0A;
  --color-info:             #38BDF8;
  --color-info-bg:          #082F49;

  --shadow-sm:              0 1px 2px rgb(0 0 0 / 0.4);
  --shadow-md:              0 2px 8px rgb(0 0 0 / 0.4);
  --shadow-lg:              0 8px 24px rgb(0 0 0 / 0.5);
}
```

---

## 3. Tokens — Typographie

```css
:root {
  --font-sans:  'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono:  'IBM Plex Mono', 'JetBrains Mono', 'Fira Code', monospace;

  /* Échelle modulaire (ratio 1.2) */
  --text-xs:    0.75rem;     /* 12px — captions, badges */
  --text-sm:    0.875rem;    /* 14px — meta, labels */
  --text-base:  1rem;        /* 16px — corps */
  --text-lg:    1.125rem;    /* 18px — lead */
  --text-xl:    1.25rem;     /* 20px — h4 */
  --text-2xl:   1.5rem;      /* 24px — h3 */
  --text-3xl:   1.875rem;    /* 30px — h2 */
  --text-4xl:   2.25rem;     /* 36px — h1 */
  --text-5xl:   3rem;        /* 48px — hero */

  /* Line-heights */
  --leading-tight:  1.2;
  --leading-snug:   1.4;
  --leading-normal: 1.6;
  --leading-relaxed:1.75;

  /* Letter-spacings */
  --tracking-tight:  -0.02em;     /* h1-h2 */
  --tracking-normal: 0;
  --tracking-wide:   0.05em;      /* eyebrows, labels */
}
```

### Application

| Élément | Police | Taille | Weight | Tracking | Leading |
|---|---|---|---|---|---|
| Hero h1 (home) | Sans | 5xl (mobile: 4xl) | 700 | tight | tight |
| h1 fiche | Sans | 4xl | 700 | tight | tight |
| h2 | Sans | 2xl | 600 | tight | snug |
| h3 | Sans | xl | 600 | normal | snug |
| h4 | Sans | base | 600 | normal | snug |
| Corps | Sans | base | 400 | normal | relaxed |
| Lead | Sans | lg | 400 | normal | relaxed |
| Meta / captions | Sans | sm | 400 | normal | normal |
| Badges, eyebrows | Sans | xs | 600 | wide (uppercase) | normal |
| Code inline | Mono | 0.9em | 500 | normal | normal |
| Code block | Mono | sm | 400 | normal | snug |

---

## 4. Tokens — Espacement & layout

```css
:root {
  /* Espacement (échelle 4px) */
  --space-1:   0.25rem;  /*  4px */
  --space-2:   0.5rem;   /*  8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-24:  6rem;     /* 96px */

  /* Rayons */
  --radius-sm:    0.25rem; /*  4px */
  --radius-md:    0.375rem;/*  6px */
  --radius-lg:    0.5rem;  /*  8px */
  --radius-xl:    0.75rem; /* 12px */

  /* Layout */
  --layout-sidebar:    280px;
  --layout-toc:        240px;
  --layout-content-max:760px;
  --layout-header-h:   60px;
  --layout-gap:        var(--space-12);

  /* Z-index */
  --z-header:   50;
  --z-sidebar:  40;
  --z-overlay:  90;
  --z-modal:    100;
  --z-toast:    110;
}
```

### Breakpoints

| Nom | Min-width | Usage |
|---|---|---|
| `sm` | 640px | grands smartphones |
| `md` | 768px | tablettes — sidebar reste drawer |
| `lg` | 1024px | desktop — sidebar visible, TOC encore caché |
| `xl` | 1280px | desktop large — TOC apparaît |
| `2xl` | 1536px | très grand écran — augmente le `layout-gap` |

---

## 5. Composants

### 5.1 `CliPrompt.astro` ⭐ composant signature

**But** : afficher un prompt CLI réaliste avec couleur du mode et hostname.

```astro
---
interface Props {
  hostname?: string;     // défaut: "Switch" ou "Router" selon mode
  mode: 'user' | 'privileged' | 'config' | 'config-if' | 'config-line' | 'config-router' | 'config-vlan';
  ifname?: string;       // pour config-if : "FastEthernet0/1"
}
---
```

**Rendu visuel attendu :**

```
Switch>                          ← gris ardoise
Switch#                          ← Cisco Blue
Switch(config)#                  ← violet
Switch(config-if)#               ← vert (avec ifname optionnel: Switch(config-if-Fa0/1)#)
Switch(config-line)#             ← rose
Router(config-router)#           ← rouge
Switch(config-vlan)#             ← orange
```

Le caractère `>` ou `#` est en **bold** et coloré. Le hostname et la parenthèse en `--color-mode-*` à 80 % d'opacité. Police mono.

**Détail crucial** : ce composant est utilisé **dans le contenu MDX**, pas seulement dans les blocs de code. Exemple :

> Pour passer en mode privilégié, tape `enable` depuis `<CliPrompt mode="user" />`.

### 5.2 `CodeBlock.astro`

Bloc de code avec :
- Fond `--color-code-bg` (sombre même en light mode — c'est un terminal)
- En-tête optionnelle : titre du bloc (ex: "Configuration sur Switch1") + bouton copier
- Numérotation des lignes (optionnelle, prop `showLineNumbers`)
- Highlight de lignes (prop `highlight={[3, 5]}`)
- Coloration syntaxique IOS-aware via Shiki ou regex custom (mots-clés Cisco surlignés)
- Padding `--space-4` à `--space-6`
- Border-radius `--radius-lg`
- Pas de scroll horizontal — `overflow-x: auto` avec scrollbar fine stylée

### 5.3 `Badge.astro`

Petit indicateur. Variants :
- `mode` (user, privileged, config, ...) → couleur `--color-mode-*`, fond avec 10 % d'opacité
- `difficulty` (débutant, intermédiaire, avancé) → couleurs `--color-diff-*`
- `device` (switch, router) → fond `--color-bg-muted`, texte `--color-text`
- `info`, `warning`, `success` → couleurs sémantiques

Style commun : `text-xs`, `font-weight: 600`, `padding: 2px 8px`, `border-radius: --radius-sm`, `tracking-wide`, `text-transform: uppercase`.

### 5.4 `Callout.astro`

Bloc d'aide. Variants :
- `note` (info bleu, icône Info)
- `tip` (vert, icône Lightbulb)
- `warning` (orange, icône AlertTriangle)
- `danger` (rouge, icône AlertOctagon) — pour les commandes destructrices type `erase startup-config`

Structure :
- Icône à gauche (24×24)
- Titre optionnel (gras)
- Contenu
- Bordure gauche 3px de la couleur sémantique
- Fond `--color-{variant}-bg`
- Padding `--space-4`

### 5.5 `Topology.astro`

Affiche une topologie ASCII en monospace, **stylée** (pas juste un `<pre>`) :
- Fond `--color-bg-subtle`
- Bordure pointillée 1px `--color-border-strong`
- Padding `--space-6`
- Police `--font-mono`, taille `sm`, line-height `1.4`
- Centrage horizontal du contenu

Exemple de topologie attendue dans le contenu :

```
   PC1 ──────┐
             │
             ▼
       ┌──────────┐    Trunk     ┌──────────┐
       │   SW1    │ ◄══════════► │   SW2    │
       │  VLAN10  │              │  VLAN10  │
       └──────────┘              └──────────┘
                                       ▲
                                       │
                                       └────── PC2
```

### 5.6 `Kbd.astro`

Touche clavier stylée : fond `--color-bg-muted`, bordure `--color-border-strong`, ombre interne légère, monospace, padding `2px 6px`. Utilisée pour `<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>`.

### 5.7 `Sidebar.astro`

- Largeur fixe 280px desktop
- Background `--color-bg-subtle`
- Border-right 1px `--color-border`
- Catégories en uppercase, `text-xs`, `tracking-wide`, `--color-text-subtle`
- Items : padding `8px 12px`, hover `--color-bg-muted`, actif `--color-bg-muted` + bordure gauche 2px `--color-accent`
- Scroll indépendant si overflow

### 5.8 `Header.astro`

- Hauteur 60px
- Sticky top
- Border-bottom 1px `--color-border`
- Background `--color-bg` avec `backdrop-filter: blur(8px)` quand on scroll (ajouter classe `.scrolled` via JS)
- Logo à gauche (32px de hauteur)
- Search bar centrée (cachée sur mobile, remplacée par un bouton loupe)
- Actions à droite : ThemeToggle + lien GitHub

### 5.9 `SearchPalette.astro` (Ctrl+K)

- Modal centré, max-width 640px
- Backdrop : `rgba(15, 23, 42, 0.6)` + `backdrop-filter: blur(4px)`
- Background `--color-bg-elevated`
- Shadow `--shadow-lg`
- Border-radius `--radius-xl`
- Input en haut, résultats en dessous (max 8 visibles, scroll après)
- Chaque résultat : titre + catégorie + extrait (highlight du match)
- Footer : `<Kbd>↑</Kbd><Kbd>↓</Kbd> Naviguer  <Kbd>↵</Kbd> Ouvrir  <Kbd>Esc</Kbd> Fermer`
- Animation d'apparition : fade + scale 0.95 → 1 en 150ms

---

## 6. Animations & micro-interactions

**Principe : sobre. Animations au service de la lecture, jamais décoratives.**

```css
:root {
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  --duration-instant: 75ms;     /* feedback immédiat (focus) */
  --duration-fast:    150ms;    /* hover, fade */
  --duration-normal:  250ms;    /* transitions de page */
  --duration-slow:    400ms;    /* apparitions */
}
```

| Cas | Animation |
|---|---|
| Hover sur un lien | `color` transition fast |
| Hover sur un item de sidebar | `background-color` transition fast |
| Bouton copier après clic | swap icône Copy → Check, durée 1500ms |
| Ouverture palette Ctrl+K | fade-in 150ms + scale 0.95 → 1 |
| Toggle thème | `color` + `background-color` transitions normal |
| Page load (home) | stagger sur les cartes catégorie : `animation-delay: 50ms * index` |
| Scroll : header transparent → opaque | classe `.scrolled` via Intersection Observer |

**Respect de `prefers-reduced-motion`** :

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. États & accessibilité

### Focus visible (obligatoire)

```css
:focus-visible {
  outline: none;
  box-shadow: var(--ring);
  border-radius: var(--radius-sm);
}
```

### Contraste

Tous les textes doivent passer **WCAG AA** (4.5:1 corps, 3:1 grand texte). Vérifier via [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

### Cibles tactiles

Tous les éléments cliquables ≥ 44×44px sur mobile.

### Skip-link

`<a href="#main">Aller au contenu principal</a>` en début de `body`, visible uniquement au focus.

---

## 8. Layout — détail des 3 colonnes

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (sticky, h: 60px)                                    │
├─────────────┬───────────────────────────────┬───────────────┤
│             │                               │               │
│  SIDEBAR    │   CONTENU (max-width 760px)   │   TOC         │
│  280px      │   centré dans son col         │   240px       │
│             │                               │               │
│  Catégories │   • Frontmatter (badges)      │   • Sommaire  │
│  Sous-cats  │   • H1 + description          │   • Liens H2  │
│  Items      │   • Corps MDX                 │   • Highlight │
│             │   • RelatedCommands           │     section   │
│             │                               │     visible   │
│  scroll     │   scroll page                 │   sticky      │
│  indép.     │                               │               │
│             │                               │               │
├─────────────┴───────────────────────────────┴───────────────┤
│  FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

- **< 768px (mobile)** : sidebar = drawer (overlay), TOC caché (remplacé par un `<details>` collapsible en haut du contenu)
- **768px – 1023px (tablet)** : sidebar = drawer, contenu pleine largeur, TOC caché
- **1024px – 1279px (desktop)** : sidebar visible, TOC caché
- **≥ 1280px (xl)** : tout visible

---

## 9. Inspirations à étudier (pas à copier)

- [Stripe Docs](https://stripe.com/docs) — la rigueur typographique
- [Cisco DevNet](https://developer.cisco.com/) — la palette et le ton
- [Linear Docs](https://linear.app/docs) — la palette `Cmd+K` et la densité
- [Vercel Docs](https://vercel.com/docs) — le dark mode
- [Tailwind Docs](https://tailwindcss.com/docs) — la sidebar et la TOC

**Important :** ces sites sont des références d'**ergonomie**, pas de **style**. On garde notre identité.

---

## 10. Don'ts récap

- ❌ Pas de gradient en arrière-plan (sauf cas spécifique justifié)
- ❌ Pas d'image décorative sans fonction (illustrations gratuites)
- ❌ Pas plus de 2 niveaux d'élévation (shadow-md max sur la palette)
- ❌ Pas de bordure double, pointillée pour la déco (sauf `Topology`)
- ❌ Pas de couleur Cisco Blue sur de larges aplats — c'est un accent
- ❌ Pas d'emoji dans l'interface (uniquement dans le contenu si pertinent)
- ❌ Pas de "feature flag" non implémenté visible dans l'UI
