import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
   name: {type: String, require: true},
   price: {
      type: Number, 
      require: [true, 'product price must be provided'],
      enum: {
         retails_price: 0,
         wholesale_price: 0
      }
   },
   quantity: {type: Number, require: true},
   category: {type: String, require: true},
})

export default mongoose.model('Product', productSchema)

