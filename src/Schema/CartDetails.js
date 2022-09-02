import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: { type: String },
  productName: { type: String },
  productPrice: { type: String },
  // userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

// const Cart = mongoose.model("cartDetail", cartSchema);
export default mongoose.model("Cart", cartSchema);


// products should array with nested schema 
// every cart and wishlist should be unique identify by user id 
// ------------------product existence should be check  before adding and deleting product from cart and wishlist
// empty cart and wishlist should be created when user register