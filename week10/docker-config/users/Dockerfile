FROM node:14-alpine

WORKDIR '/app'

COPY ./users/package.json ./
COPY ./users/package-lock.json ./
COPY ./users/user-serialize.mjs ./
COPY ./users/user-server.mjs ./

RUN npm install
EXPOSE 3001

CMD ["npm", "run", "start"]
