import Product from "../models/productModel.js";

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(201).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//create products
export const addProduct = async (req, res) => {
  try {
    const products = Array.isArray(req.body) ? req.body : [req.body]; // assuming it's an array of product objects

    // Save each product to the database
    const savedProducts = await Product.insertMany(products); // Insert multiple products
    res.status(201).json({ data: savedProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//get a product
export const getProduct = async (req, res) => {};

//update a product
export const updateProduct = async (req, res) => {
  try {
    // Extract product ID and quantity to deduct from the request body
    const { productId, quantityToDeduct } = req.body;

    // Validate input
    if (!productId || !quantityToDeduct || quantityToDeduct <= 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if there is enough quantity to deduct
    if (product.quantity < quantityToDeduct) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }

    // Deduct the quantity
    product.quantity -= quantityToDeduct;

    // Save the updated product
    await product.save();

    // Respond with success message and updated product
    res.status(200).json({
      message: "Product quantity updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete all products
export const clearDatabase = async (req, res) => {
  try {
    // Delete all documents in the 'products' collection
    await Product.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All products have been deleted successfully.",
    });
  } catch (error) {
    console.error("Error clearing database:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear database.",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {};
