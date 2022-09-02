import express from "express";
import _ from "lodash";
import wishlistCtrl from "../Controllers/wishlistController";
import { validationMiddleware } from "../helper/validation";


const router = express.Router();

router.post("/create",validationMiddleware,wishlistCtrl.createWishlist);
router.delete("/delete/:id",validationMiddleware,wishlistCtrl.deleteWishlist);
router.get("/allWishlistProduct",validationMiddleware,wishlistCtrl.allWishlistProduct)
router.get("/wishlist/:id",validationMiddleware,wishlistCtrl.getWishlist);

export default router;
