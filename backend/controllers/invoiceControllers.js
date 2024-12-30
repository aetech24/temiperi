import { InvoiceModel } from "../models/invoiceModel.js";
//import invoiceModel from "../models/invoiceModel.js";

//create new invoice
export const createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;
    const invoice = new InvoiceModel(invoiceData);
    await invoice.save();
    res.status(201).json({ message: "invoice created successfully", invoice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get all invoices
export const fetchInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceModel.find();

    // Check if there are no invoices and respond immediately
    if (invoices.length === 0) {
      console.log("There are no invoices");
      return res.status(404).json({ message: "No invoices found" });
    }

    // Log and send the response
    console.log("Fetched invoices successfully");
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error.message);
    res.status(500).json({ error: error.message }); // Always send a response
  }
};

// Get invoice by id
export const getInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not Found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
