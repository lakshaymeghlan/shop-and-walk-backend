import express from "express";
import _ from "lodash";
import {
  products_details,
  add_product,
  get_product,
  deleteProduct,
  updateProduct,
} from "../Controllers/productController";

const router = express.Router();

router.post("/saveProduct", products_details);
router.post("/add", add_product);
router.get("/getProduct", get_product);
router.delete("/delete/:id", deleteProduct);
router.patch("/updateProduct/:id",updateProduct);

export default router;
