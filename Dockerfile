ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn run build

FROM node:${NODE_VERSION} as production

ENV TIMEZONE=Europe/Paris \
  LANG=fr_FR.UTF-8

WORKDIR /usr/src/app

ADD package.json .
ADD *.lock .

RUN apk add --no-cache tzdata && \
  ln -s /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && \
  echo "${TIMEZONE}" > /etc/timezone

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=true

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["yarn", "start:prod"]
