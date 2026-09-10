# Vanessa de Melos · Link in Bio (RE/MAX VIP)

Página estática (link in bio) da corretora **Vanessa de Melos** — RE/MAX VIP, Capão da Canoa/RS.
Clone estrutural do site da Josi Menezes (`../josi-menezes-linkinbio`).

- **Domínio:** `vanessa.imobiliariavip.com`
- **WhatsApp:** (51) 98042-9433 · **Instagram:** [@vanessademelos](https://www.instagram.com/vanessademelos/) · **CRECI:** 88682
- **Imóveis em destaque:** Residencial Paraíso Ap. 705 (R$ 1.150.000) e Edifício Nair Soares Ap. 603 (R$ 412.000)
- **Meta Pixel:** não configurado (remover/adicionar depois, se necessário).

## ⚠️ Pendências
- `assets/vanessa-avatar.jpg` é um **placeholder** (monograma "VM"). Substituir pela foto real da Vanessa (recomendado ~236×236, quadrada, rosto centralizado).

## Deploy
Imagem Nginx (mesma da Josi). Pronta para EasyPanel via Dockerfile.

```bash
docker build -t vanessa-linkinbio .
docker run --rm -p 8080:80 vanessa-linkinbio
```
