"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dirPath = path_1.default.resolve(__dirname, '..', '..', 'public', 'uploads');
if (!fs_1.default.existsSync(dirPath)) {
    fs_1.default.mkdirSync(dirPath, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, dirPath);
    },
    filename: (req, file, callback) => {
        const extension = path_1.default.extname(file.originalname);
        const baseName = path_1.default.basename(file.originalname, extension);
        let finalName = file.originalname;
        let count = 1;
        while (fs_1.default.existsSync(`${dirPath}/${finalName}`)) {
            finalName = `${baseName}(${count})${extension}`;
            count++;
        }
        callback(null, finalName);
    }
});
const multerConfig = (0, multer_1.default)({
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
        }
        else {
            callback(null, false); //precisa de uma message de erro que nao consegui colocar
        }
    }
});
exports.default = multerConfig;
