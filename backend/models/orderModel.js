import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
<<<<<<< HEAD
   CustomerName: {type: String},
=======
   
   customerName: {type: String},
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
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