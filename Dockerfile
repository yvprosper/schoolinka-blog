
FROM node:18-slim

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN NODE_ENV=production yarn build && yarn build:docs

EXPOSE 30029 30030

CMD [ "node", "build/src/start.js" ]