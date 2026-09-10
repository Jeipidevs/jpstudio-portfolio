FROM nginx:1.27-alpine

# Configuração do servidor (headers de segurança + SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Conteúdo estático do site
COPY index.html robots.txt sitemap.xml site.webmanifest og.jpg /usr/share/nginx/html/
COPY fonts/ /usr/share/nginx/html/fonts/
COPY icons/ /usr/share/nginx/html/icons/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80
