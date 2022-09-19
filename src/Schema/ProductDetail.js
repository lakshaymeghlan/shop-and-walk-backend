import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  productDetails:[
    {
      productId: { type: String },
      productName: {
        type: String,
      },
      productPrice: {
        type: String,
      },
      productDesc: {
        type: String,
      },
      img: {
        data: Buffer,
        contentType: String,
      },
    },
  ],
 
});

export default mongoose.model("products", productsSchema);



// compare with product id