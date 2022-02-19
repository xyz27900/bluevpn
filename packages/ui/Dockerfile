# Build stage
FROM node:lts-alpine as builder
ARG ACCESS_TOKEN

WORKDIR /app
COPY . .
RUN echo //npm.pkg.github.com/:_authToken=$ACCESS_TOKEN >> .npmrc
RUN npm install
RUN npm run build

# Release stage
FROM nginx:alpine as release

RUN apk add openssl
RUN curl https://get.acme.sh | sh

WORKDIR /app
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp
EXPOSE 443/tcp
