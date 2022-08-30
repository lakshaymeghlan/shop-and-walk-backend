import express from "express";
import _ from "lodash";
// import {
//   add_product,
//   get_product,
//   deleteProduct,
//   updateProduct,
// } from "../Controllers/productController";

import productCtrl from "../Controllers/productController";

const router = express.Router();


router.post("/add", productCtrl.add);
router.get("/get", productCtrl.get);
router.delete("/delete/:id", productCtrl.deleteProduct);
router.patch("/update/:id",productCtrl.update);

export default router;
