import Wishlist from "../Schema/Wishlistdetails";
import responseObjectClass from "../helper/responseObjectClass";

const ResponseObject = new responseObjectClass();

//create
const createWishlist = async (req, res) => {
  try {
    // userId: userId,
    // userEmail: userEmail,
    // products: [
    //   {
    //     id: product.productId,
    //     productName: product.productName,
    //     productPrice: product.productPrice,
    //   },
    // ],
    const { products, userId } = req.body;
    console.log("incoming product " + products[0].productName);
    // console.log(products[0])

    const existedWishlist = await Wishlist.findOne({ userID: req.body.userId });
    if (existedWishlist) {
      const existedProduct = await Wishlist.findOne({
        $and: [
          { "products.productName": products[0].productName },
          { userID: req.body.userId },
          // { "products.sellerId": products[0].sellerId },
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
                // sellerId: products[0].sellerId,
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
    const deleteWishlist = await Wishlist.findById(req.params.id);
    console.log(deleteWishlist);

    deleteWishlist.products = [];

    await deleteWishlist.save();

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

// delete multiple products

const deleteMultipleProduct = async (req, res) => {
  try {
    console.log(req.body.wishlistId);
    // array of ids
    let wishlist = await Wishlist.findOne({ userID: req.body.wishlistId });
    console.log("--", wishlist);

    const productIdsToBeDeleted = new Set(req.body.products);

    const newProductArray = wishlist.products.filter((product) => {
      return !productIdsToBeDeleted.has(product.id);
    });

    console.log("---", newProductArray);

    wishlist.products = newProductArray;

    await wishlist.save();

    res.json({ success: true, products: wishlist.products });
  } catch (err) {
    console.log(err);
  }
};

//delete a single product

const deleteProduct = async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    // console.log(wishlist)
    // return;
    if (wishlist) {
      const { products } = wishlist;
      const productExist = products.find((product) => {
        return product._id.toString() === req.params.productId;
      });
      if (productExist) {
        const remainingProduct = products.filter((product) => {
          return product._id != productExist._id;
        });
        console.log(remainingProduct);
        const updateWishlist = await Wishlist.updateOne(
          { _id: wishlist._id },
          { products: remainingProduct }
        );
        // const updateWishlist = await Wishlist.findOneAndUpdate(wishlist._id, {
        //   $set: { products: remainingProduct },
        // });
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

// const deleteSingleProduct = async (req,res)=>{
//   try {
//     const wishlist = await Wishlist.findById(req.params.id);
//   } catch (error) {

//   }
// }

// // get
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
  deleteMultipleProduct,
};

// i have to pass id array within the body section
// from param i have to pass the wishlist id
// so end point appear
// we can use filter
//
