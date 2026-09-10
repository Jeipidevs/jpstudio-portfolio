# Vila Gramado Link in Bio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static link-in-bio page for Vila Gramado, replicating the architecture of `henrique-orsato-mkt`/`roberto-da-rosa-mkt` (Nginx + Docker, no build step), themed with the Vila Gramado brand and real property photos.

**Architecture:** Single static `index.html` + `assets/css/styles.css`, served by Nginx in a Docker container (EasyPanel-ready). No JS framework — vanilla HTML/CSS with a tiny inline reveal-on-scroll script, matching the reference sites exactly.

**Tech Stack:** HTML5, CSS (custom properties, no preprocessor), Nginx (alpine), Docker. Python 3 + Pillow (already installed, confirmed via `python3 -c "from PIL import Image"`) used one-off during implementation to crop/resize source photos — not a runtime dependency.

## Global Constraints

- Domain: `vilagramado.jpstudio.tech` (provisional) — used in canonical, OG/Twitter tags, JSON-LD `@id`/`url`, `robots.txt`, `sitemap.xml`.
- WhatsApp: `+55 51 99772-7880` → `wa.me/5551997727880`.
- Instagram: `https://www.instagram.com/vilagramado/`.
- Google Meu Negócio: `https://share.google/rdDEtYUKOtpFHwJcT`.
- Site institucional (link secundário, não substituído): `https://vilagramado.com.br/`.
- Palette: `#1F2E22` (verde-floresta, base escura), `#0D0D0D` (preto fosco), `#5B8C7B` (verde-sálvia), `#3E6B8A` (azul-lago), `#C9995B` (dourado/pele, acento).
- Tom de voz: "Anfitrião Caloroso" — caloroso, emotivo, foco no benefício emocional, não "consultor premium".
- Não inventar categorias/preços de cabana nem afirmar amenidades não confirmadas no brief (ex.: não afirmar "café da manhã incluso" como política de cobrança).
- Nunca fazer deploy/push real sem confirmação explícita do dono (regra global) — este plano cobre só a implementação local.
- Fonte de imagens: `C:\Projetos\vilagramado\imagens-marca\` (arquivos: `logo_vilagramado.png`, `panorama_complexo_lago.jpg` 1263×709, `fileira_cabanas_hidro.jpg` 1262×709, `deck_hortensias_lago.jpg` 618×615, `deck_panoramico_lago.jpg` 614×614, `cabana_aframe_dia.jpg` 616×615, `vista_noturna_iluminada.jpg` 614×614).

---

### Task 1: Prepare image assets

**Files:**
- Create: `C:\Projetos\vilagramado\site\assets\img\logo.png`
- Create: `C:\Projetos\vilagramado\site\assets\img\favicon-512.png`
- Create: `C:\Projetos\vilagramado\site\assets\img\apple-touch-icon.png`
- Create: `C:\Projetos\vilagramado\site\favicon.ico`
- Create: `C:\Projetos\vilagramado\site\assets\img\hero-bg.jpg`
- Create: `C:\Projetos\vilagramado\site\assets\img\og-image.jpg`
- Create: `C:\Projetos\vilagramado\site\assets\img\exp-casal.jpg`
- Create: `C:\Projetos\vilagramado\site\assets\img\exp-lago.jpg`
- Create: `C:\Projetos\vilagramado\site\assets\img\exp-natureza.jpg`

**Interfaces:**
- Produces: the exact filenames above, referenced by `index.html`/`404.html`/`site.webmanifest` in Task 4/5.

- [ ] **Step 1: Run the Pillow script to generate every asset**

Run this from `C:\Projetos\vilagramado\site`:

```bash
python3 - <<'PY'
from PIL import Image, ImageOps
import os

SRC = r"C:\Projetos\vilagramado\imagens-marca"
DST = r"C:\Projetos\vilagramado\site\assets\img"
os.makedirs(DST, exist_ok=True)

# --- 1. Logo: make the white background transparent ---
logo = Image.open(os.path.join(SRC, "logo_vilagramado.png")).convert("RGBA")
datas = logo.getdata()
new_data = []
for r, g, b, a in datas:
    if r > 245 and g > 245 and b > 245:
        new_data.append((r, g, b, 0))
    else:
        new_data.append((r, g, b, a))
logo.putdata(new_data)
logo.save(os.path.join(DST, "logo.png"))

# --- 2. Favicon-512 / apple-touch-icon: logo composited on solid forest-green circle ---
def badge(size):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    from PIL import ImageDraw
    draw = ImageDraw.Draw(canvas)
    draw.ellipse((0, 0, size, size), fill=(31, 46, 34, 255))  # #1F2E22
    pad = int(size * 0.08)
    fitted = ImageOps.contain(logo, (size - pad * 2, size - pad * 2))
    x = (size - fitted.width) // 2
    y = (size - fitted.height) // 2
    canvas.paste(fitted, (x, y), fitted)
    return canvas

badge(512).save(os.path.join(DST, "favicon-512.png"))
badge(180).save(os.path.join(DST, "apple-touch-icon.png"))

favicon_sizes = [(16, 16), (32, 32), (48, 48)]
badge(64).save(r"C:\Projetos\vilagramado\site\favicon.ico", sizes=favicon_sizes)

# --- 3. Hero background: panorama, resized for full-bleed use ---
panorama = Image.open(os.path.join(SRC, "panorama_complexo_lago.jpg")).convert("RGB")
hero = ImageOps.fit(panorama, (1600, 900), method=Image.LANCZOS)
hero.save(os.path.join(DST, "hero-bg.jpg"), quality=82)

# --- 4. OG image: 1200x630 crop of the same panorama ---
og = ImageOps.fit(panorama, (1200, 630), method=Image.LANCZOS)
og.save(os.path.join(DST, "og-image.jpg"), quality=85)

