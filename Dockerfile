 FROM node:12-alpine

 ENV NODE_ENV=production

 WORKDIR /app

 COPY . .

 RUN yarn install && yarn build 

 CMD ["node","dist/app.js"]
 