import express from "express";
import _ from "lodash";
import wishlistCtrl from "../Controllers/wishlistController";
// import { validationMiddleware } from "../helper/validation";


const router = express.Router();

router.post("/create",wishlistCtrl.createWishlist);
// TODO @lakshay read it from req.query
router.delete("/delete/:id/products/:productId",wishlistCtrl.deleteProduct);
router.delete("/delete/:id",wishlistCtrl.deleteWishlist);
router.get("/allWishlistProduct",wishlistCtrl.allWishlistProduct)
router.get("/:userId",wishlistCtrl.getWishlist);

export default router;
