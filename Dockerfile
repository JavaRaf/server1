# Use a imagem oficial do Node.js como base
FROM node:18

# Cria e define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila o código TypeScript
RUN npm run build

# Exponha a porta que o app irá usar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
