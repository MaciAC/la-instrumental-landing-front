FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_API_URL=/api

ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 && npm install -g serve

COPY --chown=nodejs:nodejs --from=builder /app/build ./build

USER nodejs

EXPOSE 3000

CMD ["npm" "start"]
