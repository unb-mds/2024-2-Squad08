FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1515

CMD ["npm", "run", "dev", "--", "--host"]