# --- 5. Experience cards: square crops from the three themed photos ---
pairs = [
    ("deck_hortensias_lago.jpg", "exp-casal.jpg"),
    ("deck_panoramico_lago.jpg", "exp-lago.jpg"),
    ("cabana_aframe_dia.jpg", "exp-natureza.jpg"),
]
for src_name, dst_name in pairs:
    im = Image.open(os.path.join(SRC, src_name)).convert("RGB")
    sq = ImageOps.fit(im, (700, 700), method=Image.LANCZOS)
    sq.save(os.path.join(DST, dst_name), quality=85)

print("done")
PY
```

Expected: prints `done`, no traceback.

- [ ] **Step 2: Verify every file was created**

Run: `ls -la "C:\Projetos\vilagramado\site\assets\img" "C:\Projetos\vilagramado\site\favicon.ico"`

Expected: `logo.png`, `favicon-512.png`, `apple-touch-icon.png`, `hero-bg.jpg`, `og-image.jpg`,
`exp-casal.jpg`, `exp-lago.jpg`, `exp-natureza.jpg` all present with non-zero size; `favicon.ico`
present in the `site/` root.

- [ ] **Step 3: Commit**

```bash
cd "C:\Projetos\vilagramado\site"
git add assets/img favicon.ico
git commit -m "assets: gera imagens processadas da Vila Gramado (logo, hero, og-image, experiências)"
```

---

### Task 2: Project scaffolding (Docker, Nginx, SEO files)

**Files:**
- Create: `C:\Projetos\vilagramado\site\Dockerfile`
- Create: `C:\Projetos\vilagramado\site\nginx.conf`
- Create: `C:\Projetos\vilagramado\site\.gitignore`
- Create: `C:\Projetos\vilagramado\site\.dockerignore`
- Create: `C:\Projetos\vilagramado\site\robots.txt`
- Create: `C:\Projetos\vilagramado\site\sitemap.xml`
- Create: `C:\Projetos\vilagramado\site\site.webmanifest`

**Interfaces:**
- Consumes: `assets/img/favicon-512.png`, `assets/img/apple-touch-icon.png` (Task 1).
- Produces: container build/runtime config used in Task 6 verification.

- [ ] **Step 1: Write `Dockerfile`**

```dockerfile
# Página estática (link in bio) servida por Nginx — pronta para EasyPanel
FROM nginx:1.27-alpine

# Configuração do servidor (cache, gzip, headers de segurança)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Arquivos do site
COPY . /usr/share/nginx/html

# Limpa arquivos que não devem ir para a web root
RUN rm -rf /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/.dockerignore \
          /usr/share/nginx/html/.gitignore \
          /usr/share/nginx/html/README.md \
          /usr/share/nginx/html/docs

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

- [ ] **Step 2: Write `nginx.conf`**

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  _;

    root   /usr/share/nginx/html;
    index  index.html;

    # --- Compressão ---
    gzip              on;
    gzip_vary         on;
    gzip_comp_level   6;
    gzip_min_length   256;
    gzip_proxied      any;
    gzip_types        text/plain text/css application/javascript application/json
                      image/svg+xml application/manifest+json application/xml;

    # NOTA: no nginx, um bloco location que declara `add_header` NÃO herda os
    # add_header de fora — por isso os headers de segurança são repetidos em
    # cada location abaixo (em vez de ficarem só no nível do server).

    # --- Assets estáticos: cache longo e imutável ---
    location ~* \.(?:css|js|webp|png|jpe?g|gif|ico|svg|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable" always;
        add_header X-Content-Type-Options "nosniff"                    always;
        add_header X-Frame-Options        "SAMEORIGIN"                 always;
        add_header Referrer-Policy        "strict-origin-when-cross-origin" always;
        add_header Permissions-Policy     "geolocation=(), microphone=(), camera=()" always;
        access_log off;
    }

    # --- Manifesto PWA: MIME correto ---
    location = /site.webmanifest {
        default_type application/manifest+json;
        add_header Cache-Control "public, max-age=86400"               always;
        add_header X-Content-Type-Options "nosniff"                    always;
        add_header X-Frame-Options        "SAMEORIGIN"                 always;
        add_header Referrer-Policy        "strict-origin-when-cross-origin" always;
        add_header Permissions-Policy     "geolocation=(), microphone=(), camera=()" always;
    }

    # --- HTML e demais rotas: sempre revalidado + headers de segurança ---
    location / {
        try_files $uri $uri/ =404;
        add_header Cache-Control "no-cache"                            always;
        add_header X-Content-Type-Options "nosniff"                    always;
        add_header X-Frame-Options        "SAMEORIGIN"                 always;
        add_header Referrer-Policy        "strict-origin-when-cross-origin" always;
        add_header Permissions-Policy     "geolocation=(), microphone=(), camera=()" always;
    }

    error_page 404 /404.html;
}
```

- [ ] **Step 3: Write `.gitignore`**

```gitignore
# OS
.DS_Store
Thumbs.db

# Editores
.vscode/
.idea/

# Scratch / build
work/
node_modules/
*.log
```

- [ ] **Step 4: Write `.dockerignore`**

```dockerignore
.git
.gitignore
*.md
work/
*.psd
.DS_Store
Thumbs.db
docs/
```

- [ ] **Step 5: Write `robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://vilagramado.jpstudio.tech/sitemap.xml
```

- [ ] **Step 6: Write `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vilagramado.jpstudio.tech/</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 7: Write `site.webmanifest`**

```json
{
  "name": "Vila Gramado — Cabanas na Serra Gaúcha",
  "short_name": "Vila Gramado",
  "description": "Mais que hospedagem, somos experiência! Cabanas de luxo em Gramado/RS, com hidro privativa e vista para o lago. Reserve pelo WhatsApp.",
  "lang": "pt-BR",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#F6F2EA",
  "theme_color": "#1F2E22",
  "icons": [
    { "src": "/assets/img/favicon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/assets/img/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
```

