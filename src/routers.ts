import express from 'express';
import multerConfig from './config/multer';
import path from 'path';
import { addImage, deleteImage, getAllImages } from './config/prisma';
import fs from 'fs';

const routers = express.Router();

// Rota raiz
routers.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/page/index.html'));
});

routers.get("/images", async (req, res) => {
    try {
        const images = await getAllImages();

        if (images.length === 0) {
            return res.status(404).json({
                message: "Nenhuma imagem encontrada"
            });
        }
        res.status(200).json({
            message: "Imagens carregadas com sucesso",
            images,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro no servidor ao carregar imagens",
            error: (error as Error).message,
        });
    }
});

// Upload de imagens
routers.post("/upload", multerConfig.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Nenhum arquivo enviado"
            });
        }

        const image = await addImage({
            filename: req.file.filename,
            size: req.file.size,
        });

        res.status(200).json({
            message: "Arquivo enviado com sucesso",
            file: image,
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro no servidor ao fazer upload do arquivo",
            error: (error as Error).message,
        });
    }
});
// Deletar registro no banco e imagens
routers.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedImage = await deleteImage(Number(id)); 

        if (!deletedImage) {
            return res.status(404).json({
                message: "Imagem não encontrada"
            });
        }

        // Deletar imagem fisicamente
        fs.unlinkSync(path.resolve(__dirname, `../public/uploads/${deletedImage.filename}`));
        
        res.status(200).json({
            message: "Imagem deletada com sucesso",
            deletedImage
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro no servidor ao deletar a imagem",
            error: (error as Error).message,
        });
    }
});

export default routers;

