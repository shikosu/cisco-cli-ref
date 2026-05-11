# CONTENT.md — Contenu : format, inventaire, exemples

> **Ce fichier est la bible du contenu.** Il définit comment rédiger chaque fiche, dans quel ordre les écrire, et fournit 3 templates complets à copier-coller.

---

## 1. Format d'une fiche

Chaque commande = un fichier `.mdx` dans `src/content/commands/<categorie>/<slug>.mdx`.

### Frontmatter (obligatoire)

```yaml
---
title: "Configurer le hostname"
description: "Définir le nom d'hôte d'un switch ou routeur Cisco — visible dans le prompt CLI."
category: "bases"
mode: "config"
syntax: "hostname <nom>"
devices: ["switch", "router"]
difficulty: "debutant"
related:
  - "bases/banner-motd"
  - "bases/sauvegarder-config"
examTags: ["bac-pro-ciel", "bts-sio"]
updated: 2026-05-06
---
```

### Structure du corps

Chaque fiche **doit** suivre cette structure (dans cet ordre) :

```mdx
import { Badge, CliPrompt, CodeBlock, Callout, Topology, Kbd } from '@/components/ui';

## En bref
<!-- 1-2 phrases. Quoi, pourquoi, dans quel mode. -->

## Syntaxe
<!-- Bloc de code avec la syntaxe générique. -->

## Exemple minimal
<!-- Le cas le plus simple, prêt à copier-coller. -->

## Topologie
<!-- Diagramme ASCII du contexte typique. -->

## Étapes détaillées
<!-- Marche à suivre commentée, bloc par bloc. -->

## Vérification
<!-- Les commandes `show` qui prouvent que ça marche. -->

## Pièges fréquents
<!-- Erreurs courantes (Callout warning). -->

## Voir aussi
<!-- 3 fiches liées max. -->
```

### Règles d'écriture

- **Tutoiement** (cohérent avec le ton « manuel pratique »)
- Phrases **courtes**, pas de jargon académique inutile
- Toujours indiquer **dans quel mode** on tape la commande (via `<CliPrompt>`)
- Pas de copier-coller de la doc Cisco officielle — reformulation obligatoire
- Mots-clés Cisco en `code inline` : ``ip address``, ``no shutdown``, ``vlan 10``

---

## 2. Inventaire des fiches (37 commandes)

