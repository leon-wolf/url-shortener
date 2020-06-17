FROM node:stretch-slim
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 1337
CMD ["node", "index.js"]