import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: {
    retail_price: { type: Number, required: true },
<<<<<<< HEAD
    whole_sale_price: { type: Number, required: true },
  },

  quantity: { type: Number, require: true },
  category: { type: String, require: true },
  createdAt: { type: Date, required: false, default: Date.now() },
});

export default mongoose.model("Product", productSchema);
=======
    wholeSale_price: { type: Number, required: true },
  },
  quantity: { type: Number, require: true },
  category: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model('Product', productSchema)

>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
