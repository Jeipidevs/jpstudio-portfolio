FROM nginx:1.27-alpine

# Serve on port 3000 (EasyPanel expects the app on :3000)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
