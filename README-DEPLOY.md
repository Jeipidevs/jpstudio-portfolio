# 🚀 Guia de Hospedagem Oficial — portfolio.jpstudio.tech

Este diretório contém a aplicação unificada e 100% autocontida do **Portfólio Hub JPStudio**.
Todos os previews estáticos, screenshots em alta resolução, fluxos n8n e páginas de showcase interativo já estão empacotados dentro de `public/`.

---

## 📋 Métodos de Hospedagem Prontos

### Opção 1: EasyPanel (Recomendada)
1. No painel do seu EasyPanel (ex: `https://panel.jpstudio.tech`):
2. Clique em **+ New Project** (ou selecione um projeto existente) ➔ **App** ➔ **Github / Git**.
3. Aponte para o repositório ou subpasta `portfolio-hub`.
4. Em **Domains**, adicione o domínio:
   - `portfolio.jpstudio.tech`
5. Em **Port**, certifique-se de que está apontando para a porta `3000` (porta padrão exposta no Dockerfile).
6. Clique em **Deploy**. O EasyPanel irá construir a imagem Docker e ativar o SSL automaticamente via Let's Encrypt!

---

### Opção 2: Docker Compose Direto na VPS
1. Copie o diretório `portfolio-hub` para sua VPS:
   ```bash
   scp -r portfolio-hub root@sua-vps:/opt/portfolio-hub
   ```
2. Acesse a pasta na VPS e suba o container:
   ```bash
   cd /opt/portfolio-hub
   docker compose up -d --build
   ```
3. No seu Nginx Proxy Manager, Traefik ou Cloudflare:
   - Aponte `portfolio.jpstudio.tech` para `http://localhost:3000` (com SSL ativo).

---

### Opção 3: Node.js Nativo com PM2
Se preferir rodar direto no servidor sem Docker:
```bash
cd portfolio-hub
npm start # ou: pm2 start server.js --name "portfolio-hub"
```

---

## 🎯 Configurações Realistas Aplicadas
- **Zero links falsos:** Removidos botões "Ver no Ar" para sistemas locais/protótipos.
- **Sites Oficiais Reais:** Apenas links com domínio público ativo e verificado (ex: `bio.jpstudio.tech`, `henrique.jpstudio.tech`, `monaco.imobiliariavip.com`, `crm.imobiliariavip.com`) possuem o botão `↗️ Acessar Site Oficial`.
- **Showcases Interativos:** Plataformas SaaS White Label abrem demonstrações completas com screenshots reais, arquitetura técnica e botão direto para o WhatsApp do João Pedro.
- **Automações n8n:** 40 fluxos catalogados com visualizador da esteira de gatilho/lógica/ação e CTA para integração comercial.
