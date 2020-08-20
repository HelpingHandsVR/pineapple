FROM mhart/alpine-node:12 as dependencyskeleton

RUN mkdir -p /app/packages

WORKDIR /app

COPY \
  package.json \
  yarn.lock \
  lerna.json \
  tsconfig.json \
  ./

COPY \
  packages/backend/package.json \
  packages/backend/tsconfig.json \
  ./packages/backend/

COPY \
  packages/frontend/package.json \
  packages/frontend/tsconfig.json \
  ./packages/frontend/

COPY \
  patches \
  ./patches/

RUN yarn global add lerna

##
# SOURCES
##

FROM dependencyskeleton as proddependencies

ENV NODE_ENV=production

RUN lerna bootstrap

##
# DEPS
##

FROM proddependencies as devdependencies

ENV NODE_ENV=development

RUN lerna bootstrap

##
# BUILD
##

FROM devdependencies as build

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ARG GRAPHQL_ENDPOINT
ENV GRAPHQL_ENDPOINT $GRAPHQL_ENDPOINT

ARG SENTRY_DSN
ENV SENTRY_DSN $SENTRY_DSN

ARG SENTRY_DISABLED
ENV SENTRY_DISABLED $SENTRY_DISABLED

ARG SENTRY_DISABLE_CLIENT_SIDE
ENV SENTRY_DISABLE_CLIENT_SIDE $SENTRY_DISABLE_CLIENT_SIDE

ENV SENTRY_DISABLE_SERVER_SIDE $SENTRY_DISABLE_SERVER_SIDE
ARG SENTRY_DISABLE_SERVER_SIDE

ARG ASAYER_ENABLED
ENV ASAYER_ENABLED $ASAYER_ENABLED

ARG ASAYER_PROJECT_ID
ENV ASAYER_PROJECT_ID $ASAYER_PROJECT_ID

COPY . .

RUN lerna run build --stream

##
# RUNTIME
##

FROM mhart/alpine-node:slim-12 as runtime-base

WORKDIR /app

RUN apk add supervisor

COPY \
  conf/supervisord.conf \
  ./

COPY \
  conf/.profile \
  /root/

COPY \
  bin/ \
  /app/bin/

FROM runtime-base as runtime

COPY --from=proddependencies /app/node_modules /app/node_modules
COPY --from=proddependencies /app/packages/backend/node_modules /app/packages/backend/node_modules
COPY --from=proddependencies /app/packages/frontend/node_modules /app/packages/frontend/node_modules

COPY --from=build /app/packages/backend/build /app/packages/backend
COPY --from=build /app/packages/frontend/.nuxt /app/packages/frontend/.nuxt

COPY --from=build /app/tsconfig.json \
  /app/

COPY --from=build \
  /app/packages/frontend/nuxt.config.ts \
  /app/packages/frontend/tsconfig.json \
  /app/packages/frontend/

EXPOSE 3000 4000

ENTRYPOINT [ "supervisord", "-c", "/app/supervisord.conf" ]
