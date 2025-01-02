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

    // Send response directly (CORS headers are already handled by middleware)
    return res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error.message);
    return res.status(500).json({ error: error.message });
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

export const updateInvoiceField = async (req, res) => {
  const { id } = req.query; // Get product ID from URL parameters
  const updates = req.body; // Get updates from request body

  //check if Id is present
  if (!id) {
    return res.status(400).json({ message: "Id not provided" });
  }
  // Check if updates were provided
  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No updates provided." });
  }

  try {
    // Create an object for storing non-empty fields only
    const nonEmptyFields = {};

    // Filter out empty or null fields
    Object.keys(updates).forEach((key) => {
      const value = updates[key];
      if (value !== "" && value !== null && value !== undefined) {
        nonEmptyFields[key] = value; // Add only non-empty values
      }
    });

    // If no valid updates after filtering, return an error
    if (Object.keys(nonEmptyFields).length === 0) {
      return res
        .status(400)
        .json({ message: "All provided fields are empty or invalid." });
    }

    // Update product using filtered fields
    const updatedProduct = await InvoiceModel.findByIdAndUpdate(
      id,
      { $set: nonEmptyFields }, // Update only non-empty fields
      { new: true, runValidators: true } // Return updated document and validate input
    );

    // If no product was found, return error
    if (!updatedProduct) {
      console.log("No invoice was found");
      return res.status(404).json({ message: "Product not found." });
    }

    // Respond with the updated product
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while updating order." });
  }
};

export const deleteInvoice = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ message: "There was no payload for the product id" });
  }

  //delete from the database
  await InvoiceModel.findByIdAndDelete({ _id: id });

  //return a response to the client
  return res.status(200).json({
    message: "Invoice deleted successfully",
    success: true,
  });
};
