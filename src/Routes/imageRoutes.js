import express  from "express";
import { postImage,getImage } from "../Controllers/imageController";
import multer from "multer";
import path from "path";
const router = express.Router();
const app = express();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/");
    },

    filename:function(req,file,cb){
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({storage:storage});
app.get("/",(req,res)=>{
    res.sendFile(_dirname + "/index.html");
});



router.post("/postImage/:id", upload.single("file"), postImage);

router.get("/getImage/:id", getImage);

export default router;
