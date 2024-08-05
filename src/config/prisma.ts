import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllImages() {
  return prisma.image.findMany();
}

export async function addImage(imageInfo: { filename: string; size: number }) {
  return prisma.image.create({
    data: {
      filename: imageInfo.filename,
      size: imageInfo.size,
    },
  });
}

export async function deleteImage(id: number) {
  return prisma.image.delete({
    where: {
      id: id,
    },
  });
}

export default prisma;


