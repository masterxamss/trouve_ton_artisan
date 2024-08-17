# Estágio de construção
FROM node:14 AS build

# Define o diretório de trabalho
WORKDIR /src

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila a aplicação React para produção
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Remove o arquivo do default server configurado no Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos gerados na pasta build para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposição da porta onde a aplicação será executada
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]