"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllImages = getAllImages;
exports.addImage = addImage;
exports.deleteImage = deleteImage;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getAllImages() {
    return prisma.image.findMany();
}
async function addImage(imageInfo) {
    return prisma.image.create({
        data: {
            filename: imageInfo.filename,
            size: imageInfo.size,
        },
    });
}
async function deleteImage(id) {
    return prisma.image.delete({
        where: {
            id: id,
        },
    });
}
exports.default = prisma;
