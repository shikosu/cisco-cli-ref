/**
 * postbuild.mjs — génération de l'index Pagefind après astro build
 *
 * Pagefind scanne dist/ et génère dist/pagefind/ (JS + index).
 * Ce script est appelé par `npm run build` après `astro build`.
 */
import { execSync } from 'child_process';

console.log('[postbuild] Génération de l\'index Pagefind…');
try {
  execSync('npx pagefind --site dist', { stdio: 'inherit' });
  console.log('[postbuild] Index Pagefind généré avec succès.');
} catch (err) {
  console.error('[postbuild] Erreur Pagefind :', err.message);
  process.exit(1);
}
