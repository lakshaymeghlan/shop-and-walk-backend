import express from "express";
import Cart from "../Schema/CartDetails";
import _ from "lodash";

const router = express.Router();

export const addToCart = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const cart = await Cart.create({
      productName: data.productName,
      productPrice: data.productPrice,
      // userID: data.userId,
    })

    cart.save();
    res.status(200).json({ message: "added to cart", data: cart });
  } catch (error) {
    res.status(500).json({ message: "not added to the cart", data: error });
  }
};

//delete cart

export const deleteCart = async (req, res) => {
  try {
    const deleteProduct = await Cart.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      res.status(200).send(results[0].id.toString());
    }
    res
      .status(200)
      .json({ message: "item deleted from the cart", data: deleteProduct });
  } catch (error) {
    res
      .Status(400)
      .json({ message: "item not deleted from the cart", data: error });
  }
};

//get

export const AllCartProduct = async(req,res)=>{
  try{
      const getProduct = await Cart.find()
      res.status(200).json({message:"all cart product",data:getProduct});
  }catch(err){
      res.status(500).json({message:"cart is empty",data:data})
  }
}

export const cartProduct = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const getProduct = await Cart.find();
    // const CartProduct = getProduct.filter(
    //   (cart) => console.log(cart)

    // );
    // console.log(CartProduct);
    // console.log(getProduct);
    if (getProduct) {
      res.status(200).json({message:"product is in the cart",data:getProduct});
    }
    // } else {
    //   res.send({ getProduct: "no result found" });
    // }
  } catch (error) {
    res.status(400).json({ message: "no result found", error });
  }
};

//update

// export const updateQuantity = async (req, res) => {
//     const { id: _id } = req.params;
//     const quantity = req.body;
//     const number = parseInt(quantity.quantity);

//     if (!mongoose.Types.ObjectId.isValid(_id)) {
//       return res.status(404).send("product unavailable...");
//     }

//     try {
//       await Cart.findByIdAndUpdate(_id, { $set: { quantity: number } });
//       res.status(200).json({ message: "Successfully updated" });
//     } catch (error) {
//       console.log(error);
//     }
//   };

export default router;
