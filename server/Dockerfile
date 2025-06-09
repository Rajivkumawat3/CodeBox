FROM node:14

WORKDIR /server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD [ "node", "app.js" ]