import { readFileSync, writeFileSync } from 'fs';
let h = readFileSync('proposta-jpstudio-lacos.html', 'utf8');

// ─────────────────────────────────────────────
// HELPER: replace exact CSS string
// ─────────────────────────────────────────────
const rep = (old, neo) => {
  if (!h.includes(old)) { console.log('⚠ NOT FOUND:', old.substring(0,60)); return; }
  h = h.replaceAll(old, neo);
};

// ═════════════════════════════════════════════
// 1. CONTRASTE — cores muito transparentes
// ═════════════════════════════════════════════

// S7 items — fundo quase invisível e texto fraco
rep(
  'background: rgba(44,31,26,0.025);\n    border-radius: 3px;\n    border-left: 2px solid rgba(187,102,80,0.5);\n    margin-bottom: 5px;',
  'background: rgba(255,255,255,0.75);\n    border-radius: 4px;\n    border-left: 3px solid var(--tc);\n    margin-bottom: 6px;\n    box-shadow: 0 1px 3px rgba(44,31,26,0.06);'
);
rep(
  '    color: rgba(44,31,26,0.55);\n    line-height: 1.5;\n    padding: 5px 8px;',
  '    color: rgba(44,31,26,0.82);\n    line-height: 1.55;\n    padding: 7px 10px;'
);

// S7 block-head border
rep(
  'border-bottom: 1px solid rgba(44,31,26,0.07);',
  'border-bottom: 1px solid rgba(44,31,26,0.18);'
);

// S4 features — fundo praticamente invisível
rep(
  'background: rgba(44,31,26,0.03);\n    border-left: 3px solid var(--tc);',
  'background: rgba(255,255,255,0.65);\n    border-left: 3px solid var(--tc);\n    box-shadow: 0 1px 4px rgba(44,31,26,0.05);'
);
rep(
  '.s4-feat:hover { background: rgba(44,31,26,0.06); }',
  '.s4-feat:hover { background: rgba(255,255,255,0.9); }'
);

// S4 feat-desc fraco
rep(
  '    color: rgba(44,31,26,0.5);\n    line-height: 1.5;\n  }\n\n  .s4-insight {',
  '    color: rgba(44,31,26,0.72);\n    line-height: 1.55;\n  }\n\n  .s4-insight {'
);

// S5 cards — fundo transparente e textos fracos
rep(
  'background: rgba(255,255,255,0.5);\n    border-color: rgba(44,31,26,0.08); }',
  'background: rgba(255,255,255,0.82);\n    border-color: rgba(44,31,26,0.14); }'
);
rep(
  'background: rgba(255,255,255,0.8);\n    border-color: rgba(215,165,95,0.3);',
  'background: rgba(255,255,255,0.97);\n    border-color: rgba(215,165,95,0.45);'
);
rep(
  '    color: rgba(44,31,26,0.55);\n    line-height: 1.55;\n  }\n\n  .s5-volumes {',
  '    color: rgba(44,31,26,0.78);\n    line-height: 1.6;\n  }\n\n  .s5-volumes {'
);

// S5 vol — fundo fraco
rep(
  '    background: rgba(44,31,26,0.04);\n    border-radius: 4px;\n    border: 1px solid rgba(44,31,26,0.08);',
  '    background: rgba(255,255,255,0.72);\n    border-radius: 4px;\n    border: 1px solid rgba(44,31,26,0.15);'
);

// S2 textos fracos
rep(
  '    color: rgba(44,31,26,0.6);\n    line-height: 1.75;\n  }\n\n  .s2-right {',
  '    color: rgba(44,31,26,0.78);\n    line-height: 1.75;\n  }\n\n  .s2-right {'
);
rep(
  '.s2-item-desc { color: rgba(44,31,26,0.5);',
  '.s2-item-desc { color: rgba(44,31,26,0.68);'
);

// S2 right border fraco
rep(
  'border-top: 1px solid rgba(215,165,95,0.15);',
  'border-top: 1px solid rgba(215,165,95,0.3);'
);

// S6 desc fraco
rep(
  '    color: rgba(44,31,26,0.6);\n    line-height: 1.7;\n    margin-bottom: 14px;\n  }\n\n  .s6-feats',
  '    color: rgba(44,31,26,0.8);\n    line-height: 1.7;\n    margin-bottom: 14px;\n  }\n\n  .s6-feats'
);
rep(
  '    color: rgba(44,31,26,0.6);\n  }\n  .s6-feat::before',
  '    color: rgba(44,31,26,0.78);\n  }\n  .s6-feat::before'
);

