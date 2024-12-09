import Invoice from "../models/invoiceModel.js";
//import invoiceModel from "../models/invoiceModel.js";


//create new invoice
export const createInvoice = async (req, res) => {
   try {
      const invoiceData = req.body;
      const invoice = new Invoice(invoiceData)
      await invoice.save()
      res.status(201).json({message: 'invoice created succefully', invoice})
   } catch (error) {
      res.status(400).json({error: error.message})
   }
}


//Get all invoices

export const getInvoices = async (req, res) => {
   try {
      const invoices = await Invoice.find([])
      res.status(201).json(invoices)
   } catch (error) {
     throw error.response?.data || error.message
    // res.status(500).json({error: error.message});
   }
}

// Get invoice by id 
export const getInvoice = async (req, res) => {
   try {
      const invoice = await Invoice.findById(req.params.id);
      if(!invoice){
         return res.status(404).json({message: 'Invoice not Found'})
      }
      res.status(200).json(invoice)
   } catch (error) {
      res.status(500).json({error: error.message})
   }
  
}

