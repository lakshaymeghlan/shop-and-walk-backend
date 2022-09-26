import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: String },
      productName: { type: String },
      productPrice: { type: String },
      quantity:{type:Number},
      sellerId: { type: String },
    },
  ],
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  userEmail: { type: String },
});

export default mongoose.model("Cart", cartSchema);
