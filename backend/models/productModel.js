import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: {
    retail_price: { type: Number, required: true },
    wholeSale_price: { type: Number, required: true },
  },
  quantity: { type: Number, require: true },
  category: { type: String, require: true },
});

export default mongoose.model('Product', productSchema)

