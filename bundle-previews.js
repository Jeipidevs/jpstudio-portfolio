const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(__dirname, 'public', 'previews');

const PREVIEW_MAP = {
  'bio/jpstudio': path.join(ROOT_DIR, 'ACERVO_LINK_IN_BIO', 'bio-jpstudio-tech'),
  'bio/josi': path.join(ROOT_DIR, 'ACERVO_LINK_IN_BIO', 'josi-menezes-linkinbio'),
  'bio/cozy': path.join(ROOT_DIR, 'ACERVO_LINK_IN_BIO', 'cozy-home-linkinbio'),
  'bio/henrique': path.join(ROOT_DIR, 'ACERVO_LINK_IN_BIO', 'henrique-orsato-linkinbio'),
  'bio/roberto': path.join(ROOT_DIR, 'ACERVO_LINK_IN_BIO', 'roberto-da-rosa-linkinbio'),
  'bio/vanessa': path.join(ROOT_DIR, 'ACERVO_LINK_IN_BIO', 'vanessa-de-melos-linkinbio'),
  'bio/vilagramado': path.join(ROOT_DIR, 'ACERVO_LINK_IN_BIO', 'vilagramado-linkinbio'),
  'bio/remax': path.join(ROOT_DIR, 'ACERVO_LINK_IN_BIO', 'remax-linkinbio'),

  'lp/monaco': path.join(ROOT_DIR, 'ACERVO_LANDING_PAGES', 'monaco-remax-vip'),
  'lp/sauna-reds': path.join(ROOT_DIR, 'ACERVO_LANDING_PAGES', 'sauna-reds-LP'),
  'lp/proposta-lacos': path.join(ROOT_DIR, 'ACERVO_LANDING_PAGES', 'proposta-lacos'),
  'lp/site-marco': path.join(ROOT_DIR, 'ACERVO_LANDING_PAGES', 'site-marco-remax'),
  'lp/thairon': path.join(ROOT_DIR, 'ACERVO_LANDING_PAGES', 'thairon-bio'),
  'lp/guia-litoral': path.join(ROOT_DIR, 'ACERVO_LANDING_PAGES', 'guia-imobiliario-litoral'),
  'lp/jpstudio': path.join(ROOT_DIR, 'ACERVO_LANDING_PAGES', 'jpstudio-lp'),

  'calc/proporcional': path.join(ROOT_DIR, 'calculadoras-utilitarios', 'calculadora-proporcional')
};

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (['.git', 'node_modules', '.next', 'dist', '.gemini'].includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

for (const [key, srcPath] of Object.entries(PREVIEW_MAP)) {
  const destPath = path.join(TARGET_DIR, key);
  console.log(`Copying ${key}...`);
  copyDirRecursive(srcPath, destPath);
}

console.log('✅ All static previews bundled into public/previews successfully!');
