import express from "express";
import multer, { memoryStorage } from 'multer'
import { httpAuth } from "../middleware/httpAuth";

const router = express.Router()

import * as img from "../controller/image"
const upload = multer({storage : memoryStorage()})


router.post("/upload",httpAuth,upload.single('coverPhoto'),img.postImage)
router.get("/imageUrl/:imageName",httpAuth,img.getImage)
router.delete("/:imageName",httpAuth,img.deleteImage)


export { router as imgRouter }

