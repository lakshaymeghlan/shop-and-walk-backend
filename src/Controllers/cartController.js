import Cart from "../Schema/CartDetails";
import _ from "lodash";
import responseObjectClass from "../helper/responseObjectClass";
import mongoose from "mongoose";

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
                quantity: 1,
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
    const deleteCart = await Cart.findById(req.params.id);
    console.log(deleteProduct);

    deleteCart.products = [];
    await deleteCart.save();

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

// delete multiple products

const deleteMultipleProduct = async (req, res) => {
  try {
    console.log(req.body.cartId);
    // array of ids
    let cart = await Cart.findOne({ userID: req.body.cartId });
    console.log("--", cart);

    const productIdsToBeDeleted = new Set(req.body.products);

    const newProductArray = cart.products.filter((product) => {
      return !productIdsToBeDeleted.has(product.id);
    });

    console.log("---", newProductArray);

    cart.products = newProductArray;

    await cart.save();

    res.json({ success: true, products: cart.products });
  } catch (err) {
    console.log(err);
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
        const updateCart = await Cart.updateOne(
          { _id: cart._id },
          { products: remainingProduct }
        );
        //   $set: { products: remainingProduct },
        // });
        console.log(updateCart);
        let returnObject = ResponseObject.create({
          code: 200,
          success: true,
          message: "product deleted ",
          data: updateCart,
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
    console.log("------------>", getProduct);
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
const updateQuantity = async (req, res) => {
  console.log("---------+++++--->", req.body);
  console.log(req.params);
  //const { _id } = req.body.products[0];
  const quantity = req.body.productQuantity;
  //console.log("quantity", quantity);
  //const number = parseInt(quantity.productQuantity);
  console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("product unavailable...");
  }
  try {
    console.log(req.params.id);
    const filter = { _id: req.params.id };
    const update = { quantity: quantity };

    const cart = await Cart.updateOne(
      { _id: req.params.id, "products._id": req.params.productId },
      { $set: { "products.$.quantity": req.body.quantity } }
    );
    console.log("------------>", cart);
    res.status(200).json({ message: "successfully updated" });
    console.log(Cart);
  } catch (error) {
    console.log(error);
  }
};

export default {
  addToCart,
  deleteCart,
  deleteProduct,
  AllCartProduct,
  cartProduct,
  updateQuantity,
  deleteMultipleProduct,
};
