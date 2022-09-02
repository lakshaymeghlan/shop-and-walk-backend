import express from "express";
import Cart from "../Schema/CartDetails";
import _ from "lodash";
import responseObjectClass from "../helper/responseObjectClass";

const ResponseObject = new responseObjectClass();

const addToCart = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const cart = await Cart.create({
      productName: data.productName,
      productPrice: data.productPrice,
      // userID: data.userId,
    });
    cart.save();
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "added to cart ",
      data: cart,
    });
    res.send(returnObject);
  } catch (error) {
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

const cartProduct = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const getProduct = await Cart.find();
    // const CartProduct = getProduct.filter(
    //   (cart) => console.log(cart)

    // );
    // console.log(CartProduct);
    // console.log(getProduct);
    if (getProduct) {
      let returnObject = ResponseObject.create({
        code: 200,
        success: true,
        message: "product is in the cart",
        data: getProduct,
      });
      res.send(returnObject);
    }
    // } else {
    //   res.send({ getProduct: "no result found" });
    // }
  } catch (error) {
    let returnObject = ResponseObject.create({
      code: 400,
      success: false,
      message: "no result found",
      data: error,
    });
    res.send(returnObject);
  }
};


export default { addToCart, deleteCart, AllCartProduct, cartProduct };
