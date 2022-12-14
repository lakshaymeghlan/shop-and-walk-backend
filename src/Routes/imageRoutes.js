import express from "express";
import { postImage, getImage } from "../Controllers/imageController";
import multer from "multer";
const router = express.Router();
const app = express();

const storage = multer.memoryStorage();

var upload = multer({ storage: storage });
app.get("/", (req, res) => {
  res.sendFile(_dirname + "/uploads");
});

router.post("/postImage/:id", upload.single("file"), postImage);

// router.get("/getImage/:id", getImage);

export default router;
// image uploading system working correctly?

// send that buffer data in products DB by using findbyIdAndUpdate
