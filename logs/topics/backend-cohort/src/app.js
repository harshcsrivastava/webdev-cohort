import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/auth/auth.routes.js";
import ApiError from "./utils/api-error.js";
import ApiResponse from "./utils/api-response.js";
import ownerRoutes from "./modules/ipl-ms/routes/owner.routes.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2, //2mb - may silently fail
    },
    fileFilter: (req, file, cb) => {
        const allowedList = ["image/jpeg", "image/png", "application/pdf"];

        if (allowedList.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("File not supported"), false);
        }
    },
});

app.post("/upload", (req, res) => {
    upload.single("file")(req, res, (err) => {
        if (err?.code === "LIMIT_FILE_SIZE") {
            return res.send("File too large");
        }
        return res.send("Uploaded"); // or next()
    });
});

// refer notion for file-upload

app.get("/health", (req, res) => {
    return ApiResponse.ok(res, "Up and Runnning");
});
app.use("/api/auth", authRoute);
app.use("/api/owners", ownerRoutes);

// Catch-all for undefined routes
app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

export default app;