- [ ] **Step 8: Commit**

```bash
cd "C:\Projetos\vilagramado\site"
git add Dockerfile nginx.conf .gitignore .dockerignore robots.txt sitemap.xml site.webmanifest
git commit -m "chore: scaffolding Docker/Nginx/SEO para o site da Vila Gramado"
```

---

### Task 3: Brand stylesheet

**Files:**
- Create: `C:\Projetos\vilagramado\site\assets\css\styles.css`

**Interfaces:**
- Consumes: nothing (pure CSS).
- Produces: class names relied on by `index.html`/`404.html` in Task 4/5 — notably `.hero`, `.hero-photo`, `.badges`, `.badge`, `.btn`, `.btn-wa`, `.btn-outline`, `.links`, `.link-card`, `.sec-head`, `.exp-grid`, `.exp-card`, `.exp-card.highlight`, `.about`, `.chips`, `.chip`, `.foot`, `.sticky-cta`, `.reveal`.

- [ ] **Step 1: Write `assets/css/styles.css`**

```css
/* =================================================================
   Vila Gramado — Cabanas na Serra Gaúcha · Link in bio
   Paleta da marca:
   verde-floresta #1F2E22 · preto fosco #0D0D0D
   verde-sálvia #5B8C7B · azul-lago #3E6B8A · dourado/pele #C9995B
   Tipografia: Poppins (títulos) + Inter (corpo)
================================================================= */

:root {
  --forest:       #1F2E22;
  --forest-deep:  #131E16;
  --forest-soft:  #2A3F2E;
  --black:        #0D0D0D;
  --sage:         #5B8C7B;
  --lake:         #3E6B8A;
  --gold:         #C9995B;
  --gold-deep:    #A97B3F;
  --gold-soft:    #DCB682;
  --cream:        #F6F2EA;
  --cream-card:   #FCFAF5;
  --cream-line:   #E8E0D0;
  --ink:          #2B2B26;
  --ink-soft:     #6B6A5E;
  --white:        #ffffff;
  --wa:           #25D366;

  --radius:       18px;
  --radius-lg:    26px;
  --radius-pill:  999px;
  --shadow-sm:    0 2px 10px rgba(13,13,13,.08);
  --shadow:       0 10px 30px -12px rgba(31,46,34,.28), 0 4px 12px rgba(13,13,13,.06);
  --shadow-lg:    0 24px 60px -20px rgba(19,30,22,.45);
  --ring:         0 0 0 3px rgba(201,153,91,.45);

  --maxw:         600px;
  --ease:         cubic-bezier(.22,.61,.36,1);

  --ff-head: "Poppins", "Segoe UI", sans-serif;
  --ff-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* ---------- Reset ---------- */
*,*::before,*::after { box-sizing: border-box; }
* { margin: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; overflow-x: hidden; }
body {
  font-family: var(--ff-body);
  color: var(--ink);
  background: var(--cream);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
  width: 100%;
}
img { max-width: 100%; display: block; height: auto; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; }
:focus-visible { outline: none; box-shadow: var(--ring); border-radius: 12px; }
ul { list-style: none; padding: 0; }

/* ---------- Ambient background ---------- */
.bg-ambient {
  position: fixed; inset: 0; z-index: -2; overflow: hidden;
  background:
    radial-gradient(1100px 700px at 50% -8%, rgba(91,140,123,.14), transparent 60%),
    radial-gradient(900px 600px at 105% 12%, rgba(201,153,91,.16), transparent 55%),
    radial-gradient(800px 700px at -10% 60%, rgba(62,107,138,.10), transparent 55%),
    var(--cream);
}

/* ---------- Layout ---------- */
.shell { width: 100%; max-width: var(--maxw); margin: 0 auto; padding: 0 20px 120px; }
@media (min-width: 640px){ .shell { padding-bottom: 64px; } }
section { margin-top: 38px; }

/* ---------- Hero (full-bleed photo) ---------- */
.hero { position: relative; text-align: center; margin: 0 -20px; padding: 34px 20px 30px; overflow: hidden; }
.hero-photo {
  position: absolute; inset: 0; z-index: -1;
  background-image: linear-gradient(180deg, rgba(13,13,13,.35) 0%, rgba(19,30,22,.55) 55%, var(--cream) 96%),
    url("/assets/img/hero-bg.jpg");
  background-size: cover; background-position: center;
}
.brandmark { display:flex; justify-content:center; margin-bottom: 14px; }
.brandmark img { width: 88px; height: 88px; filter: drop-shadow(0 8px 18px rgba(0,0,0,.35)); }

.eyebrow {
  font-size: .74rem; letter-spacing: .22em; text-transform: uppercase;
  color: var(--gold-soft); font-weight: 600; margin-bottom: 8px;
}
.hero h1 { font-family: var(--ff-head); font-weight: 700; color: var(--white);
  font-size: clamp(2.1rem, 8vw, 2.9rem); line-height: 1.04; letter-spacing: -.01em;
  text-shadow: 0 4px 18px rgba(0,0,0,.35); }
.hero .role { margin-top: 10px; font-size: 1.02rem; color: var(--white); font-weight: 500; }
.hero .role b { color: var(--gold-soft); font-weight: 700; }
.hero .tagline { margin-top: 12px; color: rgba(255,255,255,.85); font-size: .98rem; max-width: 40ch;
  margin-inline: auto; }

/* ---------- Badges ---------- */
.badges { display:flex; flex-wrap:wrap; gap: 8px; justify-content:center; margin-top: 20px; }
.badge {
  display:inline-flex; align-items:center; gap:7px;
  background: rgba(252,250,245,.92); border: 1px solid var(--cream-line);
  color: var(--forest-deep); font-size: .8rem; font-weight: 600;
  padding: 7px 13px; border-radius: var(--radius-pill); box-shadow: var(--shadow-sm);
}
.badge svg { width: 15px; height: 15px; color: var(--gold-deep); }

/* ---------- Buttons / link cards ---------- */
.cta-wrap { margin-top: 6px; }
.btn {
  display:flex; align-items:center; justify-content:center; gap: 11px;
  width:100%; padding: 17px 22px; border:none; border-radius: var(--radius);
  font-weight: 700; font-size: 1.05rem; letter-spacing: .01em;
  transition: transform .18s var(--ease), box-shadow .25s var(--ease), filter .2s;
  position: relative; overflow: hidden;
}
.btn svg { width: 22px; height: 22px; flex: none; }
.btn-wa {
  color: #08311c;
  background: linear-gradient(135deg, #3ee07e 0%, var(--wa) 55%, #1bb555 100%);
  box-shadow: 0 14px 30px -10px rgba(37,211,102,.55), inset 0 1px 0 rgba(255,255,255,.4);
}
.btn-wa:hover { transform: translateY(-2px); box-shadow: 0 20px 38px -10px rgba(37,211,102,.6); }
.btn-wa:active { transform: translateY(0); }

.btn-outline {
  margin-top: 12px;
  color: var(--forest-deep); background: var(--cream-card);
  border: 1px solid var(--cream-line); box-shadow: var(--shadow-sm);
  font-size: .95rem; padding: 14px 20px;
}
.btn-outline:hover { border-color: var(--gold-soft); transform: translateY(-2px); }
.btn-outline svg { width: 19px; height: 19px; color: var(--gold-deep); }

.btn-sub { display:block; text-align:center; margin-top: 10px; color: var(--ink-soft);
  font-size: .82rem; }
.btn-sub b { color: var(--forest); }

.links { display:flex; flex-direction:column; gap: 12px; margin-top: 14px; }
.link-card {
  display:flex; align-items:center; gap: 14px;
  background: var(--cream-card); border: 1px solid var(--cream-line);
  border-radius: var(--radius); padding: 14px 16px; box-shadow: var(--shadow-sm);
  transition: transform .18s var(--ease), box-shadow .25s var(--ease), border-color .2s;
}
.link-card:hover { transform: translateY(-2px); box-shadow: var(--shadow);
  border-color: var(--gold-soft); }
.link-ic {
  width: 44px; height: 44px; flex: none; border-radius: 13px; display:grid; place-items:center;
  background: linear-gradient(140deg, rgba(91,140,123,.16), rgba(201,153,91,.20));
  color: var(--forest); border: 1px solid rgba(201,153,91,.25);
}
.link-ic svg { width: 22px; height: 22px; }
.link-tx { flex: 1; min-width: 0; }
.link-tx strong { display:block; color: var(--forest-deep); font-size: 1rem; font-weight: 600; }
.link-tx span { display:block; color: var(--ink-soft); font-size: .82rem;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.link-card .chev { color: var(--gold-deep); flex:none; transition: transform .2s var(--ease); }
.link-card:hover .chev { transform: translateX(3px); }

/* ---------- Section heading ---------- */
.sec-head { text-align:center; margin-bottom: 20px; }
.sec-head .eyebrow { display:block; color: var(--gold-deep); }
.sec-head h2 { font-family: var(--ff-head); font-weight: 700; color: var(--forest-deep);
  font-size: clamp(1.5rem, 5.5vw, 1.9rem); line-height: 1.1; }
.sec-head p { color: var(--ink-soft); font-size: .92rem; margin-top: 6px; }

/* ---------- Experiências grid ---------- */
.exp-grid { display:flex; flex-direction: column; gap: 14px; }
.exp-card {
  position: relative; border-radius: var(--radius-lg); overflow: hidden;
  box-shadow: var(--shadow); aspect-ratio: 4 / 3;
  transition: transform .2s var(--ease), box-shadow .25s var(--ease);
}
.exp-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.exp-card img { width: 100%; height: 100%; object-fit: cover; }
.exp-card .exp-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(13,13,13,0) 40%, rgba(13,13,13,.78) 100%);
  display: flex; align-items: flex-end; padding: 18px;
}
.exp-card h3 { color: var(--white); font-family: var(--ff-head); font-weight: 600;
  font-size: 1.08rem; }
.exp-card p { color: rgba(255,255,255,.85); font-size: .82rem; margin-top: 3px; }

.exp-grid-text { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; margin-top: 14px; }
@media (max-width: 380px){ .exp-grid-text { grid-template-columns: minmax(0,1fr); } }
.exp-text-card {
  background: var(--cream-card); border: 1px solid var(--cream-line);
  border-radius: var(--radius); padding: 18px 16px; box-shadow: var(--shadow-sm);
}
.exp-text-card h3 { font-size: .98rem; color: var(--forest-deep); font-weight: 600; line-height: 1.25; }
.exp-text-card p { font-size: .82rem; color: var(--ink-soft); margin-top: 4px; }
.exp-text-card.highlight {
  display:grid; place-content:center; text-align:center;
  background: linear-gradient(140deg, var(--forest), var(--forest-deep)); color: var(--cream); border:none;
}
.exp-text-card.highlight h3 { color: var(--gold-soft); }
.exp-text-card.highlight p { color: rgba(246,242,234,.85); }

/* ---------- About panel ---------- */
.about {
  position: relative; overflow: hidden;
  background: linear-gradient(155deg, var(--forest) 0%, var(--forest-deep) 100%);
  border-radius: var(--radius-lg); padding: 30px 24px; color: var(--cream);
  box-shadow: var(--shadow-lg);
}
.about::before {
  content:""; position:absolute; right:-60px; top:-60px; width: 240px; height: 240px;
  background: radial-gradient(circle, rgba(201,153,91,.28), transparent 70%);
}
.about .watermark { position:absolute; right:-20px; bottom:-22px; width: 150px; opacity:.10; }
.about h2 { font-family: var(--ff-head); font-weight: 700; font-size: 1.55rem; line-height: 1.15;
  color: var(--white); position: relative; }
.about .kicker { display:inline-flex; align-items:center; gap:8px; margin-bottom: 14px;
  font-size: .76rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
  color: var(--gold-soft); }
.about .kicker svg { width: 16px; height: 16px; }
.about p { margin-top: 12px; color: rgba(246,242,234,.9); font-size: .95rem; position: relative; }
.about p + p { margin-top: 10px; }
.about .quote { margin-top:16px; padding-left: 14px; border-left: 3px solid var(--gold);
  font-style: italic; color: var(--gold-soft); font-size: .95rem; }

.chips { display:flex; flex-wrap:wrap; gap: 8px; margin-top: 18px; position: relative; }
.chip { font-size: .78rem; font-weight: 600; color: var(--cream);
  background: rgba(246,242,234,.10); border: 1px solid rgba(246,242,234,.22);
  padding: 6px 12px; border-radius: var(--radius-pill); }

/* ---------- Footer ---------- */
.foot { text-align:center; margin-top: 44px; }
.foot-logo { width: 96px; margin: 0 auto 14px; opacity:.92; }
.foot-social { display:flex; justify-content:center; gap: 12px; margin: 16px 0; }
.foot-social a {
  width: 42px; height: 42px; border-radius: 50%; display:grid; place-items:center;
  background: var(--cream-card); border:1px solid var(--cream-line); color: var(--forest);
  box-shadow: var(--shadow-sm); transition: transform .18s var(--ease), background .2s, color .2s;
}
.foot-social a:hover { transform: translateY(-2px); background: var(--forest); color: var(--gold-soft); }
.foot-social svg { width: 19px; height: 19px; }
.foot small { display:block; color: var(--ink-soft); font-size: .8rem; line-height: 1.7; }
.foot .name { color: var(--forest-deep); font-weight: 600; font-family: var(--ff-head); }

/* ---------- Sticky mobile CTA ---------- */
.sticky-cta {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 30;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: linear-gradient(to top, var(--cream) 60%, rgba(246,242,234,0));
  display: flex; justify-content: center;
}
.sticky-cta .btn { max-width: var(--maxw); box-shadow: 0 -2px 24px -6px rgba(37,211,102,.5),
  0 14px 30px -10px rgba(37,211,102,.55); }
@media (min-width: 640px){ .sticky-cta { display: none; } }

/* ---------- Reveal animation ---------- */
.reveal { opacity: 0; transform: translateY(18px); }
.reveal.in { opacity: 1; transform: none; transition: opacity .7s var(--ease), transform .7s var(--ease); }
.reveal.d1.in { transition-delay: .06s; }
.reveal.d2.in { transition-delay: .12s; }
.reveal.d3.in { transition-delay: .18s; }

@media (prefers-reduced-motion: reduce){
  html { scroll-behavior: auto; }
  .reveal { opacity:1 !important; transform:none !important; transition:none !important; }
  .btn, .link-card, .exp-card, .exp-text-card, .foot-social a { transition: none !important; }
}

/* visually hidden (a11y) */
.vh { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden;
  clip:rect(0 0 0 0); white-space:nowrap; border:0; }
```

