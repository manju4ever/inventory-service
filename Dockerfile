FROM node:10.15.1-slim

WORKDIR /usr/src

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "deploy"]

