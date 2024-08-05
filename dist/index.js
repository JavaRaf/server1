"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = __importDefault(require("./routers"));
const path_1 = __importDefault(require("path"));
// envs
dotenv_1.default.config();
// express
const app = (0, express_1.default)();
//usar json pra comunicar
app.use(express_1.default.json());
// servir arquivos estaticos 
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
// Rotas
app.use(routers_1.default);
//escutar - servir
app.listen(process.env.PORT, () => {
    console.log(`servidor rodando em ${process.env.HOST}${process.env.PORT}`);
});