Légende : 🟢 priorité haute (à rédiger d'abord) · 🟡 priorité moyenne · 🔵 priorité basse

### Catégorie `bases/` — 5 fiches

| Slug | Mode | Priorité |
|---|---|---|
| 🟢 modes-cli | — | haute |
| 🟢 configurer-hostname | config | haute |
| 🟡 banner-motd | config | moyenne |
| 🟢 sauvegarder-config | privileged | haute |
| 🔵 reload-erase | privileged | basse |

### Catégorie `securite/` — 5 fiches

| Slug | Mode | Priorité |
|---|---|---|
| 🟢 enable-secret | config | haute |
| 🟢 mot-de-passe-console | config-line | haute |
| 🟢 mot-de-passe-vty | config-line | haute |
| 🟡 service-password-encryption | config | moyenne |
| 🟢 configurer-ssh | config | haute |

### Catégorie `switching/` — 7 fiches

| Slug | Mode | Priorité |
|---|---|---|
| 🟢 creer-vlan | config-vlan | haute |
| 🟢 attribuer-port-vlan | config-if | haute |
| 🟢 configurer-trunk | config-if | haute |
| 🟡 port-security | config-if | moyenne |
| 🟡 stp-bases | config | moyenne |
| 🔵 etherchannel | config-if | basse |
| 🔵 voice-vlan | config-if | basse |

### Catégorie `routing/` — 6 fiches

| Slug | Mode | Priorité |
|---|---|---|
| 🟢 configurer-interface | config-if | haute |
| 🟢 route-statique | config | haute |
| 🟢 route-par-defaut | config | haute |
| 🟡 rip-v2 | config-router | moyenne |
| 🟡 ospf-single-area | config-router | moyenne |
| 🟡 router-on-a-stick | config-if | moyenne |

### Catégorie `services/` — 4 fiches

| Slug | Mode | Priorité |
|---|---|---|
| 🟡 dhcp-server | config | moyenne |
| 🟡 nat-static | config | moyenne |
| 🔵 nat-dynamic | config | basse |
| 🟡 nat-pat | config | moyenne |

### Catégorie `acl/` — 4 fiches

| Slug | Mode | Priorité |
|---|---|---|
| 🟡 acl-standard | config | moyenne |
| 🟡 acl-etendue | config | moyenne |
| 🔵 acl-named | config | basse |
| 🟡 appliquer-acl | config-if | moyenne |

### Catégorie `diagnostic/` — 7 fiches

| Slug | Mode | Priorité |
|---|---|---|
| 🟢 show-running-config | privileged | haute |
| 🟢 show-ip-interface-brief | privileged | haute |
| 🟡 show-vlan | privileged | moyenne |
| 🟡 show-ip-route | privileged | moyenne |
| 🟢 ping | privileged | haute |
| 🟡 traceroute | privileged | moyenne |
| 🔵 debug-bases | privileged | basse |

### Récap priorités

- **🟢 Haute (15 fiches)** — à rédiger en premier dans la phase 5
- **🟡 Moyenne (14 fiches)** — à rédiger ensuite
- **🔵 Basse (8 fiches)** — peuvent rester en stub pour le lancement

---

## 3. Trois exemples complets (à utiliser comme templates)

### Exemple 1 — `bases/configurer-hostname.mdx`

```mdx
---
title: "Configurer le hostname"
description: "Définir le nom d'hôte d'un switch ou routeur Cisco — visible dans le prompt CLI."
category: "bases"
mode: "config"
syntax: "hostname <nom>"
devices: ["switch", "router"]
difficulty: "debutant"
related:
  - "bases/banner-motd"
  - "bases/sauvegarder-config"
  - "securite/enable-secret"
examTags: ["bac-pro-ciel", "bts-sio"]
updated: 2026-05-06
---

import { Badge, CliPrompt, CodeBlock, Callout, Topology, Kbd } from '@/components/ui';

## En bref

Le **hostname** est le nom qui s'affiche dans le prompt CLI. Le changer permet d'identifier rapidement chaque équipement dans une infra. La commande s'utilise en mode **config global**.

## Syntaxe

<CodeBlock lang="cisco">
hostname <nom>
</CodeBlock>

- `<nom>` : 1 à 63 caractères, sans espace, casse-sensitive
- Pas de caractère spécial sauf `-` et `_`

## Exemple minimal

Sur un switch que tu veux nommer **SW-Lattes-01** :

<CodeBlock lang="cisco">
Switch> enable
Switch# configure terminal
Switch(config)# hostname SW-Lattes-01
SW-Lattes-01(config)#
</CodeBlock>

Le changement est **immédiat** dans le prompt.

## Topologie

<Topology>
{`
   Avant                       Après
   ─────                       ─────
   Switch>                     SW-Lattes-01>
   Switch#                     SW-Lattes-01#
   Switch(config)#             SW-Lattes-01(config)#
`}
</Topology>

## Étapes détaillées

**1. Passer en mode privilégié**

<CliPrompt mode="user" /> tape `enable`. Si un mot de passe est défini, saisis-le.

**2. Entrer en mode config global**

<CliPrompt mode="privileged" /> tape `configure terminal` (ou son raccourci `conf t`).

**3. Définir le hostname**

<CliPrompt mode="config" /> tape `hostname` suivi du nom voulu.

**4. Sauvegarder (sinon perdu au redémarrage)**

<CodeBlock lang="cisco">
SW-Lattes-01(config)# end
SW-Lattes-01# write memory
</CodeBlock>

## Vérification

<CodeBlock lang="cisco">
SW-Lattes-01# show running-config | include hostname
hostname SW-Lattes-01
</CodeBlock>

Ou simplement : le prompt a changé.

## Pièges fréquents

<Callout type="warning" title="Sensible à la casse">
`hostname Switch` et `hostname switch` produisent **deux prompts différents**. Choisis une convention (souvent : majuscules pour les équipements, minuscules pour les hôtes Linux).
</Callout>

<Callout type="danger" title="Pas d'espace">
`hostname SW Lattes 01` provoquera une erreur. Utilise `-` ou `_` à la place.
</Callout>

<Callout type="tip" title="Convention de nommage">
Une bonne convention : `<TYPE>-<SITE>-<N°>`. Ex : `RTR-SIEGE-01`, `SW-LATTES-03`. Ça facilite les ACL et la lecture des `show cdp neighbors`.
</Callout>

## Voir aussi

- [Configurer le banner MOTD](/commands/bases/banner-motd)
- [Sauvegarder la configuration](/commands/bases/sauvegarder-config)
- [Définir un mot de passe enable](/commands/securite/enable-secret)
```

---

### Exemple 2 — `switching/creer-vlan.mdx`

```mdx
---
title: "Créer un VLAN"
description: "Définir un VLAN sur un switch Cisco et lui donner un nom — base de toute segmentation L2."
category: "switching"
mode: "config-vlan"
syntax: "vlan <id> + name <nom>"
devices: ["switch"]
difficulty: "debutant"
related:
  - "switching/attribuer-port-vlan"
  - "switching/configurer-trunk"
  - "diagnostic/show-vlan"
examTags: ["bac-pro-ciel", "bts-sio", "but-rt"]
updated: 2026-05-06
---

import { Badge, CliPrompt, CodeBlock, Callout, Topology, Kbd } from '@/components/ui';

## En bref

Un **VLAN** (Virtual LAN) segmente un switch en plusieurs réseaux logiques indépendants. Créer un VLAN, c'est lui donner un **ID** (1-4094) et un **nom** lisible.

## Syntaxe

<CodeBlock lang="cisco">
vlan <id>
 name <nom>
</CodeBlock>

- `<id>` : entier entre 1 et 4094 (le 1 et 1002-1005 sont réservés)
- `<nom>` : 32 caractères max, sans espace

## Exemple minimal

Créer le VLAN 10 nommé **Eleves** sur un switch :

<CodeBlock lang="cisco">
Switch> enable
Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name Eleves
Switch(config-vlan)# exit
</CodeBlock>

## Topologie

<Topology>
{`
              ┌──────────────────────────┐
              │         SW1              │
              │                          │
              │  VLAN 10 ── Eleves       │
              │  VLAN 20 ── Profs        │
              │  VLAN 30 ── Admin        │
              │                          │
              └──────────────────────────┘
                  Un switch, 3 VLAN logiques
`}
</Topology>

## Étapes détaillées

**1. Passer en mode privilégié puis config**

<CodeBlock lang="cisco">
Switch> enable
Switch# configure terminal
</CodeBlock>

**2. Créer le VLAN**

<CliPrompt mode="config" /> tape `vlan <id>`. Le prompt passe en mode `config-vlan`.

<CodeBlock lang="cisco">
Switch(config)# vlan 10
Switch(config-vlan)#
</CodeBlock>

**3. Nommer le VLAN**

<CodeBlock lang="cisco">
Switch(config-vlan)# name Eleves
</CodeBlock>

**4. Sortir et sauvegarder**

<CodeBlock lang="cisco">
Switch(config-vlan)# end
Switch# write memory
</CodeBlock>

## Vérification

<CodeBlock lang="cisco">
Switch# show vlan brief

VLAN Name                             Status    Ports
---- -------------------------------- --------- ---------------
1    default                          active    Fa0/1, Fa0/2, ...
10   Eleves                           active
20   Profs                            active
1002 fddi-default                     act/unsup
...
</CodeBlock>

Le VLAN apparaît, mais **aucun port n'y est encore associé** — c'est l'étape suivante.

## Pièges fréquents

<Callout type="warning" title="Le VLAN existe mais ne fait rien">
Créer un VLAN ne fait que le déclarer. Pour qu'il serve à quelque chose, il faut **attribuer des ports** ([voir cette fiche](/commands/switching/attribuer-port-vlan)) ou le **transporter sur un trunk**.
</Callout>

<Callout type="danger" title="Évite le VLAN 1">
Le VLAN 1 est le VLAN par défaut, présent partout. Pour la sécurité, on **ne** met jamais d'utilisateurs dedans. Crée toujours des VLAN dédiés (10, 20, 30…).
</Callout>

<Callout type="tip" title="Plage usuelle">
Convention courante : VLAN 10/20/30 pour les usages, VLAN 99 pour le management, VLAN 999 pour les ports désactivés.
</Callout>

## Voir aussi

- [Attribuer un port à un VLAN](/commands/switching/attribuer-port-vlan)
- [Configurer un trunk](/commands/switching/configurer-trunk)
- [Vérifier les VLAN avec `show vlan`](/commands/diagnostic/show-vlan)
```

---

### Exemple 3 — `securite/configurer-ssh.mdx`

```mdx
---
title: "Configurer SSH"
description: "Activer l'accès SSH sur un switch ou routeur Cisco — remplace Telnet, chiffré, obligatoire en prod."
category: "securite"
mode: "config"
syntax: "crypto key generate rsa + line vty + transport input ssh"
devices: ["switch", "router"]
difficulty: "intermediaire"
related:
  - "securite/mot-de-passe-vty"
  - "securite/enable-secret"
  - "bases/configurer-hostname"
examTags: ["bac-pro-ciel", "bts-sio", "bts-cyber"]
updated: 2026-05-06
---

import { Badge, CliPrompt, CodeBlock, Callout, Topology, Kbd } from '@/components/ui';

## En bref

**SSH** (Secure Shell) chiffre les sessions d'administration distante. C'est le successeur de Telnet, qui transmettait les mots de passe en clair. SSH est **obligatoire** en environnement pro.

Pour activer SSH, il faut **4 conditions** :

1. Un **hostname** (autre que `Switch`/`Router` par défaut)
2. Un **domain-name** (n'importe lequel)
3. Une **paire de clés RSA** ≥ 1024 bits
4. Un **utilisateur local** + autorisation SSH sur les lignes VTY

## Syntaxe

<CodeBlock lang="cisco">
hostname <nom>
ip domain-name <domaine>
crypto key generate rsa
  modulus <taille>
username <user> privilege 15 secret <mdp>
line vty 0 4
  login local
  transport input ssh
</CodeBlock>

## Exemple minimal

<CodeBlock lang="cisco" highlight={[3, 7, 12]}>
SW-Lattes-01> enable
SW-Lattes-01# configure terminal
SW-Lattes-01(config)# ip domain-name lycee-champollion.fr
SW-Lattes-01(config)# crypto key generate rsa
The name for the keys will be: SW-Lattes-01.lycee-champollion.fr
How many bits in the modulus [512]: 2048

SW-Lattes-01(config)# username admin privilege 15 secret M0nM0tDePasse!
SW-Lattes-01(config)# line vty 0 4
SW-Lattes-01(config-line)# login local
SW-Lattes-01(config-line)# transport input ssh
SW-Lattes-01(config-line)# end
SW-Lattes-01# write memory
</CodeBlock>

## Topologie

<Topology>
{`
   Poste admin                      Switch / Routeur
   ───────────                      ────────────────
                  TCP/22 chiffré
   ┌─────────┐ ◄══════════════════► ┌──────────────┐
   │ PuTTY / │                      │ SW-Lattes-01 │
   │ ssh CLI │     Authentification │              │
   └─────────┘  user / mdp          └──────────────┘
`}
</Topology>

## Étapes détaillées

**1. Vérifier que le hostname n'est pas par défaut**

<CliPrompt mode="privileged" /> tape `show running-config | include hostname`. Si tu vois `hostname Switch`, [change-le d'abord](/commands/bases/configurer-hostname).

**2. Définir un domain-name**

<CodeBlock lang="cisco">
Switch(config)# ip domain-name lycee-champollion.fr
</CodeBlock>

Ce domaine n'a pas besoin d'exister vraiment — il sert juste à nommer les clés RSA.

**3. Générer la paire de clés RSA**

<CodeBlock lang="cisco">
Switch(config)# crypto key generate rsa
How many bits in the modulus [512]: 2048
</CodeBlock>

<Callout type="tip" title="Modulus">
**Minimum 1024**, recommandé **2048**. Plus c'est grand, plus c'est sécurisé, mais plus la génération est lente. 2048 est un bon compromis.
</Callout>

**4. Créer un utilisateur local**

<CodeBlock lang="cisco">
Switch(config)# username admin privilege 15 secret M0nM0tDePasse!
</CodeBlock>

`privilege 15` = niveau max (équivalent enable). `secret` = stockage chiffré (vs `password` en clair).

**5. Configurer les lignes VTY**

<CodeBlock lang="cisco">
Switch(config)# line vty 0 4
Switch(config-line)# login local
Switch(config-line)# transport input ssh
</CodeBlock>

- `login local` → utilise la base locale (pas un mot de passe partagé)
- `transport input ssh` → **n'autorise que SSH** (refuse Telnet)

## Vérification

Depuis ton poste :

<CodeBlock lang="bash">
ssh admin@192.168.1.1
</CodeBlock>

Ou côté équipement :

<CodeBlock lang="cisco">
SW-Lattes-01# show ip ssh
SSH Enabled - version 2.0
Authentication timeout: 120 secs; Authentication retries: 3

SW-Lattes-01# show ssh
Connection      Version Mode Encryption Hmac     State
0               2.0     IN   aes128-ctr hmac-sha1 Session started
</CodeBlock>

## Pièges fréquents

<Callout type="danger" title="Ne mets jamais `transport input telnet`">
Telnet transmet les mots de passe en **clair sur le réseau**. C'est une faute en évaluation Bac Pro CIEL. Toujours `transport input ssh` (ou `transport input ssh telnet` uniquement en migration).
</Callout>

<Callout type="warning" title="Hostname par défaut → erreur">
Si tu lances `crypto key generate rsa` sur un équipement nommé `Switch` ou `Router`, l'IOS refuse. **Changer le hostname est un prérequis.**
</Callout>

<Callout type="tip" title="Forcer SSH v2 uniquement">
SSH v1 a des vulnérabilités. Force la v2 : `ip ssh version 2`.
</Callout>

## Voir aussi

- [Mot de passe sur les lignes VTY](/commands/securite/mot-de-passe-vty)
- [Définir un mot de passe enable](/commands/securite/enable-secret)
- [Configurer le hostname](/commands/bases/configurer-hostname)
```

---

## 4. Bonnes pratiques de rédaction

| Faire | Ne pas faire |
|---|---|
| Tutoyer le lecteur | Vouvoiement |
| Phrases ≤ 20 mots | Phrases-fleuves académiques |
| Toujours montrer un exemple **complet** copiable | Snippets isolés sans contexte |
| Indiquer le mode CLI à chaque étape | Supposer que le lecteur sait où il est |
| 3 fiches liées maximum | 10 liens en fin de page |
| Pièges fréquents = 2 à 4 callouts | Liste exhaustive de tous les cas tordus |
| Hostnames réalistes (`SW-Lattes-01`) | `Switch1`, `MonSwitch`, `Toto` |

---

## 5. Cheatsheet imprimable (page de catégorie)

La page `/categories/<categorie>` doit générer une **vue condensée** imprimable :

- Une fiche = un **bloc compact** (titre + syntaxe + 1 exemple minimal)
- CSS `@media print` : pas de header/sidebar/TOC, font-size réduit, marges 1.5cm, sauts de page entre fiches
- Sur écran : présentation en cartes, bouton "Imprimer cette catégorie" en haut

C'est **le** mode d'usage en TP : impression d'une cheatsheet `switching` avant un devoir noté.

---

## 6. Évolutions possibles (hors scope v1)

À garder en tête mais pas à implémenter maintenant :

- Mini-simulateur CLI (taper la commande, voir le résultat simulé)
- Quizz de révision (« dans quel mode tape-t-on `vlan 10` ? »)
- Mode « parcours guidé » (suite de fiches dans l'ordre pédagogique)
- Export PDF complet du site
- Versionning des commandes (différences entre IOS 12.x et 15.x)
