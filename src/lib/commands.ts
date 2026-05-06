/**
 * Helpers pour la collection 'commands'
 * Utilisés par les pages dynamiques et les composants de navigation.
 */
import { getCollection } from 'astro:content';
import { NAV_CATEGORIES } from './nav';

/** Toutes les commandes, triées par catégorie puis par ordre de slug */
export async function getAllCommands() {
  return getCollection('commands');
}

/** Commandes filtrées par catégorie */
export async function getCommandsByCategory(category: string) {
  return getCollection('commands', ({ data }) => data.category === category);
}

/**
 * Résolution des commandes liées depuis leurs slugs (ex: 'bases/configurer-hostname')
 *
 * Pour chaque slug :
 * - Si une fiche MDX existe → retourne ses données + href
 * - Sinon → retourne les données du nav.ts (titre, href) avec available=false
 */
export async function getRelated(slugs: string[]) {
  const allCommands = await getCollection('commands');
  const cmdMap = new Map(allCommands.map(cmd => [cmd.id, cmd]));

  return slugs.map(slug => {
    const cmd = cmdMap.get(slug);
    if (cmd) {
      return {
        slug,
        title: cmd.data.title,
        href:  `/commands/${slug}`,
        available: true,
      };
    }
    /* Fallback sur les données statiques du nav */
    const [catSlug, itemSlug] = slug.split('/');
    const cat  = NAV_CATEGORIES.find(c => c.slug === catSlug);
    const item = cat?.items.find(i => i.slug === itemSlug);
    return {
      slug,
      title:     item?.title ?? slug,
      href:      `/commands/${slug}`,
      available: false,
    };
  });
}

/** IDs de toutes les fiches disponibles (pour marquer les liens du nav) */
export async function getAvailableIds(): Promise<Set<string>> {
  const commands = await getCollection('commands');
  return new Set(commands.map(cmd => cmd.id));
}
