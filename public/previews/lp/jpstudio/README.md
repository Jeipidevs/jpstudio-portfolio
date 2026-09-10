# jpstudio.ia — Landing Page

Landing page institucional da **JPStudio.ia** — consultoria estratégica em Marketing & IA.

> "Você decide. A IA faz o resto."

---

## Stack

- HTML5 + CSS3 vanilla (single-file)
- Google Fonts: Instrument Serif · JetBrains Mono · Fraunces
- Zero dependências, zero build step
- ~34 KB

## Estrutura

```
jpstudio-lp/
├── index.html       # landing page completa
├── README.md
└── .gitignore
```

## Desenvolvimento local

Por ser um arquivo único, basta abrir `index.html` no navegador. Para servir via HTTP local:

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

---

## Deploy em VPS (Nginx)

### 1. Subir os arquivos

```bash
# do seu local, via rsync
rsync -avz --delete ./ usuario@SEU-IP:/var/www/jpstudio-lp/

# ou via git pull no servidor
ssh usuario@SEU-IP
cd /var/www/jpstudio-lp
git pull origin main
```

### 2. Configuração Nginx (`/etc/nginx/sites-available/jpstudio`)

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name ia.jpstudio.tech;

    root /var/www/jpstudio-lp;
    index index.html;

    # gzip para fontes/HTML
    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml;
    gzip_min_length 256;

    # cache leve para HTML, longo para assets
    location = /index.html {
        add_header Cache-Control "no-cache, must-revalidate";
    }

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 3. Ativar e recarregar

```bash
sudo ln -s /etc/nginx/sites-available/jpstudio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. HTTPS com Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ia.jpstudio.tech
```

---

## Auto-deploy via webhook (opcional)

Para deploy automático a cada push no `main`, configure um webhook do GitHub apontando para o VPS, ou use um workflow do GitHub Actions com SSH:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/jpstudio-lp
            git pull origin main
            sudo systemctl reload nginx
```

---

© 2026 JPSTUDIO.IA · Capão da Canoa · Brasil
