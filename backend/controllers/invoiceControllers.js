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
  console.log("Request received for invoices"); // Log request start
  try {
    const invoices = await InvoiceModel.find().lean(); // Database query
    console.log("Fetched invoices:", invoices); // Log fetched data

    if (invoices.length === 0) {
      console.log("No invoices found");
      return res.status(404).json({ message: "No invoices found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Length",
      Buffer.byteLength(JSON.stringify(invoices))
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Cache-Control", "no-cache");

    return res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error.message);
    res.status(500).json({ error: error.message }); // Send response even on error
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
