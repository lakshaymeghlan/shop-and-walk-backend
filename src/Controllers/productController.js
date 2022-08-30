import express from "express";
import products from "../Schema/ProductDetail";
import _ from "lodash";
const router = express.Router();
import responseObjectClass from "../helper/responseObjectClass";

const responseObject = new responseObjectClass();

export const products_details = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const product = new product(data);
    await product.save();
    let returnObject = responseObject({
      codes: "",
      success: true,
      message: "product fetched successfully",
      data,
    });
    res.status(returnObject);
  } catch (error) {
    res.status(500).json({ message: "product not Saved", data: error });
  }
};

//add
export const add_product = async (req, res) => {
  try {
    let product = new products(req.body);
    console.log(product);
    let result = await product.save();
    let returnObject = responseObject({
      codes: "",
      success: true,
      message: "product fetched successfully",
      data,
    });
    res.status(returnObject);
  } catch (error) {
    res.status(500,"false").json({ message: "product not added ", data: error });
  }
};

//get

export const get_product = async (req, res) => {
  const getProduct = await products.find();
  res.status(200,"true").json({ message: "product", data: getProduct });
  // if (getProduct){
  //     res.send(getProduct)
  // }else{
  //     res.send({getProduct:"no result found"})
  // }
};

// delete
export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await products.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      res.status(200,"true").send(results[0].id.toString());
    }
    res.json({ message: "product deleted", data: deleteProduct });
  } catch (error) {
    res.Status(400,"false").json({ message: "product not deleted", data: error });
  }
};

//update

export const updateProduct = async (req, res) => {
  const newdata = req.body;
  try {
    const updateProduct = await products.findByIdAndUpdate(
      req.params.id,
      { $set: newdata },
      { new: true }
    );
    res.status(200,"true").json({message:"product is updated",data:updateProduct});
    if (!updateProduct)
      return res.status(404,"false").send("product you are looking for is not found");
    res.send(updateProduct);
  } catch (error) {
    res.status(400,"false").json({message:"product is not updated",data:error});
  }
};

export default router;
