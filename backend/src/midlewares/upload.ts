import path from 'path';
import multer from 'multer';

// Configure multer storage settings
const storage = multer.diskStorage({
    // Define destination folder for uploaded files
    destination: (req: any, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, 'uploads/'); // Destination folder for storing files
    },
    // Define filename for uploaded files
    filename: (req: any, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique filename with original extension
    },
});

// Create multer instance with configured storage
const upload = multer({ storage });

export default upload;
