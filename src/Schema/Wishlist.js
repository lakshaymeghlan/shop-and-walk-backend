import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  productId: { type: String},
  productName: { type: String  },
  productPrice: { type: String  },
  // userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

export default mongoose.model("Wishlist", wishlistSchema);

