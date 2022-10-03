//npm module
import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";

//helpers
import authenticationRoutes from "./src/Routes/authenticationRoutes";
import productRoutes from "./src/Routes/productRoutes";
import cartRoutes from "./src/Routes/cartRoutes";
import whishlistRoutes from "./src/Routes/whishlistRoutes";
import imageRoutes from "./src/Routes/imageRoutes";


//constants
const PORT = 8080;
const MONGO_URL =
  "mongodb+srv://lakshay:lakshay1234@cluster0.iix5z.mongodb.net/ShopAndWalk?retryWrites=true&w=majority";

//mongoDB connection
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database", MONGO_URL);
  })
  .catch((e) => console.log(e));

// routing
app.use(express.json());
app.use(cors());
app.use("/auth", authenticationRoutes);
app.use("/product", productRoutes);
app.use("/product_image",express.static("./uploads")) // it should redirection of our end point to the particular folder
app.use("/cart", cartRoutes);
app.use("/wishlist", whishlistRoutes);
app.use("/image",imageRoutes)

//server
app.listen(PORT, () => {
  console.log("server start on port", PORT);
});
