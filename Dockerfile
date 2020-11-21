FROM node:12.13.1-alpine AS BUILD_IMAGE
ARG MODE
ARG PORT

WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm i -s

COPY . .

RUN if [ "$MODE" = "development" ] ; then npm run build ; else npm run build && apk update && apk add bash && rm -rf /var/cache/apk/* && npm i -g node-prune && npm prune --production && node-prune ; fi

FROM node:12.13.1-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

EXPOSE ${PORT}