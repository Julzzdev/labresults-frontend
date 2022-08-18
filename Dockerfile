FROM node:14-alpine AS build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g @angular/cli@10.0.3 

COPY . /app
RUN npm run build

FROM nginx:1.13.12-alpine
COPY --from=build-step /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf