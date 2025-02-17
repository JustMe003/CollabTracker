FROM node:14 AS base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .


FROM base AS production

ENV NODE_PATH=./build

RUN npm run build