import express from "express";
import _ from "lodash";
import productCtrl from "../Controllers/productController";
// import { validationMiddleware } from "../helper/validation";

const router = express.Router();

router.post("/add", productCtrl.add);
router.get("/get", productCtrl.get);
router.get("/get/:id", productCtrl.getProduct);
router.delete("/delete/:id", productCtrl.deleteProduct);
router.patch("/update/:id", productCtrl.update);

export default router;
