/**
 * theme.ts — utilitaires thème clair ↔ sombre
 *
 * L'initialisation au premier chargement est gérée par le script anti-flash
 * inline dans Layout.astro. Ce module gère le toggle et la persistance.
 */

/** Retourne le thème actif. */
export function getCurrentTheme(): 'light' | 'dark' {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** Bascule le thème et persiste dans localStorage. */
export function toggleTheme(): void {
  const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* accès localStorage interdit (mode privé strict) */
  }
}
