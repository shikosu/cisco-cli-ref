import { cpSync, rmSync } from 'fs';
import { resolve } from 'path';
import * as pagefind from 'pagefind';

const root   = new URL('..', import.meta.url).pathname;
const distPf = resolve(root, 'dist/pagefind');
const pubPf  = resolve(root, 'public/pagefind');

console.log('[postbuild] Génération de l\'index Pagefind…');
const { index } = await pagefind.createIndex();
await index.addDirectory({ path: 'dist' });
await index.writeFiles({ outputPath: 'dist/pagefind' });
await pagefind.close();
console.log('[postbuild] Index Pagefind généré avec succès.');

/* Copie vers public/ pour que npm run dev puisse servir l'index */
try {
  rmSync(pubPf, { recursive: true, force: true });
  cpSync(distPf, pubPf, { recursive: true });
  console.log('[postbuild] Index copié dans public/pagefind/.');
} catch (err) {
  console.error('[postbuild] Erreur lors de la copie dans public/ :', err.message);
  process.exit(1);
}