// S9 bio fraco
rep(
  '    color: rgba(44,31,26,0.55);\n    line-height: 1.75;\n    margin-bottom: 20px;',
  '    color: rgba(44,31,26,0.78);\n    line-height: 1.75;\n    margin-bottom: 20px;'
);

// S9 stat label fraco
rep(
  '    color: rgba(44,31,26,0.4);\n    line-height: 1.3;\n  }\n\n  .s9-links',
  '    color: rgba(44,31,26,0.6);\n    line-height: 1.3;\n  }\n\n  .s9-links'
);

// Plan list text
rep(
  '    color: rgba(44,31,26,0.75);\n    display: flex; align-items: flex-start; gap: 6px;',
  '    color: rgba(44,31,26,0.85);\n    display: flex; align-items: flex-start; gap: 6px;'
);

// Nav bar — still dark bg from original (override may not be catching it)
rep(
  '    background: rgba(10,10,10,0.92);\n    backdrop-filter: blur(12px);\n    border-top: 1px solid rgba(215,165,95,0.15);',
  '    background: rgba(250,246,239,0.95);\n    backdrop-filter: blur(12px);\n    border-top: 1px solid rgba(44,31,26,0.1);'
);
rep(
  '    border: 1px solid rgba(215,165,95,0.3);\n    color: rgba(44,31,26,0.7);',
  '    border: 1px solid rgba(44,31,26,0.2);\n    color: rgba(44,31,26,0.75);'
);

// ═════════════════════════════════════════════
// 2. TAMANHOS DESKTOP — aumentar máximos dos clamp
// ═════════════════════════════════════════════

// Regra: labels/eyebrow (eram 9-10px max) → 12-13px
// Body text (era 10-12px max) → 14-16px
// Card titles (eram 11-12px max) → 16-18px
// Lead/quote (eram 13-16px max) → 18-22px

// sh-num e sh-brand
rep('font-size: clamp(9px, 1vw, 11px);', 'font-size: clamp(10px, 1vw, 13px);');
rep('font-size: clamp(8px, 0.9vw, 10px);\n    letter-spacing: 0.15em;\n    color: rgba(44,31,26,0.35)',
    'font-size: clamp(9px, 0.9vw, 11px);\n    letter-spacing: 0.15em;\n    color: rgba(44,31,26,0.35)');

// sec-label
rep('font-size: clamp(7px, 0.9vw, 10px);\n    letter-spacing: 0.22em;',
    'font-size: clamp(9px, 0.95vw, 12px);\n    letter-spacing: 0.22em;');

// s1-tag, s1-sub, s1-footer
rep('font-size: clamp(7px, 1vw, 10px);\n    letter-spacing: 0.2em;\n    color: rgba(246,203,196,0.7)',
    'font-size: clamp(9px, 1vw, 12px);\n    letter-spacing: 0.2em;\n    color: rgba(246,203,196,0.7)');
rep('font-size: clamp(7px, 1vw, 10px);\n    letter-spacing: 0.15em;\n    text-transform: uppercase;\n    color: rgba(246,203,196,0.5)',
    'font-size: clamp(9px, 1vw, 12px);\n    letter-spacing: 0.15em;\n    text-transform: uppercase;\n    color: rgba(246,203,196,0.5)');
rep('font-size: clamp(6px, 0.85vw, 9px);\n    letter-spacing: 0.14em;\n    text-transform: uppercase;\n    color: rgba(44,31,26,0.25)',
    'font-size: clamp(9px, 0.85vw, 11px);\n    letter-spacing: 0.14em;\n    text-transform: uppercase;\n    color: rgba(44,31,26,0.35)');

// s1-eyebrow
rep('font-size: clamp(7px, 1vw, 10px);\n    letter-spacing: 0.22em;\n    text-transform: uppercase;\n    color: var(--dourado-jp)',
    'font-size: clamp(9px, 1vw, 12px);\n    letter-spacing: 0.22em;\n    text-transform: uppercase;\n    color: var(--dourado-jp)');

// s1-desc
rep('font-size: clamp(8px, 1.1vw, 12px);\n    color: rgba(44,31,26,0.55);\n    line-height: 1.65;\n    max-width: 85%;',
    'font-size: clamp(11px, 1.2vw, 15px);\n    color: rgba(44,31,26,0.72);\n    line-height: 1.65;\n    max-width: 90%;');

