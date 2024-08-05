import express from 'express';
import dotenv from 'dotenv';
import routers from './routers';
import path from 'path';

// envs
dotenv.config();

// express
const app = express();

//usar json pra comunicar
app.use(express.json());

// servir arquivos estaticos 
app.use(express.static(path.resolve(__dirname, '../public')));

// Rotas
app.use(routers)

//escutar - servir
app.listen(process.env.PORT, () => {
  console.log(`servidor rodando em ${process.env.HOST}${process.env.PORT}`);
});

