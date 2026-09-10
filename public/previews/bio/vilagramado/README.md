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
