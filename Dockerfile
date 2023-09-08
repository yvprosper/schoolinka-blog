
FROM node:18-slim

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN NODE_ENV=production yarn build && yarn build:docs

EXPOSE 40121 40122

CMD [ "node", "build/src/start.js" ]