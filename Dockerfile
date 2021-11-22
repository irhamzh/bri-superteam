FROM node:14

WORKDIR /app

COPY package.json ./
COPY *.lock ./

RUN npm install -g npm@latest

RUN rm -rf node_modules

RUN npm install

RUN npm i --save-dev chalk@2.4.2 ansi-styles@3.2.1

RUN npm install -g serve

COPY . .

RUN npm run build:production

CMD serve -s build