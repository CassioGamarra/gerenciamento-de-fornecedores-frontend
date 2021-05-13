#fase 1 - Criando uma build
FROM node:latest as angular 
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

#Fase 2 - Utilizando o Nginx
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular  app/dist/gerenciamento-de-fornecedores-frontend /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf