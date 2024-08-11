FROM node:18

WORKDIR /trouve_ton_artisan

COPY . /trouve_ton_artisan

RUN npm install

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]

