/**
 * search.ts — wrapper Pagefind (chargement différé)
 *
 * Le bundle Pagefind est généré dans dist/pagefind/ après le build.
 * En mode dev, initSearch() retourne false silencieusement.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
let pf: any = null;

/** Charge et initialise Pagefind une seule fois. Retourne false si indisponible. */
export async function initSearch(): Promise<boolean> {
  if (pf) return true;
  try {
    pf = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
    await pf.init();
    return true;
  } catch {
    return false;
  }
}

export interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
}

/** Lance une recherche et retourne les 8 premiers résultats. */
export async function search(query: string): Promise<SearchResult[]> {
  const ready = await initSearch();
  if (!ready || !query.trim()) return [];

  const raw = await pf.search(query);
  const data: any[] = await Promise.all(
    raw.results.slice(0, 8).map((r: any) => r.data())
  );

  return data.map((d) => ({
    url: d.url as string,
    title: (d.meta?.title ?? d.url) as string,
    excerpt: (d.excerpt ?? '') as string,
  }));
}
