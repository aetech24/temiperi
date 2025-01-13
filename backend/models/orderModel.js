import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String },
  paymentType: {
    type: String,
    required: true,
    enum: ['full', 'partial'],
    default: 'full'
  },
  paymentMethod: {
    type: String,
    required: false,
    default: "cash",
  },
  cashAmount: {
    type: Number,
    required: false,
    default: 0
  },
  momoAmount: {
    type: Number,
    required: false,
    default: 0
  },
  items: [
    {
      quantity: { type: Number },
      description: { type: String, required: false },
      price: { type: Number },
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  invoiceNumber: { type: String, required: true },
});

export const OrderModel = mongoose.model("Order", orderSchema);
