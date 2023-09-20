FROM node:18-alpine

WORKDIR /app-backend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN echo '#!/bin/sh' > entrypoint.sh && \
  echo 'if [ ! -f seed_complete ]; then' >> entrypoint.sh && \
  echo '  npm run seed:all' >> entrypoint.sh && \
  echo '  touch seed_complete' >> entrypoint.sh && \
  echo 'fi' >> entrypoint.sh && \
  echo 'npm run start:dev' >> entrypoint.sh && \
  chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]