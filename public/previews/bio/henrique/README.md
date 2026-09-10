# Henrique Orsato — Página Link in Bio

Página única (link in bio) estática, otimizada para SEO e conversão via WhatsApp.
Identidade visual da marca: verde-esmeralda `#1A5C42`, dourado-caqui `#C4A96A`,
off-white `#F5F0E8`, tipografia **Playfair Display** + **Inter**.

---

## ⚙️ 1. Dados configurados

Estes valores já estão preenchidos no site:

| O quê | Valor atual |
|---|---|
| **WhatsApp** | `(51) 99578-8330` → `wa.me/5551995788330` |
| **Instagram** | `@henriqueorsato_massoterapeuta` |
| **Cidade** | Capão da Canoa / RS |
| **Google Meu Negócio** | link real configurado |
| **Domínio** | `henrique.jpstudio.tech` ⚠️ **provisório** |

> **Trocar de domínio depois:** quando o Henrique comprar o domínio próprio,
> substitua `https://henrique.jpstudio.tech` em **3 arquivos** — `index.html`
> (canonical, og:url, og:image, twitter:image e o JSON-LD), `robots.txt` e
> `sitemap.xml`.

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

Repositório: **`Jeipidevs/henrique-orsato-linkinbio`** (privado, branch `main`,
Dockerfile na raiz).

1. **DNS primeiro**: no provedor do `jpstudio.tech`, crie um registro
   **A** para `henrique` apontando para o **IP da sua VPS**
   (resultado: `henrique.jpstudio.tech`).
2. No EasyPanel: **Create → App** (dentro de um Project).
3. **Source → GitHub**: conecte a conta `Jeipidevs`, autorize o app a acessar
   repositórios privados e selecione `henrique-orsato-linkinbio`, branch `main`.
4. **Build**: tipo **Dockerfile** (o EasyPanel detecta o `Dockerfile` na raiz —
   não precisa configurar Build path).
5. **Port**: `80`.
6. **Domains**: adicione `henrique.jpstudio.tech` e ative **HTTPS (Let's Encrypt)**.
7. **Deploy**. O Nginx já vem com gzip, cache de assets e headers de segurança.

> Com a integração GitHub, cada `git push` na branch `main` dispara um
> **redeploy automático** (se o auto-deploy estiver ligado no serviço).

> O container expõe a porta **80** e tem `HEALTHCHECK` configurado.

---

## 🔎 4. Pós-publicação (SEO)

1. **Google Search Console**: adicione a propriedade do domínio e envie
   `https://henrique.jpstudio.tech/sitemap.xml`.
2. **Google Meu Negócio**: confirme NAP (nome, endereço/cidade, telefone)
   igual ao do site — reforça SEO local.
3. Valide os dados estruturados em **search.google.com/test/rich-results**.
4. Atualize a foto de compartilhamento (`assets/img/og-image.jpg`) caso troque a foto.

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
        ├── logo.(png|webp)          # logo completo (fundo removido)
        ├── logo-light.(png|webp)    # versão clara (para fundos escuros)
        ├── logo-mark.png            # monograma HO
        ├── henrique-avatar.(png|webp)
        ├── henrique-full.(png|webp)
        ├── texture-wave.(png|webp)  # textura sutil do hero
        ├── og-image.jpg             # card de compartilhamento (1200x630)
        ├── favicon-512.png
        └── apple-touch-icon.png
```

Imagens da logo e da foto foram tratadas (recorte e remoção de fundo) a partir
dos arquivos originais. A textura de fundo foi gerada por IA na paleta da marca.
