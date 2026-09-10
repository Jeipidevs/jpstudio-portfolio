# Vila Gramado — Página Link in Bio (Design)

> Data: 2026-08-18 · Réplica de arquitetura dos sites `henrique-orsato-mkt` e `roberto-da-rosa-mkt`.

## Objetivo

Página estática única (link in bio), otimizada para SEO e conversão via WhatsApp, para uso no link do
Instagram/Google Meu Negócio da Vila Gramado (pousada de cabanas de luxo em Gramado/RS). Complementa o
site institucional existente (`vilagramado.com.br`) — não o substitui.

## Dados configurados

| O quê | Valor |
|---|---|
| WhatsApp | `+55 51 99772-7880` → `wa.me/5551997727880` |
| Instagram | `@vilagramado` (`https://www.instagram.com/vilagramado/`) |
| Google Meu Negócio | `https://share.google/rdDEtYUKOtpFHwJcT` |
| Site institucional | `https://vilagramado.com.br/` (link secundário) |
| Domínio deste site | `vilagramado.jpstudio.tech` ⚠️ provisório |

## Identidade visual

Fonte: `C:\Projetos\vilagramado\BRIEFMARCA.md` e `imagens-marca\CLAUDE.md`.

- Paleta: verde-floresta escuro `#1F2E22` (base), preto fosco `#0D0D0D`, verde-sálvia `#5B8C7B`,
  azul-lago `#3E6B8A`, dourado/pele `#C9995B` (acento)
- Tipografia: sans-serif limpa (Inter/Poppins) para todo o conteúdo institucional
- Fotos reais em `C:\Projetos\vilagramado\imagens-marca\`: `panorama_complexo_lago.jpg`,
  `vista_noturna_iluminada.jpg`, `cabana_aframe_dia.jpg`, `deck_hortensias_lago.jpg`,
  `deck_panoramico_lago.jpg`, `fileira_cabanas_hidro.jpg`, `logo_vilagramado.png`
- Tom de voz: "Anfitrião Caloroso" — caloroso, emotivo, foco no benefício emocional
  ("Mais que hospedagem, somos experiência!"), evitar tom "consultor premium"

## Estrutura de seções

1. **Hero** — logo, "Vila Gramado", eyebrow (Gramado · Serra Gaúcha), tagline emocional, foto de fundo
   (`panorama_complexo_lago.jpg` ou `vista_noturna_iluminada.jpg`), badges (Cabanas com hidro privativa ·
   Vista para o lago · Gramado/RS)
2. **CTA principal** — botão primário WhatsApp ("Reservar no WhatsApp", mensagem pré-preenchida) + botão/link
   secundário menor para `vilagramado.com.br` ("Ver disponibilidade no site")
3. **Links** (cards estilo linktree) — Instagram, Google · Avaliações e Localização, atalho `#experiencias`
4. **Experiências** — grid de cards temáticos com fotos reais (sem inventar categorias/preços de cabana):
   - Refúgio a dois (hidro privativa) — `deck_hortensias_lago.jpg` ou `fileira_cabanas_hidro.jpg`
   - Vista para o lago — `deck_panoramico_lago.jpg`
   - Natureza & desconexão — `cabana_aframe_dia.jpg`
   - Momentos em família — texto, sem foto dedicada disponível
   - Card de destaque (estilo "+ Atendimento a domicílio" do Henrique) com CTA reforçando WhatsApp
5. **Sobre** — texto no tom "Anfitrião Caloroso", reforça posicionamento experiencial, chips de atmosfera
   (Refúgio Romântico · Natureza Aconchegante · Experiência Instagramável · Pet friendly, se aplicável)
6. **Rodapé** — logo, ícones sociais (WhatsApp/Instagram/Google), texto de localização/direitos
7. **Sticky CTA mobile** — botão WhatsApp fixo, igual aos outros dois sites

## SEO / Dados estruturados

- Schema `LodgingBusiness` (em vez de `LocalBusiness`/`HealthAndBeautyBusiness` usados no Henrique),
  `@id`, `image`, `telephone`, `priceRange`, `address` (Gramado/RS), `amenityFeature` (hidromassagem
  privativa, vista para o lago, café da manhã), `sameAs` (Instagram)
- Open Graph/Twitter usando uma foto real do complexo como `og-image` (1200×630, recorte de
  `panorama_complexo_lago.jpg` ou `vista_noturna_iluminada.jpg`)
- `canonical`, `robots.txt`, `sitemap.xml` apontando para `https://vilagramado.jpstudio.tech/`

## Estrutura de arquivos

Idêntica aos dois sites de referência:

```
site/
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── Dockerfile
├── nginx.conf
├── README.md
└── assets/
    ├── css/styles.css
    └── img/
        ├── logo.png              (copiado/otimizado de imagens-marca/logo_vilagramado.png)
        ├── hero-bg.jpg           (panorama_complexo_lago ou vista_noturna, otimizado)
        ├── exp-*.jpg             (fotos das experiências, otimizadas/recortadas)
        └── og-image.jpg
```

## Fora de escopo

- Categorias/preços reais de cabanas (não há dados oficiais — tratado como "Experiência única, com
  destaques" por decisão do dono)
- Sistema de reservas embutido (fica só o link para `vilagramado.com.br`)
- Deploy real no EasyPanel / configuração de DNS (feito em sessão futura, sob confirmação explícita —
  regra global de nunca fazer deploy sem aprovação)
