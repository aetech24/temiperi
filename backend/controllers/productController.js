import Product from "../models/productModel.js";

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: 1 });
    res.status(201).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//create products
export const addProduct = async (req, res) => {
  try {
    const products = new Product(req.body);
    const savedProduct = await products.save();
    res.status(201).json({ data: savedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
//get a product

export const getProduct = async (req, res) => {};
//update a product

export const updateProduct = async (req, res) => {};
//delete a product

export const deleteProduct = async (req, res) => {};
