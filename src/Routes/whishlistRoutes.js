import express from "express";
import _ from "lodash";
import wishlistCtrl from "../Controllers/wishlistController";
// import { validationMiddleware } from "../Controllers/wishlistController";


const router = express.Router();

router.post("/create",wishlistCtrl.createWishlist);
router.delete("/delete/:id",wishlistCtrl.deleteWishlist);
router.get("/allWishlistProduct",wishlistCtrl.allWishlistProduct)
router.get("/wishlist/:id",wishlistCtrl.getWishlist);

export default router;
