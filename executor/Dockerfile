FROM node:14-alpine

WORKDIR /executor

RUN apk add python3

RUN apk add g++


COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD ["node", "app.js"]