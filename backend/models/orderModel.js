import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String },
  paymentMethod: {
    type: String,
    required: false,
  },
  items: [
    {
      quantity: { type: Number },
      description: { type: String, required: false },
      price: { type: Number },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  invoiceNumber: { type: String, required: true },
});

export const OrderModel = mongoose.model("Order", orderSchema);
