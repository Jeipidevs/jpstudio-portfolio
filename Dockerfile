FROM node:22-alpine

WORKDIR /app

# Copia arquivos da aplicação
COPY package.json ./
COPY server.js ./
COPY public ./public

# Configuração de porta de produção (EasyPanel / VPS / Coolify)
ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
