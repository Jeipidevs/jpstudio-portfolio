FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
COPY data ./data
COPY src ./src
COPY scripts ./scripts
COPY templates ./templates
COPY assets ./assets
RUN node scripts/build.mjs
RUN cp -r assets dist/assets

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK CMD wget -q --spider http://localhost/ || exit 1