// s1-headline
rep('font-size: clamp(17px, 2.8vw, 32px);\n    color: var(--text-dark);\n    line-height: 1.3;\n    font-weight: 400;\n    margin-bottom: 12px;',
    'font-size: clamp(20px, 3vw, 38px);\n    color: var(--text-dark);\n    line-height: 1.25;\n    font-weight: 400;\n    margin-bottom: 14px;');

// lacos-name, lacos-sub
rep('font-size: clamp(9px, 1.4vw, 15px);\n    color: var(--salmon)',
    'font-size: clamp(11px, 1.4vw, 17px);\n    color: var(--salmon)');
rep('font-size: clamp(6px, 0.85vw, 9px);\n    letter-spacing: 0.14em;\n    text-transform: uppercase;\n    color: var(--verde)',
    'font-size: clamp(9px, 0.85vw, 11px);\n    letter-spacing: 0.14em;\n    text-transform: uppercase;\n    color: var(--verde)');

// s2-lead
rep('font-size: clamp(14px, 2.2vw, 24px);\n    color: var(--text-dark);\n    line-height: 1.5;\n    margin-bottom: 14px;',
    'font-size: clamp(17px, 2.5vw, 30px);\n    color: var(--text-dark);\n    line-height: 1.45;\n    margin-bottom: 16px;');

// s2-body-text
rep('font-size: clamp(8px, 1.1vw, 12px);\n    color: rgba(44,31,26,0.78);',
    'font-size: clamp(12px, 1.2vw, 15px);\n    color: rgba(44,31,26,0.78);');

// s2-item
rep('font-size: clamp(7px, 1.1vw, 11px);\n    color: var(--text-dark);',
    'font-size: clamp(12px, 1.2vw, 15px);\n    color: var(--text-dark);');
rep('.s2-num {\n    min-width: 20px; height: 20px;\n    border-radius: 50%;\n    background: var(--tc);\n    color: var(--creme);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: clamp(6px, 0.8vw, 9px);',
    '.s2-num {\n    min-width: 22px; height: 22px;\n    border-radius: 50%;\n    background: var(--tc);\n    color: var(--creme);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: clamp(9px, 0.9vw, 11px);');

// s3-card-num
rep('font-size: clamp(28px, 4.5vw, 52px);',
    'font-size: clamp(34px, 5vw, 60px);');
// s3-card-title
rep('font-size: clamp(8px, 1.2vw, 12px);\n    color: var(--creme);\n    font-weight: 600;\n    letter-spacing: 0.04em;\n    margin-bottom: 5px;',
    'font-size: clamp(13px, 1.4vw, 17px);\n    color: var(--creme);\n    font-weight: 600;\n    letter-spacing: 0.04em;\n    margin-bottom: 6px;');
// s3-card-desc
rep('font-size: clamp(7px, 1vw, 10px);\n    color: rgba(250,246,239,0.8);',
    'font-size: clamp(11px, 1.1vw, 14px);\n    color: rgba(250,246,239,0.88);');
// s3-quote
rep('font-size: clamp(9px, 1.3vw, 13px);\n    color: rgba(44,31,26,0.6)',
    'font-size: clamp(12px, 1.4vw, 17px);\n    color: rgba(250,246,239,0.75)');

// s4-feat-title
rep('font-size: clamp(8px, 1.1vw, 11px);\n    font-weight: 600;\n    color: var(--text-dark);\n    margin-bottom: 2px;',
    'font-size: clamp(13px, 1.3vw, 16px);\n    font-weight: 600;\n    color: var(--text-dark);\n    margin-bottom: 3px;');
// s4-feat-desc
rep('font-size: clamp(7px, 0.95vw, 10px);\n    color: rgba(44,31,26,0.72);',
    'font-size: clamp(11px, 1.1vw, 14px);\n    color: rgba(44,31,26,0.72);');
// s4-insight-label
rep('font-size: clamp(6px, 0.85vw, 9px);\n    letter-spacing: 0.18em;\n    text-transform: uppercase;\n    color: var(--dourado);\n    font-weight: 600;\n    margin-bottom: 10px;',
    'font-size: clamp(9px, 0.95vw, 11px);\n    letter-spacing: 0.18em;\n    text-transform: uppercase;\n    color: var(--dourado);\n    font-weight: 600;\n    margin-bottom: 12px;');