- [ ] **Step 2: Commit**

```bash
cd "C:\Projetos\vilagramado\site"
git add assets/css/styles.css
git commit -m "style: paleta e componentes visuais da Vila Gramado"
```

---

### Task 4: `index.html`

**Files:**
- Create: `C:\Projetos\vilagramado\site\index.html`

**Interfaces:**
- Consumes: every asset from Task 1, every class from Task 3, files from Task 2 (`site.webmanifest`, `favicon.ico`, `assets/img/favicon-512.png`, `assets/img/apple-touch-icon.png`).

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

<!-- ===================================================================
   Dados configurados (ago/2026):
   • WhatsApp .... (51) 99772-7880  → wa.me/5551997727880
   • Instagram ... @vilagramado
   • Cidade ...... Gramado / RS (Serra Gaúcha)
   • Domínio ..... vilagramado.jpstudio.tech (PROVISÓRIO — trocar quando
                   definirem domínio dedicado ao link-in-bio: substituir
                   "https://vilagramado.jpstudio.tech" aqui, no robots.txt
                   e no sitemap.xml)
   • Site institucional (não substituído por esta página): vilagramado.com.br
==================================================================== -->

<title>Vila Gramado — Cabanas na Serra Gaúcha | Reserve pelo WhatsApp</title>
<meta name="description" content="Vila Gramado: cabanas de luxo em meio à natureza da Serra Gaúcha, com hidromassagem privativa e vista para o lago. Mais que hospedagem, somos experiência! Reserve pelo WhatsApp.">
<meta name="author" content="Vila Gramado">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#1F2E22">
<link rel="canonical" href="https://vilagramado.jpstudio.tech/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Vila Gramado">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="Vila Gramado — Cabanas na Serra Gaúcha">
<meta property="og:description" content="Cabanas de luxo em meio à natureza de Gramado/RS, com hidro privativa e vista para o lago. Mais que hospedagem, somos experiência!">
<meta property="og:url" content="https://vilagramado.jpstudio.tech/">
<meta property="og:image" content="https://vilagramado.jpstudio.tech/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Vista panorâmica do complexo Vila Gramado com lago e cabanas">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Vila Gramado — Cabanas na Serra Gaúcha">
<meta name="twitter:description" content="Cabanas de luxo com hidro privativa e vista para o lago em Gramado/RS. Reserve pelo WhatsApp.">
<meta name="twitter:image" content="https://vilagramado.jpstudio.tech/assets/img/og-image.jpg">

