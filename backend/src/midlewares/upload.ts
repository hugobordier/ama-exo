import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
    cb(null, 'uploads/');
    },
    filename: (req:any, file:any, cb:any) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

export default upload;
