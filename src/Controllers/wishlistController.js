import Wishlist from "../Schema/Wishlist";
import _ from "lodash";
// var Joi = require('joi')
// import Joi from "joi";
import responseObjectClass from "../helper/responseObjectClass";

const ResponseObject = new responseObjectClass();

//create
const createWishlist = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const existedProduct = await Wishlist.findOne({
      productName: data.productName,
    });
    if (existedProduct) {
      let returnObject = ResponseObject.create({
        code: 400,
        success: false,
        message: "product already exist in wishlist",
      });
      res.send(returnObject);
    }

    const wishlist = await Wishlist.create({
      productName: data.productName,
      productPrice: data.productPrice,
      // userID: data.userId,
    });
    await wishlist.save();
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "wishlist  is created",
      data: wishlist,
    });
    res.send(returnObject);
  } catch (error) {
    let returnObject = ResponseObject.create({
      code: 400,
      success: false,
      message: " wishlist not created ",
      data: error,
    });
    res.send(returnObject);
  }
};

//delete wishlist

const deleteWishlist = async (req, res) => {
  try {
    const deleteProduct = await Wishlist.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      res.status(200).send(results[0].id.toString());
    }
    // res.send(deleteProduct);
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "wishlist item deleted",
      data: deleteProduct,
    });
    res.send(returnObject);
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

// get
const allWishlistProduct = async (req, res) => {
  try {
    const getProduct = await Wishlist.find();
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "all wishlist product",
      data: getProduct,
    });
    res.send(returnObject);
  } catch (err) {
    let returnObject = ResponseObject.create({
      code: 400,
      success: false,
      message: "wishlist is empty",
      data: data,
    });
    res.send(returnObject);
  }
};

const getWishlist = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const getProduct = await Wishlist.find();
    const WishlistProduct = getProduct.filter(
      (wishlist) => wishlist.userID.toString() === userId
    );
    console.log(WishlistProduct);
    console.log(getProduct);
    if (getProduct) {
      let returnObject = ResponseObject.create({
        code: 200,
        success: true,
        message: " wishlist item ",
        data: getProduct,
      });
      res.send(returnObject);
    } else {
      let returnObject = ResponseObject.create({
        code: 400,
        success: false,
        message: " no result found",
        data: error,
      });
      res.send(returnObject);
    }
  } catch (error) {
    console.log(error);
  }
};

// router.patch("/deleteWishlistProduct", async (req, res) => {
//   try {
//     await Wishlist.remove();
//     res.status(200).json("success");
//   } catch (error) {
//     console.log(error);
//   }
// });

export default {
  createWishlist,
  deleteWishlist,
  allWishlistProduct,
  getWishlist,
};
