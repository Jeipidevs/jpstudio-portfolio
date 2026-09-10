# RE/MAX VIP I — Link in Bio da Equipe

Hub da equipe + **uma página individual por corretor**, geradas automaticamente a partir de `data/equipe.json`. Cada corretor ganha um domínio próprio (`<slug>.imobiliariavip.com`), todos servidos pelo mesmo container.

> 🧩 **Gerado por dados, não escrito à mão.** Um script Node lê o JSON da equipe, aplica os templates e escreve o site estático em `dist/`. Adicionar um corretor = uma entrada no JSON + build.

---

## 🏗️ Arquitetura

```
data/equipe.json   ──►   scripts/build.mjs   ──►   dist/   ──►   nginx (Docker)
  (fonte de verdade)        (aplica templates/)     (saída gerada)
```

- **Stack:** Node puro — sem framework, sem dependência de runtime.
- **Regra central:** `data/equipe.json` é a **fonte de verdade**; `dist/` é **saída gerada**. Nunca edite `dist/` à mão — o próximo build apaga.

---

## 🚀 Comandos

```bash
npm run build      # gera dist/ a partir do JSON + templates
npx serve dist     # pré-visualizar em http://localhost:3000
npm test           # node --test
```

---

## ➕ Adicionar um corretor

1. Nova entrada em `data/equipe.json`: `slug`, `name`, `role`, `location`, `whatsapp`, `instagram`, `avatar`, `creci`.
2. `npm run build` e conferir localmente.
3. `npm test` verde.
4. Commit e push em `main` (redeploy automático no EasyPanel).
5. No EasyPanel, cadastrar `<slug>.imobiliariavip.com` apontando para este mesmo serviço, com HTTPS ativo.

---

## ☁️ Deploy (EasyPanel)

1. **DNS:** registro **A** (ou wildcard `*.imobiliariavip.com`) apontando para o IP da VPS.
2. EasyPanel → **Create → App** → Source: GitHub, branch `main`, Dockerfile na raiz.
3. **Port:** 80.
4. **Domains:** `equipe.imobiliariavip.com` + um domínio por corretor (`<slug>.imobiliariavip.com`), todos no mesmo serviço, com HTTPS (Let's Encrypt).
5. Cada `git push` em `main` dispara redeploy automático.

---

## 📐 Regras específicas

- **Validar o dígito 9** nos números de WhatsApp antes de publicar — número errado é lead perdido (spec `docs/superpowers/specs/2026-08-19-remaxvip-link-in-bio-design.md`, seção 6.2).
- **SEO por página:** cada corretor precisa de `<title>`, description e Open Graph próprios — a página é o cartão de visita dele.
- **Identidade RE/MAX é da franquia:** logos em `LOGOS/` seguem o manual da marca — não recolorir, distorcer ou recriar.
- **Dado de corretor é dado pessoal:** só publicar foto, Instagram e CRECI com autorização do corretor.
- **Sem framework e sem dependência de runtime** — manter assim.

---

## 📋 Pendências de dados

- **Roster final:** exportar `broker_profiles where is_agent = true` do Supabase do VipHub (ver spec).
- **Foto, Instagram e CRECI** de cada corretor — hoje `null` em `data/equipe.json`.

---

## 📚 Documentação

Lei local: [`CLAUDE.md`](./CLAUDE.md) · contexto de marca: `BRIEFMARCA.md` e `docs/`.
