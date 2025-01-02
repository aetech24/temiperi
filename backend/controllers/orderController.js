import { OrderModel } from "../models/orderModel.js";

export const addOrder = async (req, res) => {
  try {
    const order = new OrderModel(req.body);
    await order.save();
    res
      .status(201)
      .json({ success: "new order add successfully", data: order });
  } catch (error) {
    console.error(error);
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
