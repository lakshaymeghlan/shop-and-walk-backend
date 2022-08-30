import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  productId: { type: String },
  productName: {
    type: String,
    // required:True,
  },
  productPrice: {
    type: String,
    // required:True,
  },
  productDesc: {
    type: String,
  },
});

export default mongoose.model("products", productsSchema);
