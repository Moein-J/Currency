FROM node:alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000 3002

CMD ["npm", "run", "start:dev"]