<!-- Ícones -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="/assets/img/favicon-512.png" sizes="512x512">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Fontes -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="/assets/img/hero-bg.jpg">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/styles.css">

<!-- Dados estruturados (SEO) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "https://vilagramado.jpstudio.tech/#business",
  "name": "Vila Gramado",
  "description": "Cabanas de luxo em meio à natureza da Serra Gaúcha, com hidromassagem privativa e vista para o lago.",
  "image": "https://vilagramado.jpstudio.tech/assets/img/og-image.jpg",
  "url": "https://vilagramado.jpstudio.tech/",
  "telephone": "+5551997727880",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gramado",
    "addressRegion": "RS",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://www.instagram.com/vilagramado/"
  ],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Hidromassagem privativa", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Vista para o lago", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Área externa para café da manhã", "value": true }
  ]
}
</script>
</head>

<body>
<div class="bg-ambient" aria-hidden="true"></div>

<main class="shell">

  <!-- ============ HERO ============ -->
  <header class="hero">
    <div class="hero-photo" aria-hidden="true"></div>

    <div class="brandmark reveal">
      <img src="/assets/img/logo.png" alt="Logo Vila Gramado" width="88" height="88">
    </div>

    <p class="eyebrow reveal d1">Gramado · Serra Gaúcha</p>
    <h1 class="reveal d1">Vila Gramado</h1>
    <p class="role reveal d2"><b>Mais que hospedagem, somos experiência!</b></p>
    <p class="tagline reveal d2">Cabanas de luxo em meio à mata, com hidro privativa e vista para o lago — o refúgio romântico e aconchegante da Serra Gaúcha.</p>

    <ul class="badges reveal d2">
      <li class="badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6h6v4.5a3 3 0 0 1-6 0z"/><path d="M13 9h6v3a3 3 0 0 1-6 0z"/></svg>
        Hidro privativa
      </li>
      <li class="badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16l5-6 4 4 5-7 4 6"/><path d="M3 20h18"/></svg>
        Vista para o lago
      </li>
      <li class="badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
        Gramado · RS
      </li>
    </ul>
  </header>

  <!-- ============ CTA PRINCIPAL ============ -->
  <section class="cta-wrap reveal" aria-label="Reserva">
    <a class="btn btn-wa" href="https://wa.me/5551997727880?text=Ol%C3%A1%2C%20Vila%20Gramado!%20Vim%20pela%20p%C3%A1gina%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20sobre%20hospedagem." target="_blank" rel="noopener" id="wa-main">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.987-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
      Reservar no WhatsApp
    </a>
    <a class="btn btn-outline" href="https://vilagramado.com.br/" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>
      Ver disponibilidade no site oficial
    </a>
    <span class="btn-sub">Reserve seu final de semana · <b>resposta rápida</b></span>
  </section>

  <!-- ============ LINKS ============ -->
  <nav class="links" aria-label="Links">
    <a class="link-card reveal" href="https://www.instagram.com/vilagramado/" target="_blank" rel="noopener">
      <span class="link-ic" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>
      </span>
      <span class="link-tx"><strong>Instagram</strong><span>Bastidores, hóspedes e a rotina da Vila</span></span>
      <svg class="chev" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </a>

    <a class="link-card reveal d1" href="https://share.google/rdDEtYUKOtpFHwJcT" target="_blank" rel="noopener">
      <span class="link-ic" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><path d="M9.6 10.2l1.6 1.6 3.2-3.4"/></svg>
      </span>
      <span class="link-tx"><strong>Google · Avaliações e Localização</strong><span>Veja o perfil e o que dizem os hóspedes</span></span>
      <svg class="chev" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </a>

    <a class="link-card reveal d2" href="#experiencias">
      <span class="link-ic" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8c3-2 5 2 8 0s5-2 8 0M4 12c3-2 5 2 8 0s5-2 8 0M4 16c3-2 5 2 8 0s5-2 8 0"/></svg>
      </span>
      <span class="link-tx"><strong>Experiências</strong><span>Conheça o clima da Vila Gramado</span></span>
      <svg class="chev" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5l7 7-7 7M5 12h14"/></svg>
    </a>
  </nav>

  <!-- ============ EXPERIÊNCIAS ============ -->
  <section id="experiencias">
    <div class="sec-head reveal">
      <span class="eyebrow">O que você vive aqui</span>
      <h2>Experiências</h2>
      <p>Cada cabana é pensada para um refúgio na natureza, a dois ou em família.</p>
    </div>

    <div class="exp-grid">
      <article class="exp-card reveal">
        <img src="/assets/img/exp-casal.jpg" alt="Deck com hortênsias e vista para o lago da Vila Gramado" width="700" height="700" loading="lazy">
        <div class="exp-overlay">
          <div>
            <h3>Refúgio a dois</h3>
            <p>Hidromassagem privativa e deck exclusivo para casais.</p>
          </div>
        </div>
      </article>

      <article class="exp-card reveal d1">
        <img src="/assets/img/exp-lago.jpg" alt="Vista panorâmica do lago a partir de uma cabana da Vila Gramado" width="700" height="700" loading="lazy">
        <div class="exp-overlay">
          <div>
            <h3>Vista para o lago</h3>
            <p>Amanheça de frente para a água, cercado pela mata da Serra.</p>
          </div>
        </div>
      </article>

      <article class="exp-card reveal d2">
        <img src="/assets/img/exp-natureza.jpg" alt="Cabana A-frame de madeira escura entre as árvores da Serra Gaúcha" width="700" height="700" loading="lazy">
        <div class="exp-overlay">
          <div>
            <h3>Natureza & desconexão</h3>
            <p>Cabanas A-frame em meio à araucária, longe da correria.</p>
          </div>
        </div>
      </article>
    </div>

    <div class="exp-grid-text">
      <div class="exp-text-card reveal">
        <h3>Momentos em família</h3>
        <p>Café da manhã ao ar livre e espaço para toda a turma, do bebê ao pet.</p>
      </div>
      <div class="exp-text-card highlight reveal d1">
        <h3>Pronto pra reservar?</h3>
        <p>Fala com a gente agora pelo WhatsApp.</p>
      </div>
    </div>
  </section>

  <!-- ============ SOBRE ============ -->
  <section class="about reveal" aria-label="Sobre a Vila Gramado">
    <img class="watermark" src="/assets/img/logo.png" alt="" aria-hidden="true" width="150" height="150">
    <span class="kicker">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s5 5.5 5 9.2A5 5 0 0 1 7 12.2C7 8.5 12 3 12 3z"/><path d="M12 14.5c-1.2 1.4-1.2 3 0 4.5"/></svg>
      Refúgio na Serra Gaúcha
    </span>
    <h2>Sua casa longe de casa, em Gramado</h2>
    <p>A <strong>Vila Gramado</strong> reúne cabanas modernas de madeira escura em meio à mata da Serra Gaúcha, com piscinas e hidromassagens externas de uso privativo e vista para o lago.</p>
    <p>Recebemos casais em busca de um refúgio romântico e famílias que querem desconectar cercadas de natureza — sempre com aquele calor de quem recebe você de coração aberto.</p>
    <p class="quote">"Não temos palavras para agradecer tanto carinho... a Vila Gramado é a tua casa no Rio Grande do Sul."</p>

    <ul class="chips">
      <li class="chip">Refúgio romântico</li>
      <li class="chip">Natureza aconchegante</li>
      <li class="chip">Experiência instagramável</li>
      <li class="chip">Hidro privativa</li>
      <li class="chip">Família & pets</li>
    </ul>
  </section>

  <!-- ============ RODAPÉ ============ -->
  <footer class="foot reveal">
    <img class="foot-logo" src="/assets/img/logo.png" alt="Vila Gramado" width="96" height="96">
    <div class="foot-social">
      <a href="https://wa.me/5551997727880" target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.987-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
      </a>
      <a href="https://www.instagram.com/vilagramado/" target="_blank" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>
      </a>
      <a href="https://share.google/rdDEtYUKOtpFHwJcT" target="_blank" rel="noopener" aria-label="Google Meu Negócio">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
      </a>
    </div>
    <small><span class="name">Vila Gramado</span> · Cabanas na Serra Gaúcha · Gramado/RS</small>
    <small>Hospedagem mediante reserva. © <span id="year">2026</span> · Todos os direitos reservados.</small>
  </footer>
