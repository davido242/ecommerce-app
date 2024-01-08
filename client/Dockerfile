FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /user/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.next ./.next

EXPOSE 3000

# Start the app Normally, I run npm run dev
# CMD ["npm", "start"]
CMD ["npm", "run dev"]