// s4-insight-text
rep('font-size: clamp(10px, 1.5vw, 16px);\n    color: var(--creme-dark)',
    'font-size: clamp(13px, 1.7vw, 21px);\n    color: var(--creme-dark)');

// s5-icon
rep('font-size: clamp(18px, 2.8vw, 30px);\n    margin-bottom: 8px;\n    opacity: 0.7;',
    'font-size: clamp(22px, 3vw, 36px);\n    margin-bottom: 10px;\n    opacity: 0.75;');
// s5-card-title
rep('font-size: clamp(10px, 1.5vw, 16px);\n    color: var(--text-dark);\n    margin-bottom: 6px;\n    font-weight: 400;',
    'font-size: clamp(14px, 1.7vw, 21px);\n    color: var(--text-dark);\n    margin-bottom: 8px;\n    font-weight: 400;');
// s5-card-desc
rep('font-size: clamp(7px, 0.95vw, 10px);\n    color: rgba(44,31,26,0.78);',
    'font-size: clamp(11px, 1.1vw, 14px);\n    color: rgba(44,31,26,0.78);');
// s5-vol-tag
rep('font-size: clamp(6px, 0.85vw, 9px);\n    font-weight: 600;\n    color: var(--tc-light);\n    letter-spacing: 0.12em;\n    text-transform: uppercase;\n    flex-shrink: 0;',
    'font-size: clamp(10px, 1vw, 13px);\n    font-weight: 600;\n    color: var(--tc-light);\n    letter-spacing: 0.12em;\n    text-transform: uppercase;\n    flex-shrink: 0;');
// s5-vol-text
rep('font-size: clamp(7px, 1vw, 10px);\n    color: rgba(44,31,26,0.55);',
    'font-size: clamp(11px, 1.1vw, 14px);\n    color: rgba(44,31,26,0.75);');

// s6-badge
rep('font-size: clamp(6px, 0.85vw, 9px);\n    font-weight: 700;\n    letter-spacing: 0.15em;\n    text-transform: uppercase;\n    padding: 4px 12px;',
    'font-size: clamp(9px, 0.95vw, 12px);\n    font-weight: 700;\n    letter-spacing: 0.15em;\n    text-transform: uppercase;\n    padding: 5px 14px;');
// s6-mock-name
rep('font-size: clamp(8px, 1.2vw, 12px);\n    font-weight: 600;\n    color: var(--creme)',
    'font-size: clamp(12px, 1.4vw, 17px);\n    font-weight: 600;\n    color: var(--creme)');
// s6-mock-role
rep("font-size: clamp(6px, 0.85vw, 9px);\n    color: rgba(250,246,239,0.45) !important;",
    "font-size: clamp(10px, 1vw, 13px);\n    color: rgba(250,246,239,0.55) !important;");
// s6-mock-btn
rep('font-size: clamp(6px, 0.9vw, 9px);\n    color: rgba(250,246,239,0.75) !important;',
    'font-size: clamp(10px, 1vw, 13px);\n    color: rgba(250,246,239,0.82) !important;');
// s6-price
rep('font-size: clamp(24px, 4vw, 46px);\n    color: var(--tc-dark);',
    'font-size: clamp(30px, 4.5vw, 54px);\n    color: var(--tc-dark);');
// s6-period
rep('font-size: clamp(7px, 0.9vw, 10px);\n    letter-spacing: 0.14em;\n    text-transform: uppercase;\n    color: rgba(44,31,26,0.35);\n    margin-top: 2px;',
    'font-size: clamp(10px, 1vw, 12px);\n    letter-spacing: 0.14em;\n    text-transform: uppercase;\n    color: rgba(44,31,26,0.5);\n    margin-top: 3px;');
// s6-desc
rep('font-size: clamp(8px, 1.1vw, 11px);\n    color: rgba(44,31,26,0.8);',
    'font-size: clamp(11px, 1.2vw, 15px);\n    color: rgba(44,31,26,0.8);');
// s6-feat
rep('font-size: clamp(7px, 1vw, 10px);\n    color: rgba(44,31,26,0.78);',
    'font-size: clamp(11px, 1.1vw, 14px);\n    color: rgba(44,31,26,0.78);');

