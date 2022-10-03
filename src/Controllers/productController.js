import products from "../Schema/ProductDetail";
import _ from "lodash";
// const router = express.Router();
import responseObjectClass from "../helper/responseObjectClass";
// const upload = require('../helper/helper')
import upload from '../helper/helper'
const URL = "http://localhost:8080/product_image/"

const ResponseObject = new responseObjectClass();

//add
const add = async (req, res) => {
  try {

    
    let image_upload = await upload(req,res,async function(){
      // console.log(req.body.productName)
      const existedProduct = await products.findOne({
        productName: req.body.productName,
      });
      
      // console.log(existedProduct)
      if (existedProduct) {
        let returnObject = ResponseObject.create({
          code: 400,
          success: false,
          message: "product already exist",
        });
        return res.send(returnObject);
      }
      let data = {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productDesc: req.body.productDesc,
        img: `${URL}${req.file.filename}`,
      }
      
      console.log(data)
      let product =await products.create(data)
      // let product = new products(data);
    console.log(product);
    // await product.save();
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "product added successfully",
      data: product,
    });
    return res.send(returnObject);
    })
    
  } catch (error) {
    console.log(error);
    let returnObject = ResponseObject.create({
      code: 400,
      success: false,
      message: "product not added",
      data: error,
    });
    res.send(returnObject);
  }
};

//get

const get = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const getProduct = await products
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "product ",
      data: getProduct,
    });
    res.send(returnObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: err,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await products.findById(id);

    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "product id ",
      data: product,
    });
    res.send(returnObject);
  } catch (error) {
    let returnObject = ResponseObject.create({
      code: 400,
      success: true,
      message: "product not found ",
      data: error,
    });
    res.send(returnObject);
  }
};

// delete
const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await products.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      res.status(200, "true").send(results[0].id.toString());
    }
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "product is deleted ",
      data: deleteProduct,
    });
    res.send(returnObject);
  } catch (error) {
    res;

    let returnObject = ResponseObject.create({
      code: 400,
      success: false,
      message: "product you are looking for is not found ",
      data: deleteProduct,
    });
    res.send(returnObject);
  }
};

//update

const update = async (req, res) => {
  const newdata = req.body;
  try {
    const updateProduct = await products.findByIdAndUpdate(
      req.params.id,
      { $set: newdata },
      { new: true }
    );
    let returnObject = ResponseObject.create({
      code: 200,
      success: true,
      message: "product is updated ",
      data: updateProduct,
    });
    res.send(returnObject);
  } catch (error) {
    let returnObject = ResponseObject.create({
      code: 400,
      success: true,
      message: "product not found ",
      data: error,
    });
    res.send(returnObject);
  }
};

export default { add, deleteProduct, get, getProduct, update };



