# Cozy Home — Site / Link in Bio

Site institucional e link-in-bio da **Cozy Home** (Xangri-lá/RS) — curadoria de cama, mesa, banho e décor. Página estática de alta conversão com SEO local, foco em contato via WhatsApp.

> 🏠 **Site estático, deploy por container.** Sem framework, sem build — HTML/CSS/JS servidos por nginx no EasyPanel. Pronto para conversão (WhatsApp + rastreamento Meta).

---

## ✨ O que já está pronto

- **SEO local:** título, descrição e dados estruturados (schema.org `HomeGoodsStore`) com nome, endereço, telefone e Instagram — é o que faz o Google reconhecer a loja.
- **WhatsApp** com mensagem pré-preenchida (51 99124-8774) e evento `Contact`.
- **"Como chegar"** abre o Google Maps no endereço da loja.
- **Responsivo**, fontes Google (Cormorant Garamond, Hanken Grotesk, Space Mono), animação de entrada suave.
- **Assets de compartilhamento:** `og.jpg` (1200×630), `robots.txt`, `sitemap.xml`, `site.webmanifest`.

---

## 📁 Estrutura

```
cozy-home-mkt/
├─ index.html          # A página (HTML + CSS + JS inline)
├─ Dockerfile          # Publicação em container nginx
├─ nginx.conf          # Config do servidor
├─ assets/ · brand/ · fonts/ · icons/    # mídia e identidade
├─ og.jpg · robots.txt · sitemap.xml · site.webmanifest   # SEO / compartilhamento
└─ LEIA-ME.txt         # Checklist original de publicação
```

---

## 🚀 Deploy

```bash
docker build -t cozy-home .
docker run -p 8080:80 cozy-home     # http://localhost:8080
```
EasyPanel → App → Source GitHub (branch `master`), Dockerfile na raiz, Port 80, domínio com HTTPS.

---

## ✅ Checklist antes de publicar

1. **Logo real:** salvar `logo-cozy-home.png` e trocar no CSS `.monogram img{display:none}` → `block` e `.monogram span` → `none`.
2. **Pixel da Meta:** substituir `SEU_PIXEL_ID` pelo ID numérico do pixel. Eventos já configurados: `PageView`, `Contact` (WhatsApp), `LinkClick` (demais botões).
3. **Domínio:** trocar `https://cozyhome.example.com/` no `<link rel="canonical">` e no JSON-LD pelo domínio real.
4. **Guia Cama:** hoje aponta para o perfil do Instagram — trocar pelo link do destaque (`/stories/highlights/...`).
5. **Opcional:** conferir `og.jpg` (1200×630) para o preview ao compartilhar no WhatsApp.
