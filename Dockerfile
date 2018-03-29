FROM node:9.8.0-slim

WORKDIR /usr/src/morpheus

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "deploy"]

