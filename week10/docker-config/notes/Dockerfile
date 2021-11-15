FROM node:14-alpine

WORKDIR '/app'

COPY ./notes/package.json ./
COPY ./notes/package-lock.json ./
COPY ./notes/app.mjs ./
COPY ./notes/index.mjs ./

RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start"]