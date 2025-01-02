import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  CustomerName: { type: String },
  items: [
    {
      quantity: { type: Number },
      description: { type: String },
      price: { type: Number },
    },
  ],
  paymentMethod: {
    type: String,
    required: false,
    default: "cash",
  },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Order", orderSchema);
