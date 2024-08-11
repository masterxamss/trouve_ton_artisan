FROM node:18-alpine

WORKDIR /cv-react-repo

EXPOSE 5173

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]