import express  from "express";
import imageCtrl from "../Controllers/imageController";
import multer from "multer";


const upload = multer({
    storage: multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null, "uploads/")
        },
        filename: function(req,file,cb)
        {
            cb(null,file.filename+"-"+Date.now()+"png")
        }
    })
})  

const router = express.Router();



router.post("/postImage/:id",upload.single('image'),imageCtrl.uploadImage);

export default router;