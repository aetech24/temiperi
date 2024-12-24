import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   
   customerName: {type: String},
   items: [
      {
         quantity: {type: Number},
         description: {type: String},
         price: {type: Number},
      }
   ],
   createdAt: {type: Date, default: Date.now()},
   
})

export default mongoose.model('Order', orderSchema);

;