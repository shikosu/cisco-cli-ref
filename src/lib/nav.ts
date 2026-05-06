/**
 * Données de navigation — Phase 2 (statique)
 * Phase 3 remplacera items[] par getCollection('commands')
 */

export interface NavItem {
  slug: string;
  title: string;
  href: string;
  mode?: string;
}

export interface NavCategory {
  slug: string;
  title: string;
  description: string;
  commandCount: number;
  icon: string; /* Nom d'icône Lucide */
  items: NavItem[];
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    slug: 'bases',
    title: 'Bases',
    description: 'Premiers pas sur un équipement Cisco IOS',
    commandCount: 5,
    icon: 'terminal',
    items: [
      { slug: 'modes-cli',         title: 'Modes CLI',           href: '/commands/bases/modes-cli',          mode: 'user' },
      { slug: 'configurer-hostname',title: 'Configurer le hostname',href: '/commands/bases/configurer-hostname',mode: 'config' },
      { slug: 'banner-motd',        title: 'Banner MOTD',         href: '/commands/bases/banner-motd',         mode: 'config' },
      { slug: 'sauvegarder-config', title: 'Sauvegarder la config',href: '/commands/bases/sauvegarder-config',  mode: 'privileged' },
      { slug: 'reload-erase',       title: 'Reload / Erase',      href: '/commands/bases/reload-erase',        mode: 'privileged' },
    ],
  },
  {
    slug: 'securite',
    title: 'Sécurité',
    description: 'Mots de passe, SSH et protection des accès',
    commandCount: 5,
    icon: 'shield',
    items: [
      { slug: 'enable-secret',             title: 'Enable secret',              href: '/commands/securite/enable-secret',             mode: 'config' },
      { slug: 'mot-de-passe-console',      title: 'Mot de passe console',       href: '/commands/securite/mot-de-passe-console',      mode: 'config-line' },
      { slug: 'mot-de-passe-vty',          title: 'Mot de passe VTY',           href: '/commands/securite/mot-de-passe-vty',          mode: 'config-line' },
      { slug: 'service-password-encryption',title: 'Password encryption',       href: '/commands/securite/service-password-encryption',mode: 'config' },
      { slug: 'configurer-ssh',            title: 'Configurer SSH',             href: '/commands/securite/configurer-ssh',            mode: 'config' },
    ],
  },
  {
    slug: 'switching',
    title: 'Switching',
    description: 'VLAN, trunks, port security et spanning tree',
    commandCount: 7,
    icon: 'layers',
    items: [
      { slug: 'creer-vlan',         title: 'Créer un VLAN',        href: '/commands/switching/creer-vlan',         mode: 'config-vlan' },
      { slug: 'attribuer-port-vlan',title: 'Attribuer port VLAN',  href: '/commands/switching/attribuer-port-vlan', mode: 'config-if' },
      { slug: 'configurer-trunk',   title: 'Configurer un trunk',  href: '/commands/switching/configurer-trunk',   mode: 'config-if' },
      { slug: 'port-security',      title: 'Port security',        href: '/commands/switching/port-security',       mode: 'config-if' },
      { slug: 'stp-bases',          title: 'Spanning Tree (bases)', href: '/commands/switching/stp-bases',          mode: 'config' },
      { slug: 'etherchannel',       title: 'EtherChannel',         href: '/commands/switching/etherchannel',        mode: 'config-if' },
      { slug: 'voice-vlan',         title: 'Voice VLAN',           href: '/commands/switching/voice-vlan',          mode: 'config-if' },
    ],
  },
  {
    slug: 'routing',
    title: 'Routing',
    description: 'Interfaces, routes statiques et protocoles dynamiques',
    commandCount: 6,
    icon: 'route',
    items: [
      { slug: 'configurer-interface',title: 'Configurer une interface',href: '/commands/routing/configurer-interface', mode: 'config-if' },
      { slug: 'route-statique',       title: 'Route statique',         href: '/commands/routing/route-statique',        mode: 'config' },
      { slug: 'route-par-defaut',     title: 'Route par défaut',       href: '/commands/routing/route-par-defaut',      mode: 'config' },
      { slug: 'rip-v2',               title: 'RIP v2',                 href: '/commands/routing/rip-v2',                mode: 'config-router' },
      { slug: 'ospf-single-area',     title: 'OSPF zone unique',       href: '/commands/routing/ospf-single-area',      mode: 'config-router' },
      { slug: 'router-on-a-stick',    title: 'Router-on-a-stick',      href: '/commands/routing/router-on-a-stick',     mode: 'config-if' },
    ],
  },
  {
    slug: 'services',
    title: 'Services',
    description: 'DHCP, NAT/PAT et services réseau',
    commandCount: 4,
    icon: 'globe',
    items: [
      { slug: 'dhcp-server',  title: 'DHCP Server',  href: '/commands/services/dhcp-server',  mode: 'config' },
      { slug: 'nat-static',   title: 'NAT statique', href: '/commands/services/nat-static',   mode: 'config' },
      { slug: 'nat-dynamic',  title: 'NAT dynamique',href: '/commands/services/nat-dynamic',  mode: 'config' },
      { slug: 'nat-pat',      title: 'NAT PAT',      href: '/commands/services/nat-pat',      mode: 'config' },
    ],
  },
  {
    slug: 'acl',
    title: 'ACL',
    description: 'Listes de contrôle d\'accès standard et étendues',
    commandCount: 4,
    icon: 'list-filter',
    items: [
      { slug: 'acl-standard', title: 'ACL standard',  href: '/commands/acl/acl-standard', mode: 'config' },
      { slug: 'acl-etendue',  title: 'ACL étendue',   href: '/commands/acl/acl-etendue',  mode: 'config' },
      { slug: 'acl-named',    title: 'ACL nommée',    href: '/commands/acl/acl-named',     mode: 'config' },
      { slug: 'appliquer-acl',title: 'Appliquer ACL', href: '/commands/acl/appliquer-acl', mode: 'config-if' },
    ],
  },
  {
    slug: 'diagnostic',
    title: 'Diagnostic',
    description: 'Commandes show, ping et traceroute pour déboguer',
    commandCount: 7,
    icon: 'activity',
    items: [
      { slug: 'show-running-config',    title: 'show running-config',      href: '/commands/diagnostic/show-running-config',     mode: 'privileged' },
      { slug: 'show-ip-interface-brief',title: 'show ip interface brief',  href: '/commands/diagnostic/show-ip-interface-brief', mode: 'privileged' },
      { slug: 'show-vlan',              title: 'show vlan',                href: '/commands/diagnostic/show-vlan',               mode: 'privileged' },
      { slug: 'show-ip-route',          title: 'show ip route',            href: '/commands/diagnostic/show-ip-route',           mode: 'privileged' },
      { slug: 'ping',                   title: 'ping',                     href: '/commands/diagnostic/ping',                    mode: 'privileged' },
      { slug: 'traceroute',             title: 'traceroute',               href: '/commands/diagnostic/traceroute',              mode: 'privileged' },
      { slug: 'debug-bases',            title: 'debug (bases)',            href: '/commands/diagnostic/debug-bases',             mode: 'privileged' },
    ],
  },
];
