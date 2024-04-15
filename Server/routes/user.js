import express from "express";
import { getMyProfile, login, logout, nice, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import Notemaking from "../Fornotemaking.js";
import Grammerly from "../Forgrammerly.js";
import Extract from "../ForExtracting.js";
import multer from "multer";
import Solve from "../ForSolving.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Destination directory
    },
    filename: function (req, file, cb) {
        // Use timestamp to avoid filename conflicts
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

router.post("/upload",upload.single('image'),Extract)
router.post("/solve",upload.single('imagesolve'),Solve)
router.post("/note",Notemaking)
router.post("/gram",Grammerly)
router.post("/new", register);
router.post("/login", login);


router.get("/nice",nice);
router.get("/logout",isAuthenticated, logout);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
