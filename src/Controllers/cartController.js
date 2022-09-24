import Cart from "../Schema/CartDetails";
import _ from "lodash";
import responseObjectClass from "../helper/responseObjectClass";
// import mongoose from "mongoose";

const ResponseObject = new responseObjectClass();

// add to cart
const addToCart = async (req, res) => {
  try {
    const { products, userId } = req.body;
    console.log("incoming product " + products[0].productName);
    const existedCart = await Cart.findOne({
      userID: userId,
    });
    if (existedCart) {
      console.log(existedCart);
      const existedProduct = await Cart.findOne({
        $and: [
          { "products.productName": products[0].productName },
          { userID: userId },
          { "products.sellerId": products[0].sellerId },
        ],
      });
      if (existedProduct) {
        console.log(existedProduct);
        let returnObject = ResponseObject.create({
          code: 400,
          success: false,
          message: "product already exist in cart",
        });
        return res.send(returnObject);
      } else {
        const cart = await Cart.findByIdAndUpdate(existedCart._id, {
          $push: {
            products: [
              {
                productName: products[0].productName,
                productPrice: products[0].productPrice,
                sellerId: products[0].sellerId,
              },
            ],
          },
        });
        cart.save();
        let returnObject = ResponseObject.create({
          code: 200,
          success: true,
          message: "added to cart ",
          data: cart,
        });
        res.send(returnObject);
      }
    }
  } catch (error) {
    console.log(error);
    let returnObject = ResponseObject.create({
      code: 400,
      success: false,
      message: "not added to the cart ",
      data: error,
    });
    res.send(returnObject);
  }
};

//delete cart

const deleteCart = async (req, res) => {
  try {
    const deleteProduct = await Cart.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      res.status(200).send(results[0].id.toString());
    }
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "item deleted from the cart ",
      data: deleteProduct,
    });
    res.send(returnObject);
  } catch (error) {
    let returnObject = ResponseObject.create({
      code: 400,
      success: false,
      message: "item not deleted from the cart ",
      data: error,
    });
    res.send(returnObject);
  }
};

// delete single product

const deleteProduct = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      const { products } = cart;
      const productExist = products.find((product) => {
        return product._id.toString() === req.params.productId;
      });
      if (productExist) {
        const remainingProduct = products.filter((product) => {
          return product._id != productExist._id;
        });
        const updateCart = await Cart.updateOne({_id:cart._id}, {products: remainingProduct})
        //   $set: { products: remainingProduct },
        // });
        console.log(updateCart);
        let returnObject = ResponseObject.create({
          code: 200,
          success: true,    
          message: "product deleted ",
          data:updateCart,
        });
        res.send(returnObject);
      } else {
        let returnObject = ResponseObject.create({
          code: 400,
          success: true,
          message: "product doesn't exist ",
        });
        res.send(returnObject);
      }
    } else {
      let returnObject = ResponseObject.create({
        code: 400,
        success: true,
        message: "cart doesn't exist",
      });
      res.send(returnObject);
    }
  } catch (error) {
    let returnObject = ResponseObject.create({
      code: 400,
      success: false,
      message: "item not deleted ",
      data: error,
    });
    res.send(returnObject);
  }
};

//get

const AllCartProduct = async (req, res) => {
  try {
    const getProduct = await Cart.find();
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "all cart product",
      data: getProduct,
    });
    res.send(returnObject);
  } catch (err) {
    let returnObject = ResponseObject.create({
      code: 400,
      success: false,
      message: "cart is empty",
      data: data,
    });
    res.send(returnObject);
  }
};

//get particular product
const cartProduct = async (req, res) => {
  const { userId } = req.params;
  try {
    const getProduct = await Cart.find({ userID: { $in: userId } });
    console.log(getProduct);
    if (getProduct) {
      let returnObject = ResponseObject.create({
        code: 200,
        success: true,
        message: "product is in the cart",
        data: getProduct,
      });
      res.send(returnObject);
    } else {
      let returnObject = ResponseObject.create({
        code: 400,
        success: false,
        message: "no result found",
        data: error,
      });
      res.send(returnObject);
    }
  } catch (error) {
    console.log(error);
  }
};

// update quantity
//  const updateQuantity = async(req,res)=>{
//   const {id:_id} = req.params;
//   const quantity = req.body;
//   const number = parseInt(quantity.quantity);

//   if(!mongoose.Types.ObjectId.isValid(_id)){
//     return res.status(404).send("product unavailable...");
//   }
//   try {
//     await Cart.findByIdAndUpdate(_id,{$set:{quantity:number}});
//     res.status(200).json({message:"successfully updated"});
//     console.log(Cart)
//   } catch (error) {
//     console.log(error)
//   }
//  }




export default {
  addToCart,
  deleteCart,
  deleteProduct,
  AllCartProduct,
  cartProduct,
  // updateQuantity
};
