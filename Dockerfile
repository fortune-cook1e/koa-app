 FROM node:12-alpine

 ENV NODE_ENV=production

 WORKDIR /app

 COPY . .

 RUN yarn install && yarn build 

 EXPOSE 3003

 CMD ["node","dist/app.js"]
 