import express from 'express';
import dotenv from 'dotenv';
import routers from './routers';
import path from 'path';
import cors from "cors"




// envs
dotenv.config();

// express
const app = express();

//malditos erros de cors
app.use(cors());

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

