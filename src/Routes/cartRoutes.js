import express from "express";
import cartCtrl from "../Controllers/cartController";
import _ from "lodash";
import { validationMiddleware } from "../helper/validation";

const router = express.Router();

router.post("/addToCart",validationMiddleware, cartCtrl.addToCart);
router.delete("/delete/:id",validationMiddleware, cartCtrl.deleteCart);
router.get("/cartProduct/:id",validationMiddleware, cartCtrl.cartProduct);
router.get("/AllCartProduct",validationMiddleware, cartCtrl.AllCartProduct);

export default router;
