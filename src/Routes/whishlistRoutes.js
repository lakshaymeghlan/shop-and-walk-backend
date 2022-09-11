import express from "express";
import _ from "lodash";
import wishlistCtrl from "../Controllers/wishlistController";
import { validationMiddleware } from "../helper/validation";


const router = express.Router();

router.post("/create",validationMiddleware,wishlistCtrl.createWishlist);
router.delete("/delete/:id/products/:productId",validationMiddleware,wishlistCtrl.deleteProduct);
router.delete("/delete/:id",validationMiddleware,wishlistCtrl.deleteWishlist);
router.get("/allWishlistProduct",validationMiddleware,wishlistCtrl.allWishlistProduct)
router.get("/:userId",validationMiddleware,wishlistCtrl.getWishlist);

export default router;
