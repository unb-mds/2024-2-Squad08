FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

ENV VITE_PORT=1515
ENV HOST=0.0.0.0

EXPOSE 1515

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]