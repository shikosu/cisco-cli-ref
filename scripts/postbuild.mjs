/**
 * postbuild.mjs — génération de l'index Pagefind après astro build
 *
 * 1. Pagefind scanne dist/ et génère dist/pagefind/ (JS + index).
 * 2. L'index est copié dans public/pagefind/ pour être disponible
 *    aussi en mode dev (npm run dev), après un premier build.
 */
import { execSync } from 'child_process';
import { cpSync, rmSync } from 'fs';
import { resolve } from 'path';

const root    = new URL('..', import.meta.url).pathname;
const distPf  = resolve(root, 'dist/pagefind');
const pubPf   = resolve(root, 'public/pagefind');

console.log('[postbuild] Génération de l\'index Pagefind…');
try {
  execSync('./node_modules/.bin/pagefind --site dist', { stdio: 'inherit' });
  console.log('[postbuild] Index Pagefind généré avec succès.');
} catch (err) {
  console.error('[postbuild] Erreur Pagefind :', err.message);
  process.exit(1);
}

/* Copie vers public/ pour que npm run dev puisse servir l'index */
try {
  rmSync(pubPf, { recursive: true, force: true });
  cpSync(distPf, pubPf, { recursive: true });
  console.log('[postbuild] Index copié dans public/pagefind/.');
} catch (err) {
  console.error('[postbuild] Erreur lors de la copie dans public/ :', err.message);
  process.exit(1);
}
