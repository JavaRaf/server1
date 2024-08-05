"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("./config/multer"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("./config/prisma");
const fs_1 = __importDefault(require("fs"));
const routers = express_1.default.Router();
// Rota raiz
routers.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../public/page/index.html'));
});
routers.get("/images", async (req, res) => {
    try {
        const images = await (0, prisma_1.getAllImages)();
        if (images.length === 0) {
            return res.status(404).json({
                message: "Nenhuma imagem encontrada"
            });
        }
        res.status(200).json({
            message: "Imagens carregadas com sucesso",
            images,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erro no servidor ao carregar imagens",
            error: error.message,
        });
    }
});
// Upload de imagens
routers.post("/upload", multer_1.default.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Nenhum arquivo enviado"
            });
        }
        const image = await (0, prisma_1.addImage)({
            filename: req.file.filename,
            size: req.file.size,
        });
        res.status(200).json({
            message: "Arquivo enviado com sucesso",
            file: image,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erro no servidor ao fazer upload do arquivo",
            error: error.message,
        });
    }
});
// Deletar registro no banco e imagens
routers.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedImage = await (0, prisma_1.deleteImage)(Number(id));
        if (!deletedImage) {
            return res.status(404).json({
                message: "Imagem não encontrada"
            });
        }
        // Deletar imagem fisicamente
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, `../public/uploads/${deletedImage.filename}`));
        res.status(200).json({
            message: "Imagem deletada com sucesso",
            deletedImage
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erro no servidor ao deletar a imagem",
            error: error.message,
        });
    }
});
exports.default = routers;
