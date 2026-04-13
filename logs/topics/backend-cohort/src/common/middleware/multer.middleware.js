import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    // image is stored on disk
    destination: function (req, file, cb) {
        // cb is callback
        cb(null, "public/uploads"); // without / vrna drive pe chala jayega
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); //get extension name
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});


export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, //5mb
    },
    fileFilter: (req, file, cb) => {
        const allowedList = ["image/jpeg", "image/png", "image/gif", "image/webp"];

        if (allowedList.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("File not supported"), false);
        }
    },
});
