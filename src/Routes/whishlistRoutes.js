import express from "express";
import _ from "lodash";
import wishlistCtrl from "../Controllers/wishlistController";
// import { validationMiddleware } from "../helper/validation";


const router = express.Router();

router.post("/create",wishlistCtrl.createWishlist);
router.delete("/delete/:id/products/:productId",wishlistCtrl.deleteProduct);
router.patch("/deleteselected",wishlistCtrl.deleteMultipleProduct);
router.delete("/delete/:id",wishlistCtrl.deleteWishlist);
router.get("/allWishlistProduct",wishlistCtrl.allWishlistProduct)
router.get("/:userId",wishlistCtrl.getWishlist);

export default router;
