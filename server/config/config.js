import dotenv from "dotenv"
import multer from 'multer'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ".jpg"
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })


const port = process.env.port || 3000
const db = process.env.db
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const  REFRESH_TOKEN = process.env.REFRESH_TOKEN

export {
    port,
    db,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    upload
}