</main>

<!-- Sticky CTA (mobile) -->
<div class="sticky-cta" aria-hidden="false">
  <a class="btn btn-wa" href="https://wa.me/5551997727880?text=Ol%C3%A1%2C%20Vila%20Gramado!%20Vim%20pela%20p%C3%A1gina%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20sobre%20hospedagem." target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.987-1.607z"/></svg>
    Reservar no WhatsApp
  </a>
</div>

<script>
  document.getElementById('year').textContent = new Date().getFullYear();
  // Reveal on scroll
  (function(){
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function(e){e.classList.add('in');}); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function(e){ io.observe(e); });
  })();
</script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
cd "C:\Projetos\vilagramado\site"
git add index.html
git commit -m "feat: página principal (link in bio) da Vila Gramado"
```

---

### Task 5: `404.html` and `README.md`

**Files:**
- Create: `C:\Projetos\vilagramado\site\404.html`
- Create: `C:\Projetos\vilagramado\site\README.md`

**Interfaces:**
- Consumes: `/assets/img/logo.png` (Task 1).

- [ ] **Step 1: Write `404.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Página não encontrada — Vila Gramado</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.ico" sizes="any">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@700&display=swap" rel="stylesheet">
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;text-align:center;
    font-family:Inter,sans-serif;color:#2B2B26;background:#F6F2EA;padding:24px}
  img{width:88px;margin-bottom:18px}
  h1{font-family:"Poppins",sans-serif;color:#131E16;font-size:2rem;margin:0 0 8px}
  p{color:#6B6A5E;margin:0 0 22px}
  a{display:inline-block;background:#1F2E22;color:#F6F2EA;text-decoration:none;
    font-weight:600;padding:13px 22px;border-radius:16px}
</style>
</head>
<body>
  <main>
    <img src="/assets/img/logo.png" alt="Vila Gramado">
    <h1>Página não encontrada</h1>
    <p>O endereço que você procurou não existe ou foi movido.</p>
    <a href="/">Voltar para a página inicial</a>
  </main>
</body>
</html>
```

- [ ] **Step 2: Write `README.md`**

```markdown
# Vila Gramado — Página Link in Bio

Página única (link in bio) estática, otimizada para SEO e conversão via WhatsApp.
Identidade visual da marca: verde-floresta `#1F2E22`, preto fosco `#0D0D0D`,
verde-sálvia `#5B8C7B`, azul-lago `#3E6B8A`, dourado/pele `#C9995B`,
tipografia **Poppins** + **Inter**.

Réplica de arquitetura dos sites do Henrique Orsato e do Roberto da Rosa
(`henrique-orsato-mkt`, `roberto-da-rosa-mkt`), reskinada com a paleta e o
conteúdo do `BRIEFMARCA.md` da Vila Gramado. Diferente dos dois: usa fotos
reais do complexo (não avatar de pessoa) e complementa — não substitui — o
site institucional `vilagramado.com.br`.

---

## ⚙️ 1. Dados configurados

| O quê | Valor atual |
|---|---|
| **WhatsApp** | `(51) 99772-7880` → `wa.me/5551997727880` |
| **Instagram** | `@vilagramado` |
| **Cidade** | Gramado / RS (Serra Gaúcha) |
| **Google Meu Negócio** | link real configurado |
| **Site institucional** | `https://vilagramado.com.br/` (link secundário, não substituído) |
| **Domínio** | `vilagramado.jpstudio.tech` ⚠️ **provisório** |

> **Trocar de domínio depois:** quando definirem domínio dedicado pra este
> link-in-bio, substitua `https://vilagramado.jpstudio.tech` em **3
> arquivos** — `index.html` (canonical, og:url, og:image, twitter:image e o
> JSON-LD), `robots.txt` e `sitemap.xml`.

---

## 🧪 2. Testar localmente

Qualquer servidor estático serve. Exemplos:

```bash
# Node (sem instalar nada)
npx serve .          # abre em http://localhost:3000

# ou Python
python -m http.server 8080   # http://localhost:8080
```

> Não abra o `index.html` por duplo-clique (`file://`) — os caminhos
> absolutos (`/assets/...`) só funcionam servidos por HTTP.

---

## 🚀 3. Deploy no EasyPanel (via GitHub)

Mesmo fluxo dos outros sites da família:

1. **DNS primeiro**: no provedor do `jpstudio.tech`, crie um registro
   **A** para `vilagramado` apontando para o **IP da VPS**
   (resultado: `vilagramado.jpstudio.tech`).
2. No EasyPanel: **Create → App** (dentro de um Project).
3. **Source → GitHub**: conecte a conta `Jeipidevs`, autorize o app a acessar
   repositórios privados e selecione o repositório deste site, branch `main`.
4. **Build**: tipo **Dockerfile** (o EasyPanel detecta o `Dockerfile` na raiz).
5. **Port**: `80`.
6. **Domains**: adicione `vilagramado.jpstudio.tech` e ative **HTTPS (Let's Encrypt)**.
7. **Deploy**. O Nginx já vem com gzip, cache de assets e headers de segurança.

> Com a integração GitHub, cada `git push` na branch `main` dispara um
> **redeploy automático** (se o auto-deploy estiver ligado no serviço).

---

## 🔎 4. Pós-publicação (SEO)

1. **Google Search Console**: adicione a propriedade do domínio e envie
   `https://vilagramado.jpstudio.tech/sitemap.xml`.
2. **Google Meu Negócio**: confirme NAP (nome, endereço/cidade, telefone)
   igual ao do site.
3. Valide os dados estruturados em **search.google.com/test/rich-results**.

---

## 📁 Estrutura

```
site/
├── index.html            # página principal (SEO + conteúdo)
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── favicon.ico
├── Dockerfile            # Nginx para EasyPanel
├── nginx.conf
└── assets/
    ├── css/styles.css
    └── img/
        ├── logo.png              # logo com fundo removido
        ├── favicon-512.png
        ├── apple-touch-icon.png
        ├── hero-bg.jpg           # panorama do complexo (fundo do hero)
        ├── og-image.jpg          # card de compartilhamento (1200x630)
        ├── exp-casal.jpg         # deck com hortênsias / hidro
        ├── exp-lago.jpg          # vista panorâmica do lago
        └── exp-natureza.jpg      # cabana A-frame entre as árvores
```

Imagens processadas a partir dos originais em `C:\Projetos\vilagramado\imagens-marca\`
(recorte/composição via Pillow — ver plano de implementação em
`docs/superpowers/plans/2026-08-18-vilagramado-linkinbio.md`).
```

- [ ] **Step 3: Commit**

```bash
cd "C:\Projetos\vilagramado\site"
git add 404.html README.md
git commit -m "docs: 404 e README do site da Vila Gramado"
```

---

### Task 6: Local verification

**Files:** none created — verification only.

**Interfaces:**
- Consumes: everything from Tasks 1-5.

- [ ] **Step 1: Serve the site locally**

Run (from `C:\Projetos\vilagramado\site`, in background or a separate terminal):

```bash
python -m http.server 8080
```

- [ ] **Step 2: Verify the homepage and every referenced asset return HTTP 200**

Run:

```bash
for path in / /assets/css/styles.css /assets/img/logo.png /assets/img/hero-bg.jpg \
            /assets/img/og-image.jpg /assets/img/exp-casal.jpg /assets/img/exp-lago.jpg \
            /assets/img/exp-natureza.jpg /assets/img/favicon-512.png \
            /assets/img/apple-touch-icon.png /site.webmanifest /404.html /robots.txt /sitemap.xml; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8080$path")
  echo "$code $path"
done
```

Expected: every line shows `200`.

- [ ] **Step 3: Verify the WhatsApp link and phone number are consistent across the page**

Run:

```bash
grep -c "5551997727880" "C:\Projetos\vilagramado\site\index.html"
```

Expected: `3` (main CTA, sticky CTA, footer icon link).

- [ ] **Step 4: Visual check in the browser**

Open `http://localhost:8080/` in a browser (or via the `claude-in-chrome`/`playwright` tool if
available in this session) and confirm:
- Hero shows the lake/complex photo with legible white text over it.
- The two CTA buttons (WhatsApp green, outline "site oficial") render correctly.
- The three experience photo cards show real property images with readable overlay text.
- The About panel shows the dark-green gradient with the quote and chips.
- Resize to a mobile width (~390px) and confirm the sticky WhatsApp CTA appears at the bottom.

- [ ] **Step 5: Stop the local server**

Stop the `python -m http.server 8080` process.

- [ ] **Step 6: Final commit if any fixes were made during verification**

```bash
cd "C:\Projetos\vilagramado\site"
git add -A
git commit -m "fix: ajustes pós-verificação local do site da Vila Gramado"
```

(Skip this commit if verification found no issues.)
