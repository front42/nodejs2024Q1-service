FROM node:20.9 AS builder

WORKDIR /app

COPY package*.json .

COPY prisma ./prisma

RUN npm install

COPY . .

FROM node:20.9-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev:migrate"]
