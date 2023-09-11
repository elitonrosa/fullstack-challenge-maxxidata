FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app-frontend

COPY package*.json .

RUN npm install

COPY . .