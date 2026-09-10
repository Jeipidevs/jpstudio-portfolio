# JPStudio — Landing Page (bio.jpstudio.tech)

Landing page / link-in-bio da JPStudio (Tráfego pago, Automações & IA, Sistemas & Sites).

## Stack

- HTML único auto-empacotado (`index.html`) — assets embutidos e descompactados no client.
- Servido via **nginx** (Docker) na porta `3000`.

## Deploy

Hospedado no EasyPanel (projeto `web-sites`, serviço `site-bio-jp`) com build **Dockerfile** e `autoDeploy` no branch `main`. Domínio: https://bio.jpstudio.tech

Push no `main` → deploy automático.

## Desenvolvimento local

```bash
docker build -t jpstudio-lp .
docker run --rm -p 3000:3000 jpstudio-lp
# abre http://localhost:3000
```
