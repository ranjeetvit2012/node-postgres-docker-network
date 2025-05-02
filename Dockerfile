FROM node:22-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm i 

RUN npm install -g typescript

COPY . .

ENV DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432
RUN echo DATABASE_URL
RUN npx prisma migrate dev
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "node","dist/index.js" ]
