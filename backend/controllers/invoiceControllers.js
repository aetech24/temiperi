import { InvoiceModel } from "../models/invoiceModel.js";
import { OrderModel } from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";

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

    if (invoices.length === 0) {
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

  // Check if Id is present
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

    // Update invoice using filtered fields
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
      id,
      { $set: nonEmptyFields }, // Update only non-empty fields
      { new: true, runValidators: true } // Return updated document and validate input
    );

    // Check if the invoice was found
    if (!updatedInvoice) {
      console.log("No invoice was found");
      return res.status(404).json({ message: "Invoice not found." });
    }

    try {
      // Fetch the old invoice before the update to compare quantities
      const oldInvoice = await InvoiceModel.findById(id);
      if (!oldInvoice) {
        console.log("Old invoice not found");
        return res.status(404).json({ message: "Old invoice not found." });
      }

      // Update product quantities based on the difference between old and new invoice
      await Promise.all(
        updatedInvoice.items.map(async (newItem) => {
          // Find corresponding old item
          const oldItem = oldInvoice.items.find(
            (item) => item.description === newItem.description
          );

          if (!oldItem) {
            console.log(
              `No matching old item found for ${newItem.description}`
            );
            return;
          }

          // Calculate quantity difference
          const quantityDelta = newItem.quantity - oldItem.quantity;
          if (quantityDelta === 0) return; // No change in quantity

          // Find and update the product
          const product = await ProductModel.findOne({
            name: newItem.description,
          });
          if (product) {
            // Subtract from quantity if new quantity is higher (more items sold)
            // Add to quantity if new quantity is lower (items returned/modified)
            product.quantity -= quantityDelta;

            // Ensure quantity doesn't go negative
            if (product.quantity < 0) {
              throw new Error(`Insufficient stock for ${product.name}`);
            }

            await product.save();
            console.log(
              `Updated quantity for ${product.name}: ${product.quantity}`
            );
          } else {
            console.log(`Product not found: ${newItem.description}`);
          }
        })
      );

      // Respond with the updated invoice
      return res.status(200).json(updatedInvoice);
    } catch (error) {
      console.error("Error updating product quantities:", error);
      return res.status(500).json({
        message: error.message || "Error updating product quantities",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error in updateInvoiceField:", error);
    return res.status(500).json({
      message: error.message || "Server error while updating invoice.",
      success: false,
    });
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
