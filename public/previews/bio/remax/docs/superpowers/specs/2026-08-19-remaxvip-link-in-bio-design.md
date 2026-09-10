# RE/MAX VIP — Link in Bio da Equipe (Hub + Páginas Individuais)

**Data:** 2026-08-19
**Status:** Aprovado para planejamento

## 1. Objetivo

Criar um site estático de "link in bio" para a equipe da RE/MAX VIP I (Litoral Norte/RS):
um **Hub** institucional que lista todos os corretores ativos e uma **página individual**
por corretor, cada uma com CTA de WhatsApp e links (Instagram, imóveis, avaliações).
Design totalmente alinhado à identidade oficial da marca RE/MAX — não um template
genérico de link-in-bio.

## 2. Direção visual

Baseada na logo oficial (`LOGOS/Impressão e Digital_ *.png`) e nas cores confirmadas
da marca ([brandcolors.net/b/remax](https://brandcolors.net/b/remax)):

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#003DA5` | Base institucional (RE/MAX Dark Blue oficial) |
| `--navy-deep` | `#04225E` | Gradiente de fundo (topo → base) em todas as páginas |
| `--red` | `#DC1C2E` | RE/MAX Red oficial — **só** no CTA principal (WhatsApp) |
| `--white` | `#FFFFFF` | Texto, cards translúcidos, logo |
| `--cream` | `#F5F1E8` | Reserva (não usado na direção aprovada — mantido caso se queira uma variante clara no futuro) |

- **Tipografia:** Montserrat (600–800) nos títulos — aproxima o Gotham institucional
  usado pela RE/MAX; Inter (400–600) no corpo/legendas.
- **Logo:** wordmark oficial completo ("IMÓVEIS REMAX VIP I" + pin 4 cores) no topo
  do Hub; recorte compacto só do pin nas páginas individuais.
- **Cards:** estilo "glass" — fundo `rgba(255,255,255,.06–.08)`, borda `rgba(255,255,255,.14–.16)`,
  cantos arredondados (11–14px), consistente entre Hub e páginas individuais.
- Mockups validados no companion visual: variação **A** (Hub) e **B** (página individual),
  ambas em fundo navy — nenhuma variante clara foi aprovada para uso.

## 3. Estrutura de páginas

### 3.1 Hub (`equipe.imobiliariavip.com` — domínio exato a confirmar na execução)

- Header: logo oficial completo, título "Nossa Equipe", subtítulo de localização
  ("Litoral Norte · Capão da Canoa / Xangri-lá").
- Grid de cards de corretor: avatar (foto ou iniciais como placeholder), nome, cargo,
  CRECI. Cada card linka para o subdomínio individual do corretor.
- Sem paginação — lista única (equipe atual tem ~16-19 corretores ativos, cabe em uma
  rolagem).

### 3.2 Página individual (`<slug>.imobiliariavip.com`)

Segue o padrão validado nos sites de referência (`henrique-orsato-mkt`, `roberto-da-rosa-mkt`):

- Header: recorte do pin da logo, avatar do corretor, eyebrow "Corretor(a) de Imóveis",
  nome, linha de cargo/localização ("RE/MAX VIP I · Capão da Canoa/RS").
- CTA principal (vermelho): "Falar no WhatsApp" → `wa.me/<wa_phone>` com mensagem
  pré-preenchida.
- Cards de link: Instagram pessoal, imóveis disponíveis (destino a definir — ver
  pendência 6.3), avaliações Google (link institucional único, compartilhado por
  todos, já existente em `links-e-contatos.txt`).
- Sticky CTA de WhatsApp no mobile (igual às referências).
- Footer: ícones sociais, CRECI, nome, copyright.
- SEO: meta tags Open Graph/Twitter + `JSON-LD` (`Person` + `RealEstateAgent`),
  seguindo o padrão de `henrique-orsato-mkt/site/index.html`.

## 4. Arquitetura técnica

**Padrão: template + dados**, para escalar com uma equipe que cresce (hoje ~19
corretores ativos, sem teto).

```
remaxvip-link-in-bio-equipe/
├── data/
│   └── equipe.json          # 1 entrada por corretor: slug, nome, wa_phone,
│                             # instagram, avatar, creci, role, cargo
├── templates/
│   ├── hub.html              # template do Hub (placeholders {{...}})
│   └── agent.html            # template da página individual
├── assets/
│   ├── css/styles.css        # design system único (navy/red/branco, Montserrat+Inter)
│   ├── js/reveal.js          # scroll-reveal compartilhado (mesmo padrão das referências)
│   └── img/                  # logo oficial (recortes já preparados) + avatares
├── scripts/
│   └── build.mjs             # lê data/equipe.json, gera dist/
├── dist/                     # gerado pelo build — não versionado
│   ├── index.html            # Hub
│   └── <slug>/index.html     # 1 por corretor
├── Dockerfile
├── nginx.conf
└── docs/
```

- `scripts/build.mjs` (Node, sem framework) lê `data/equipe.json`, faz replace dos
  placeholders nos templates e escreve `dist/index.html` + `dist/<slug>/index.html`
  para cada corretor. Adicionar um corretor novo = 1 entrada no JSON + rebuild.
- Sem dependência de banco de dados em runtime — o site é 100% estático após o build,
  igual às referências. Dados vêm do CRM só como fonte de verdade no momento do
  build/atualização, não como integração ao vivo.

## 5. Domínio e deploy

- Domínio real confirmado: **`imobiliariavip.com`** (já em uso em produção —
  `crm.imobiliariavip.com` é o Vip-Crm, ver `Vip-Crm/docs/ECOSSISTEMA-INFRA-COMPARTILHADA.md`).
- Um único serviço no EasyPanel (Docker/nginx) responde por **todos** os subdomínios
  (`equipe.imobiliariavip.com` + um `<slug>.imobiliariavip.com` por corretor). O
  `nginx.conf` usa `map $host $slug { ~^(?<s>[^.]+)\. $s; }` para resolver, por
  Host header, qual pasta de `dist/` servir — sem precisar de um container por pessoa.
- Cada subdomínio precisa ser cadastrado manualmente em **Domains** no EasyPanel (ou,
  se o provedor de DNS suportar, um registro **wildcard** `*.imobiliariavip.com → IP
  da VPS` simplifica a parte de DNS; o cadastro do domínio específico no EasyPanel
  ainda seria necessário por serviço, a confirmar na execução).
- Deploy via GitHub (auto-deploy no push para `main`), mesmo padrão do
  `henrique-orsato-mkt`.

## 6. Dados e pendências

### 6.1 Fonte de verdade do roster
Corretores exibidos = `broker_profiles` no Supabase VipHub (`lrsfbtkrnptsgijcmnmb`)
onde **`is_agent = true`**. Query de exportação:

```sql
select display_name, role, wa_phone, avatar_url, is_agent, is_backoffice
from broker_profiles
where is_agent = true
order by case role when 'admin' then 1 when 'gestor' then 2 else 3 end, display_name;
```

`docs/equipe-remax-vip.md` (no Vip-Crm) tem uma lista complementar com e-mails e
WhatsApp de 22 pessoas via export manual do grupo — útil como cross-check, mas não é
a fonte de verdade final (pode incluir Staff/T.I. fora do filtro `is_agent`).

### 6.2 Campos pendentes de coleta manual
`broker_profiles` **não tem** colunas de Instagram nem CRECI. Para cada corretor
listado, ainda faltam: **foto**, **Instagram**, **CRECI**. O build inicial usa
placeholders (iniciais do nome como avatar, campos `instagram`/`creci` vazios/ocultos
no template até serem preenchidos).

### 6.3 Destino do link "Imóveis disponíveis"
Ainda não decidido — opções a avaliar na execução: portfólio público já existente no
Vip-Crm (`ImoveisPortfolioView.tsx`, se houver rota pública), página de listagens do
escritório no site oficial da RE/MAX, ou omitir esse card até existir um destino real.

## 7. Fora de escopo (por ora)

- Integração ao vivo com o Supabase do Vip-Crm (o site é gerado a partir de um
  snapshot dos dados, não consulta o banco em runtime).
- Autenticação/área logada — site 100% público.
- CMS ou painel de edição — dados editados diretamente em `data/equipe.json` via git.
