import Wishlist from "../Schema/Wishlistdetails";
import _ from "lodash";
import responseObjectClass from "../helper/responseObjectClass";

const ResponseObject = new responseObjectClass();

//create
const createWishlist = async (req, res) => {
  try {
    const { products, userId } = req.body;
    console.log("incoming product " + products[0].productName);

    const existedWishlist = await Wishlist.findOne({ userID: userId });
    if (existedWishlist) {
      const existedProduct = await Wishlist.findOne({
        $and: [
          { "products.productName": products[0].productName },
          { userID: userId },
          { "products.sellerId": products[0].sellerId },
        ],
      });
      if (existedProduct) {
        let returnObject = ResponseObject.create({
          code: 400,
          success: false,
          message: "product already exist in wishlist",
        });

        return res.send(returnObject);
      } else {
        const wishlist = await Wishlist.findByIdAndUpdate(existedWishlist._id, {
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
        wishlist.save();
        let returnObject = ResponseObject.create({
          code: 200,
          success: true,
          message: "product added in wishlist",
          data: Wishlist,
        });
        res.send(returnObject);
      }
    }
  } catch (error) {
    console.log(error);
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
    const deleteWishlist = await Wishlist.findByIdAndDelete(req.params.id);

    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "wishlist item deleted",
      data: deleteWishlist,
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

//delete a single product

const deleteProduct = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    if (wishlist) {
      const { products } = wishlist;
      const productExist = products.find((product) => {
        return product._id.toString() === req.params.productId;
      });
      if (productExist) {
        const remainingProduct = products.filter((product) => {
          return product._id != productExist._id;
        });
        const updateWishlist = await Wishlist.findOneAndUpdate(wishlist._id, {
          $set: { products: remainingProduct },
        });
        console.log(updateWishlist);
        let returnObject = ResponseObject.create({
          code: 200,
          success: true,
          message: "product deleted ",
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
        message: "wishlist doesn't exist",
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

//get particular product
const getWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const getProduct = await Wishlist.find({ userID: { $in: userId } });
    // const WishlistProduct = getProduct.filter(
    //   (wishlist) => wishlist?.userID?.toString() === userEmail
    // );
    // console.log(WishlistProduct);
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
  deleteProduct,
};
