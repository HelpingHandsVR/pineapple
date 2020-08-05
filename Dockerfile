FROM mhart/alpine-node:12 as dependencysleketon

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

FROM dependencysleketon as proddependencies

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

FROM dependencysleketon as build

COPY --from=devdependencies \
  /app/node_modules \
  /app/node_modules

COPY --from=devdependencies \
  /app/packages/frontend/node_modules \
  /app/packages/frontend/node_modules

COPY --from=devdependencies \
  /app/packages/backend/node_modules \
  /app/packages/backend/node_modules

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
