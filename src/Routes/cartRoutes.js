import express from "express";
// import { addToCart,deleteCart,cartProduct,AllCartProduct } from "../Controllers/cartController";
import cartCtrl from "../Controllers/cartController";
import _ from "lodash";

const router = express.Router();

router.post("/addToCart", cartCtrl.addToCart);
router.delete("/delete/:id", cartCtrl.deleteCart);
router.get("/cartProduct/:id", cartCtrl.cartProduct);
router.get("/AllCartProduct", cartCtrl.AllCartProduct);

export default router;
