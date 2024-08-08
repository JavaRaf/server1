# Use a imagem Node.js baseada em Alpine
FROM node:20.15.1-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila o TypeScript (se necessário)
RUN npm run build

# Expõe a porta em que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
