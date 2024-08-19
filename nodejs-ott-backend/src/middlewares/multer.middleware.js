import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uuidv4()}.${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/mp3', 'video/mkv', 'video/webm'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPG, JPEG, PNG images and MP4, MP3, MKV, WEBM videos are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 50 // 50 MB file size limit
    }
});

export default upload;