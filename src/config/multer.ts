import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dirPath: string = path.resolve(__dirname, '..', '..', 'public', 'uploads');


if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, dirPath);
    },
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, extension);
        let finalName = file.originalname;
        let count = 1;

        while (fs.existsSync(`${dirPath}/${finalName}`)) {
            finalName = `${baseName}(${count})${extension}`;
            count++;
        }

        callback(null, finalName);
    }
});

const multerConfig = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter: (req, file, callback) => {
        const supportedMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
        ];

        if (supportedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(null, false); //precisa de uma message de erro que nao consegui colocar
        }
    }
});

export default multerConfig;

