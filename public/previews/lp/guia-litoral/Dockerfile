FROM nginx:1.27-alpine
COPY *.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/styles.css
COPY nav.js /usr/share/nginx/html/nav.js
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
