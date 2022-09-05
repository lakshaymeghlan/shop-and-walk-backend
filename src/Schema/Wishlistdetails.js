import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: String },
      productName: { type: String },
      productPrice: { type: String },
    },
  ],
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  userEmail: { type: String },
});

export default mongoose.model("Wishlistdetails", wishlistSchema);
