import express from "express";
import { addToCart,deleteCart,cartProduct,AllCartProduct } from "../Controllers/cartController";
import _ from "lodash";

const router = express.Router()

router.post("/addToCart",addToCart);
router.delete("/delete/:id",deleteCart);
router.get("/cartProduct/:id",cartProduct);
router.get("/AllCartProduct",AllCartProduct);


export default router;