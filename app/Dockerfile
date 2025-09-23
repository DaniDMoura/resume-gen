# Etapa 1: Construção
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public

RUN npm install --only=production

EXPOSE 3030

CMD ["npm", "start"]