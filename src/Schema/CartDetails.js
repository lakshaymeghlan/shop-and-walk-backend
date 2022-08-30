import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: { type: String },
  productName: { type: String },
  productPrice: { type: String },
  // userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Cart = mongoose.model("cartDetail", cartSchema);
export default Cart;
