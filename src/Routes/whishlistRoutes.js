import express from "express";
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
} from "../Controllers/wishlistController";
import _ from "lodash";
// import { validationMiddleware } from "../Controllers/wishlistController";

const router = express.Router();

router.post("/create",createWishlist);
router.delete("/delete/:id",deleteWishlist);
router.get("/wishlist/:id",getWishlist);

export default router;
