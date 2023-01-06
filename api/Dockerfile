FROM node:15.5-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN apk update && apk add --no-cache make gcc g++ python2

USER node

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm install
COPY --chown=node:node . .

CMD [ "node", "." ]
