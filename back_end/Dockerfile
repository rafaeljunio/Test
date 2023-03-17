FROM node:lts-alpine as builder

ENV DOCKERIZE_VERSION v0.6.1
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install \
  && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && apk update \
  && apk add openssl \
  && apk add libretls
COPY . .
RUN yarn build

FROM node:lts-alpine

RUN apk update \
  && apk add openssl \
  && apk add libretls

WORKDIR /usr/app
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/local/bin/dockerize /usr/local/bin/dockerize

EXPOSE 3433
EXPOSE 9100

CMD [ "node", "dist/src/shared/infra/http/server.js" ]
