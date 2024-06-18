FROM node:20.14.0-alpine3.20

WORKDIR /root/app
COPY package.json .

RUN ["npm", "install"]

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]