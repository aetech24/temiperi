import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
   invoiceNumber: {type: String, requrired: true, unique: true},
   customerName: {type: String, requrired: true},
   items: [
      {
         description: {type: String, required: true}, 
         quantity: {type: Number, required: true},
         price: {type: Number, required: true}
      },
   ],
   totalAmount: {type: Number, required: true},
   status: {type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid'},
   createdAt: {type: Date, default: Date.now()},
   
})

export default mongoose.model('Invoice', invoiceSchema)