import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  items: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
<<<<<<< HEAD
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now(), required: false },
});

export const InvoiceModel = mongoose.model("Invoice", invoiceSchema);
=======
      price: {
        retail_price: { type: Number, required: true },
        wholeSale_price: { type: Number, required: true },
      },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["paid", "unpaid", "overdue"],
    default: "unpaid",
  },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model('Invoice', invoiceSchema)
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
