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

export const updateProduct = async (req, res) => {
  try {
    const { productId, quantityToSubtract } = req.body;

    // Validate input
    if (!productId || quantityToSubtract == null || quantityToSubtract < 0) {
      return res.status(400).json({ message: "Invalid input." });
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Check if enough quantity is available
    if (product.quantity < quantityToSubtract) {
      return res
        .status(400)
        .json({ message: "Insufficient quantity available." });
    }

    // Subtract the quantity
    product.quantity -= quantityToSubtract;

    // Save the updated product
    await product.save();

    res
      .status(200)
      .json({ message: "Product quantity updated successfully.", product });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

//delete a product

export const deleteProduct = async (req, res) => {};
