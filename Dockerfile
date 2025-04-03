FROM node:20-alpine3.20 AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY .env /app/.env
COPY .env.local /app/.env.local
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
