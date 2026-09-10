# Roberto da Rosa — Página Link in Bio

Página única (link in bio) estática, otimizada para SEO e conversão via WhatsApp.
Identidade visual da marca: preto-obsidian `#0F0F12`, roxo-elétrico `#7C3AED`,
dourado-metálico `#D4AF37`, tipografia **Inter**.

Réplica de arquitetura do site do Henrique Orsato (`henrique-orsato-mkt`), reskinada
com a paleta e o conteúdo do briefing do Roberto da Rosa Tatuador.

---

## ⚙️ 1. Dados configurados

Estes valores já estão preenchidos no site:

| O quê | Valor atual |
|---|---|
| **WhatsApp** | `(51) 99278-6009` → `wa.me/5551992786009` |
| **Instagram** | `@robertotatuador_original` |
| **Cidade** | Capão da Canoa / RS |
| **Google (avaliações/local)** | `https://share.google/s5g96jMXtmTnyGewW` |
| **Domínio** | `roberto.jpstudio.tech` ⚠️ **provisório** |

> **Trocar de domínio depois:** quando o Roberto comprar o domínio próprio,
> substitua `https://roberto.jpstudio.tech` em **3 arquivos** — `index.html`
> (canonical, og:url, og:image, twitter:image e o JSON-LD), `robots.txt` e
> `sitemap.xml`.

### ⚠️ Pendências de assets (diferente do Henrique)

Este projeto **não tinha** logo tratada, fotos de trabalhos ou og-image dedicada —
só a foto de perfil (`foto-perfil.jpg`). Por isso:

- **Logo**: não há logo neste site — sem uma logo real do Roberto, optamos por não
  usar um monograma provisório. Adicionar quando ele tiver uma logo desenhada.
- **Avatar**: a própria `foto-perfil.jpg` (1080×1080), sem tratamento/recorte.
- **Favicon**: usa a própria foto de perfil (`roberto-avatar.jpg`) em vez do pacote
  completo `favicon.ico` + `apple-touch-icon.png` + `favicon-512.png` do site do
  Henrique.
- **og-image**: reaproveita a foto de perfil — o ideal é uma imagem 1200×630
  dedicada quando houver fotos de trabalhos em alta qualidade.
- **Portfólio de tatuagens**: o briefing cita 5 posts/reels campeões do Instagram
  como matéria-prima, mas não há imagens locais deles — a seção de especialidades
  usa apenas ícones, sem fotos de trabalhos. Se quiser uma galeria depois, será
  preciso baixar essas imagens do Instagram com autorização do Roberto.

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

Mesmo fluxo do site do Henrique:

1. **DNS primeiro**: no provedor do `jpstudio.tech`, crie um registro
   **A** para `roberto` apontando para o **IP da sua VPS**
   (resultado: `roberto.jpstudio.tech`).
2. No EasyPanel: **Create → App** (dentro de um Project).
3. **Source → GitHub**: conecte a conta `Jeipidevs`, autorize o app a acessar
   repositórios privados e selecione o repositório deste site, branch `main`.
4. **Build**: tipo **Dockerfile** (o EasyPanel detecta o `Dockerfile` na raiz —
   não precisa configurar Build path).
5. **Port**: `80`.
6. **Domains**: adicione `roberto.jpstudio.tech` e ative **HTTPS (Let's Encrypt)**.
7. **Deploy**. O Nginx já vem com gzip, cache de assets e headers de segurança.

> Com a integração GitHub, cada `git push` na branch `main` dispara um
> **redeploy automático** (se o auto-deploy estiver ligado no serviço).

> O container expõe a porta **80** e tem `HEALTHCHECK` configurado.

---

## 🔎 4. Pós-publicação (SEO)

1. **Google Search Console**: adicione a propriedade do domínio e envie
   `https://roberto.jpstudio.tech/sitemap.xml`.
2. **Google Meu Negócio**: confirme NAP (nome, endereço/cidade, telefone)
   igual ao do site — reforça SEO local.
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
├── favicon.svg
├── Dockerfile            # Nginx para EasyPanel
├── nginx.conf
└── assets/
    ├── css/styles.css
    └── img/
        └── roberto-avatar.jpg   # foto de perfil fornecida no briefing
```
