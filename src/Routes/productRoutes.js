import express from "express";
import _ from "lodash";
import productCtrl from "../Controllers/productController";
import { validationMiddleware } from "../helper/validation";

const router = express.Router();

router.post("/add",validationMiddleware, productCtrl.add);
router.get("/get",validationMiddleware, productCtrl.get);
router.get("/get/:id",validationMiddleware, productCtrl.getProduct);
router.delete("/delete/:id",validationMiddleware, productCtrl.deleteProduct);
router.patch("/update/:id",validationMiddleware, productCtrl.update);

export default router;
