# Thairon Bio - Landing Page

Landing page profissional para Gestor de Tráfego Pago.

## 🚀 Como fazer o Deploy na Hostinger VPS

### Opção 1: Usando Docker (Recomendado)

1. **Acesse sua VPS via SSH:**
   ```bash
   ssh root@seu_ip_vps
   ```

2. **Clone o repositório:**
   ```bash
   git clone https://github.com/Jeipidevs/thairon-bio.git
   cd thairon-bio
   ```

3. **Suba o container:**
   ```bash
   docker-compose up -d --build
   ```
   *O site estará disponível na porta 8080 (ou na porta que você configurou no docker-compose.yml).*

### Opção 2: Usando Nginx diretamente na VPS

1. **Instale o Nginx na VPS.**
2. **Copie os arquivos para o diretório padrão:**
   ```bash
   cp -r . /var/www/html/
   ```

---

## 🔄 Automação CI/CD (GitHub Actions)

Este repositório já vem configurado com um workflow para deploy automático. Para ativar:

1. Vá em **Settings > Secrets and variables > Actions** no seu repositório GitHub.
2. Adicione os seguintes Secrets:
   - `SSH_HOST`: O IP da sua VPS.
   - `SSH_USER`: Normalmente `root`.
   - `SSH_PRIVATE_KEY`: Sua chave SSH privada (gerada com `ssh-keygen`).

Sempre que você fizer um `git push`, o site será atualizado automaticamente na VPS.

---
Desenvolvido por **DevHub Core**.
