 FROM node:lts-alpine

 WORKDIR /app

 COPY package*.json /app/

 RUN npm install

 COPY . .

 ENTRYPOINT ["npm", "run", "start"]