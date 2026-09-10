import { readFileSync, writeFileSync } from 'fs';
let h = readFileSync('proposta-jpstudio-lacos.html', 'utf8');

const rep = (old, neo) => {
  if (!h.includes(old)) { console.log('⚠ NOT FOUND:', old.substring(0,80)); return; }
  h = h.replaceAll(old, neo);
  console.log('✓', old.substring(0,60));
};

// --- NAV BAR: dark → cream ---
rep(
  'background: rgba(10,10,10,0.92);\n    backdrop-filter: blur(12px);',
  'background: rgba(250,246,239,0.96);\n    backdrop-filter: blur(12px);'
);
// Nav text colors (dark bg assumption)
rep('color: rgba(245,235,215,0.85)', 'color: rgba(44,31,26,0.85)');
rep('color: rgba(245,235,215,0.6)', 'color: rgba(44,31,26,0.6)');

// --- S5-CARD: near-invisible → white ---
rep(
  '.s5-card {\n    background: rgba(44,31,26,0.03);\n    border: 1px solid rgba(44,31,26,0.07);',
  '.s5-card {\n    background: rgba(255,255,255,0.80);\n    border: 1px solid rgba(44,31,26,0.10);'
);

// --- FONT SIZE INCREASES: boost all small maxes ---
// Very small labels (max 10px → 14px)
h = h.replaceAll('clamp(7px, 1vw, 10px)', 'clamp(10px, 1vw, 14px)');
h = h.replaceAll('clamp(9px, 0.85vw, 11px)', 'clamp(11px, 1vw, 15px)');
h = h.replaceAll('clamp(9px, 0.9vw, 11px)', 'clamp(11px, 1vw, 15px)');
h = h.replaceAll('clamp(9px, 0.95vw, 11px)', 'clamp(11px, 1vw, 15px)');
h = h.replaceAll('clamp(9px, 0.95vw, 12px)', 'clamp(11px, 1vw, 15px)');
h = h.replaceAll('clamp(9px, 1vw, 12px)', 'clamp(11px, 1.1vw, 15px)');
// Body text
h = h.replaceAll('clamp(10px, 1vw, 13px)', 'clamp(12px, 1.1vw, 16px)');
h = h.replaceAll('clamp(11px, 1.1vw, 14px)', 'clamp(13px, 1.2vw, 17px)');
h = h.replaceAll('clamp(11px, 1.2vw, 15px)', 'clamp(13px, 1.3vw, 18px)');
h = h.replaceAll('clamp(11px, 1.4vw, 17px)', 'clamp(13px, 1.5vw, 19px)');
h = h.replaceAll('clamp(12px, 1.2vw, 15px)', 'clamp(14px, 1.3vw, 18px)');
h = h.replaceAll('clamp(12px, 1.4vw, 17px)', 'clamp(14px, 1.5vw, 20px)');
h = h.replaceAll('clamp(13px, 1.3vw, 16px)', 'clamp(14px, 1.4vw, 19px)');
h = h.replaceAll('clamp(13px, 1.4vw, 17px)', 'clamp(14px, 1.5vw, 20px)');
h = h.replaceAll('clamp(13px, 1.7vw, 21px)', 'clamp(15px, 1.8vw, 24px)');
h = h.replaceAll('clamp(14px, 1.7vw, 21px)', 'clamp(16px, 1.8vw, 24px)');
// Sub-titles / card titles
h = h.replaceAll('clamp(17px, 2.5vw, 30px)', 'clamp(19px, 2.7vw, 34px)');
h = h.replaceAll('clamp(20px, 3.2vw, 38px)', 'clamp(22px, 3.4vw, 42px)');

console.log('Done. File size:', h.length);
writeFileSync('proposta-jpstudio-lacos.html', h, 'utf8');
