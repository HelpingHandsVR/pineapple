FROM mhart/alpine-node:12 as sources

RUN mkdir -p /app/packages

WORKDIR /app

COPY \
  package.json \
  yarn.lock \
  lerna.json \
  tsconfig.json \
  ./

COPY \
  packages/ \
  ./packages/

COPY \
  patches \
  ./patches/

FROM sources as proddependencies

ENV NODE_ENV=production

RUN yarn global add lerna
RUN lerna bootstrap

FROM proddependencies as devdependencies

ENV NODE_ENV=development

RUN lerna bootstrap

FROM devdependencies as build

RUN lerna run build --stream

FROM mhart/alpine-node:slim-12 as runtime

COPY --from=proddependencies /app/node_modules /app/node_modules
COPY --from=proddependencies /app/packages/backend/node_modules /app/packages/backend/node_modules
COPY --from=proddependencies /app/packages/frontend/node_modules /app/packages/frontend/node_modules

COPY --from=build /app/backend/build /app/backend
COPY --from=build /app/frontend/.nuxt /app/frontend/.nuxt

RUN find /app
RUN node /app/backend/index.js
