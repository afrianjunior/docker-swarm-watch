FROM node:10.13.0-alpine AS build

WORKDIR /app

ADD . .
RUN yarn install
RUN yarn build

FROM node:10.13.0-alpine

WORKDIR /app

COPY --from=build /app/package.json package.json
COPY --from=build /app/yarn.lock yarn.lock
COPY --from=build /app/public public
COPY --from=build /app/server server

RUN yarn install --production

ENV NODE_ENV="production"

EXPOSE 8080
EXPOSE 3333

CMD ["node", "server/main.js"]