// s7-block-title
rep('font-size: clamp(7px, 1.1vw, 11px);\n    font-weight: 600;\n    color: var(--text-dark);',
    'font-size: clamp(13px, 1.3vw, 17px);\n    font-weight: 600;\n    color: var(--text-dark);');
// s7-item
rep('    color: rgba(44,31,26,0.82);\n    line-height: 1.55;\n    padding: 7px 10px;',
    '    color: rgba(44,31,26,0.85);\n    line-height: 1.55;\n    padding: 8px 12px;');
// s7-item font-size
rep('    font-size: clamp(6px, 0.9vw, 10px);\n    color: rgba(44,31,26,0.85);',
    '    font-size: clamp(11px, 1.1vw, 14px);\n    color: rgba(44,31,26,0.85);');
// s7-cta-text
rep('font-size: clamp(8px, 1.2vw, 13px);\n    color: var(--creme);',
    'font-size: clamp(12px, 1.4vw, 18px);\n    color: var(--creme);');

// plan elements
rep('font-size: clamp(6px, 0.85vw, 9px);\n    letter-spacing: 0.15em;\n    text-transform: uppercase;\n    color: var(--dourado);\n    font-weight: 600;\n  }',
    'font-size: clamp(9px, 0.95vw, 12px);\n    letter-spacing: 0.15em;\n    text-transform: uppercase;\n    color: var(--dourado);\n    font-weight: 600;\n  }');
rep('font-size: clamp(14px, 2.2vw, 24px);\n    color: var(--text-dark);\n    font-weight: 400;\n    line-height: 1.1;',
    'font-size: clamp(18px, 2.5vw, 30px);\n    color: var(--text-dark);\n    font-weight: 400;\n    line-height: 1.1;');
rep('font-size: clamp(6px, 0.85vw, 9px);\n    text-transform: uppercase;\n    letter-spacing: 0.1em;\n    color: rgba(44,31,26,0.4);\n    margin-top: -6px;',
    'font-size: clamp(9px, 0.95vw, 11px);\n    text-transform: uppercase;\n    letter-spacing: 0.1em;\n    color: rgba(44,31,26,0.5);\n    margin-top: -4px;');
rep('    color: rgba(44,31,26,0.85);\n    display: flex; align-items: flex-start; gap: 6px;',
    '    color: rgba(44,31,26,0.88);\n    display: flex; align-items: flex-start; gap: 7px;');
rep('font-size: clamp(6px, 0.9vw, 10px);\n    color: rgba(44,31,26,0.88);',
    'font-size: clamp(11px, 1.1vw, 14px);\n    color: rgba(44,31,26,0.88);');
rep('font-size: clamp(6px, 0.85vw, 9px);\n    color: rgba(44,31,26,0.4);\n    font-style: italic;\n    text-align: center;\n    margin-top: auto;',
    'font-size: clamp(9px, 0.95vw, 11px);\n    color: rgba(44,31,26,0.5);\n    font-style: italic;\n    text-align: center;\n    margin-top: auto;');

// s9-photo-name/role
rep('font-size: clamp(12px, 1.8vw, 20px);\n    color: var(--creme);\n    font-weight: 400;\n    margin-bottom: 3px;',
    'font-size: clamp(14px, 2vw, 24px);\n    color: var(--creme);\n    font-weight: 400;\n    margin-bottom: 4px;');
rep('font-size: clamp(6px, 0.85vw, 9px);\n    letter-spacing: 0.12em;\n    text-transform: uppercase;\n    color: var(--dourado);\n    font-weight: 500;',
    'font-size: clamp(9px, 0.95vw, 11px);\n    letter-spacing: 0.12em;\n    text-transform: uppercase;\n    color: var(--dourado);\n    font-weight: 500;');
// s9-bio
rep('font-size: clamp(8px, 1.1vw, 12px);\n    color: rgba(44,31,26,0.78);\n    line-height: 1.75;',
    'font-size: clamp(12px, 1.2vw, 16px);\n    color: rgba(44,31,26,0.78);\n    line-height: 1.75;');
// s9-stat-val
rep('font-size: clamp(13px, 2vw, 22px);\n    color: var(--tc);\n    font-weight: 400;\n    line-height: 1;\n    margin-bottom: 4px;',
    'font-size: clamp(16px, 2.2vw, 26px);\n    color: var(--tc);\n    font-weight: 400;\n    line-height: 1;\n    margin-bottom: 4px;');
