# Página estática (link in bio) servida por Nginx — pronta para EasyPanel
FROM nginx:1.27-alpine

# Configuração do servidor (cache, gzip, headers de segurança)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Arquivos do site
COPY . /usr/share/nginx/html

# Limpa arquivos que não devem ir para a web root
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/.dockerignore \
          /usr/share/nginx/html/.gitignore \
          /usr/share/nginx/html/README.md

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
