import express from "express";
import _ from "lodash";
import wishlistCtrl from "../Controllers/wishlistController";
// import { validationMiddleware } from "../Controllers/wishlistController";

const router = express.Router();

router.post("/create",wishlistCtrl.create);
router.delete("/delete/:id",wishlistCtrl.delete);
router.get("/allWishlistProduct",wishlistCtrl.allWishlist)
router.get("/wishlist/:id",wishlistCtrl.getWishlist);

export default router;
