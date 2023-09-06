FROM node:18.17.1-alpine3.18

WORKDIR /app-frontend

COPY package*.json .

RUN npm install

COPY .. .

RUN npm run build
