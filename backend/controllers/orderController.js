import { OrderModel } from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";

export const addOrder = async (req, res) => {
  const session = await OrderModel.startSession();
  session.startTransaction();

  try {
    const order = new OrderModel(req.body);
    
    // Update product quantities
    for (const item of order.items) {
      const product = await ProductModel.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      if (product.quantity < item.quantity) {
        throw new Error(`Insufficient quantity for product ${product.name}`);
      }
      
      product.quantity -= item.quantity;
      await product.save({ session });
    }

    await order.save({ session });
    await session.commitTransaction();

    res.status(201).json({ 
      success: true, 
      message: "New order added successfully", 
      data: order 
    });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(400).json({ 
      success: false, 
      message: error.message || "Error adding order" 
    });
  } finally {
    session.endSession();
  }
};

// fetching all order list
export const orderList = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: 1 });
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders Available" });
    }
    console.log("I am from the orders controller ");
    return res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "error" });
  }
};

//fetching an order
export const singleOrder = async (req, res) => {
  try {
    const { id: orderID } = req.params;
    const order = await OrderModel.findOne({ _id: orderID });

    if (!order) {
      return res.status(404).json({ message: "No order found. Thank You" });
    }

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ message: "There was no payload for the product id" });
  }

  //delete from the database
  await OrderModel.findByIdAndDelete({ _id: id });

  //return a response to the client
  return res.status(200).json({
    message: "Order deleted successfully",
    success: true,
  });
};

export const updateOrderField = async (req, res) => {
  const { id } = req.query; // Get product ID from URL parameters
  const updates = req.body; // Get updates from request body

  //check if Id is present
  if (!id) {
    return res.status(400).json({ message: "Id not provided" });
  }
  // Check if updates were provided
  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No updates provided." });
  }

  try {
    // Create an object for storing non-empty fields only
    const nonEmptyFields = {};

    // Filter out empty or null fields
    Object.keys(updates).forEach((key) => {
      const value = updates[key];
      if (value !== "" && value !== null && value !== undefined) {
        nonEmptyFields[key] = value; // Add only non-empty values
      }
    });

    // If no valid updates after filtering, return an error
    if (Object.keys(nonEmptyFields).length === 0) {
      return res
        .status(400)
        .json({ message: "All provided fields are empty or invalid." });
    }

    // Update product using filtered fields
    const updatedProduct = await OrderModel.findByIdAndUpdate(
      id,
      { $set: nonEmptyFields }, // Update only non-empty fields
      { new: true, runValidators: true } // Return updated document and validate input
    );

    // If no product was found, return error
    if (!updatedProduct) {
      console.log("No order was found");
      return res.status(404).json({ message: "Product not found." });
    }

    // Respond with the updated product
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while updating order." });
  }
};
