ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} as builder

ENV TIMEZONE=Europe/Paris \
  LANG=fr_FR.UTF-8

WORKDIR /usr/src/app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

FROM node:${NODE_VERSION} as production

WORKDIR /usr/src/app

ADD package.json .
ADD *.lock .

RUN apk add --no-cache tzdata \
  && cp /usr/share/zoneinfo/${TIMEZONE} /etc/localtime \
  && echo "${TIMEZONE}" > /etc/timezone \
  && apk del tzdata

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=true

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["yarn", "start:prod"]
