# Build stage
FROM node:lts-alpine as builder
ARG ACCESS_TOKEN

WORKDIR /app
COPY . .
RUN echo //npm.pkg.github.com/:_authToken=$ACCESS_TOKEN >> .npmrc
RUN npm install
RUN npm run build

#Reselase stage
FROM node:lts-alpine as release
ARG ACCESS_TOKEN

COPY run.sh /etc/periodic/1min/run.sh
RUN echo -e "*\t*\t*\t*\t*\trun-parts /etc/periodic/1min" >> /etc/crontabs/root
RUN chmod +x /etc/periodic/1min/*.sh

WORKDIR /app
COPY .npmrc .
COPY package*.json .
COPY --from=builder /app/dist .
RUN echo //npm.pkg.github.com/:_authToken=$ACCESS_TOKEN >> .npmrc
RUN npm install --only=production
