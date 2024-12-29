import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: {
    retail_price: { type: Number, required: true },
    whole_sale_price: { type: Number, required: true },
  },

  quantity: { type: Number, require: true },
  category: { type: String, require: true },
  createdAt: { type: Date, required: false, default: Date.now() },
});

export default mongoose.model("Product", productSchema);
