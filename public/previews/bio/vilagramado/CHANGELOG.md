# Changelog — Vila Gramado (Link in Bio)

## 2026-08-21

### Corrigido
- **Halo branco na logo** (`assets/img/logo.png`, `assets/img/favicon-512.png`): o recorte de fundo original
  deixou pixels de borda opacos com cor branca "vazando" (fringe), visível como contorno claro ao redor da
  estrela/pinheiros/badge sobre o fundo escuro do hero. Corrigido com defringe (recolorir pixels de borda
  com a cor do "core" opaco mais próximo, via erosão + distância euclidiana), mantendo o alpha original.
- **Riscos/shimmer residual em zoom**: o master da logo tinha alpha binário (0/255, sem anti-aliasing);
  redimensionado no navegador para 88px, isso causava ruído/aliasing visível ao dar zoom. Corrigido
  regenerando a logo com downsample de alta qualidade (Lanczos) a partir do master já corrigido.
- **Linha-fantasma nas bordas esquerda/direita da logo**: o próprio resize Lanczos deixou uma coluna de 1px
  inteira, nas bordas do canvas, com alpha residual (~25/255, esverdeado) — artefato de padding da
  biblioteca de resize, não do conteúdo. Ao renderizar a logo em 88px essa coluna virava uma linha vertical
  visível em cada lateral (as "riscos" reportados). Corrigido limpando uma margem de segurança nas bordas
  do canvas (conteúdo real fica bem longe da borda, sem perda visual).
- **CTA "Reservar no WhatsApp" duplicado no mobile**: o botão fixo (sticky) no rodapé ficava sempre visível,
  mesmo com o botão principal do topo também na tela. Agora ele começa escondido (`transform: translateY`)
  e só aparece via `IntersectionObserver` quando o botão principal (`#wa-main`) sai da viewport.
- Arquivos alterados: `index.html`, `assets/css/styles.css`, `assets/img/logo.png`,
  `assets/img/favicon-512.png`. Testado em viewport mobile real (390px, devtools) com zoom extremo (6x) até
  confirmar bordas limpas.

## 2026-08-18

### Adicionado
- Spec de design (`docs/superpowers/specs/2026-08-18-vilagramado-linkinbio-design.md`) e plano de
  implementação (`docs/superpowers/plans/2026-08-18-vilagramado-linkinbio.md`), seguindo o processo de
  brainstorming/writing-plans.
- Página link in bio completa (`index.html`, `404.html`, `assets/css/styles.css`), réplica de arquitetura
  dos sites `henrique-orsato-mkt` e `roberto-da-rosa-mkt` (Nginx + Docker, sem build step).
- Assets processados a partir das fotos reais em `C:\Projetos\vilagramado\imagens-marca\` (logo com fundo
  removido, favicons, hero panorâmico do lago, og-image, 3 fotos de experiências).
- Scaffolding de deploy: `Dockerfile`, `nginx.conf`, `robots.txt`, `sitemap.xml`, `site.webmanifest`,
  `.gitignore`, `.dockerignore`, `README.md`.
- Verificação local: servidor estático (`python -m http.server`), todos os endpoints retornando 200,
  número de WhatsApp consistente em 5 pontos do HTML, checagem visual no navegador (hero, experiências,
  seção Sobre, rodapé).
- Repositório GitHub criado: `github.com/Jeipidevs/vilagramado-linkinbio` (privado, branch `main`), com o
  código já commitado e enviado.

### Pendente (próxima sessão)
- **Deploy no EasyPanel**: o MCP `easypanel-mcp` desconectou durante a sessão (57 tools ficaram
  indisponíveis) e não foi possível reconectar automaticamente. João Pedro vai criar o serviço manualmente
  pelo painel: Source → GitHub `Jeipidevs/vilagramado-linkinbio` branch `main`, build Dockerfile, porta 80,
  domínio `vilagramado.jpstudio.tech` (DNS já configurado por ele) com HTTPS Let's Encrypt.
- Validar `https://vilagramado.jpstudio.tech/` com `curl` (retornou erro de SSL/conexão antes do deploy,
  como esperado) assim que o serviço estiver no ar.
- Quando trocarem para um domínio definitivo (não provisório), atualizar `https://vilagramado.jpstudio.tech`
  em `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD), `robots.txt` e `sitemap.xml` —
  já documentado no `README.md`.
