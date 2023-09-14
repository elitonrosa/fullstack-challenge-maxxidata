FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app-frontend

COPY package*.json .

RUN npm install

COPY . .

ARG EXTERNAL_API_URL
ENV EXTERNAL_API_URL=${EXTERNAL_API_URL}
ARG NEXT_PUBLIC_INTERNAL_API_URL
ENV NEXT_PUBLIC_INTERNAL_API_URL=${NEXT_PUBLIC_INTERNAL_API_URL}

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]