// s9-stat-lbl
rep('font-size: clamp(5px, 0.8vw, 8px);\n    letter-spacing: 0.1em;\n    text-transform: uppercase;\n    color: rgba(44,31,26,0.6);',
    'font-size: clamp(9px, 0.9vw, 11px);\n    letter-spacing: 0.1em;\n    text-transform: uppercase;\n    color: rgba(44,31,26,0.6);');
// s9-link
rep('font-size: clamp(7px, 1vw, 10px);\n    color: var(--tc-light);\n    text-decoration: none;\n    letter-spacing: 0.06em;',
    'font-size: clamp(11px, 1.1vw, 14px);\n    color: var(--tc-light);\n    text-decoration: none;\n    letter-spacing: 0.06em;');
// s9-quote
rep('font-size: clamp(16px, 2.6vw, 30px);\n    color: var(--text-dark);\n    line-height: 1.25;',
    'font-size: clamp(19px, 2.8vw, 36px);\n    color: var(--text-dark);\n    line-height: 1.2;');

// s10 sizes
rep('font-size: clamp(7px, 0.9vw, 10px);\n    letter-spacing: 0.25em;\n    text-transform: uppercase;\n    color: var(--dourado);\n    font-weight: 600;\n    margin-bottom: 18px;\n    position: relative;',
    'font-size: clamp(10px, 1vw, 13px);\n    letter-spacing: 0.25em;\n    text-transform: uppercase;\n    color: var(--dourado);\n    font-weight: 600;\n    margin-bottom: 20px;\n    position: relative;');
rep('font-size: clamp(9px, 1.2vw, 13px);\n    color: rgba(250,246,239,0.75);\n    line-height: 1.65;\n    max-width: 500px;\n    margin-bottom: 30px;',
    'font-size: clamp(12px, 1.3vw, 16px);\n    color: rgba(250,246,239,0.78);\n    line-height: 1.65;\n    max-width: 520px;\n    margin-bottom: 34px;');
rep('font-size: clamp(8px, 1vw, 11px);\n    font-weight: 700;\n    letter-spacing: 0.15em;\n    text-transform: uppercase;',
    'font-size: clamp(11px, 1.1vw, 14px);\n    font-weight: 700;\n    letter-spacing: 0.15em;\n    text-transform: uppercase;');
rep('font-size: clamp(8px, 1vw, 11px);\n    color: rgba(250,246,239,0.8);\n    text-decoration: none;\n    letter-spacing: 0.08em;\n    border-bottom: 1px solid rgba(250,246,239,0.35);',
    'font-size: clamp(11px, 1.1vw, 14px);\n    color: rgba(250,246,239,0.82);\n    text-decoration: none;\n    letter-spacing: 0.08em;\n    border-bottom: 1px solid rgba(250,246,239,0.35);');
rep('font-size: clamp(8px, 1.2vw, 12px);\n    color: rgba(250,246,239,0.5);',
    'font-size: clamp(11px, 1.2vw, 14px);\n    color: rgba(250,246,239,0.6);');
rep('font-size: clamp(6px, 0.85vw, 9px);\n    letter-spacing: 0.1em;\n    text-transform: uppercase;\n    color: rgba(250,246,239,0.4);',
    'font-size: clamp(9px, 0.95vw, 12px);\n    letter-spacing: 0.1em;\n    text-transform: uppercase;\n    color: rgba(250,246,239,0.5);');

// ═════════════════════════════════════════════
// 3. PADDING — cards precisam de mais espaço
// ═════════════════════════════════════════════
rep('padding: clamp(12px, 2vw, 22px);\n    border-radius: 4px;',
    'padding: clamp(16px, 2.2vw, 28px);\n    border-radius: 4px;');
rep('padding: clamp(12px, 2vw, 20px);',
    'padding: clamp(16px, 2.2vw, 26px);');
rep('padding: clamp(14px, 2.5vw, 26px);',
    'padding: clamp(18px, 2.8vw, 32px);');

// s4-feat gap
rep('    gap: 14px;\n    padding: 10px 14px;\n    background: rgba(255,255,255,0.65);',
    '    gap: 16px;\n    padding: 14px 18px;\n    background: rgba(255,255,255,0.65);');

writeFileSync('proposta-jpstudio-lacos.html', h, 'utf8');
console.log('All fixes applied. File size:', h.length, 'chars');
