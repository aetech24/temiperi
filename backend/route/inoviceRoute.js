import express from 'express'
import { createInvoice, getInvoices, getInvoice, generateInvoiceNumber } from '../controllers/invocieControllers.js'
const invoiceRouter = express.Router()

//route ro create a new invoice
invoiceRouter.route('/invoice').post(createInvoice)

// route to get all invoice
invoiceRouter.route('/invoice').get(getInvoices)

invoiceRouter.route('/invoice/number').post(generateInvoiceNumber)

// Route to generate a random invoice number (for latest invoice)
// invoiceRouter.get("/invoice/latest", async (req, res) => {
//   try {
//     const newInvoiceNumber = await generateRandomInvoiceNumber();
//     res.status(200).json({ latestInvoiceNumber: newInvoiceNumber });
//   } catch (error) {
//     console.error("Error generating invoice number:", error);
//     res.status(500).json({ message: "Error generating invoice number" });
//   }
// });

// route to get a single invoice
invoiceRouter.route('/invoice/:id').get(getInvoice);

export default invoiceRouter