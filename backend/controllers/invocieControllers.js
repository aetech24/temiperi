import Invoice from "../models/invoiceModel.js";
//import invoiceModel from "../models/invoiceModel.js";


//create new invoice
export const createInvoice = async (req, res) => {
  try {
    // Validate required fields
    const { invoiceNumber, customerName, items, totalAmount } = req.body;
    
    if (!invoiceNumber || !customerName || !items || items.length === 0) {
      return res.status(400).json({ 
        message: "Missing required fields", 
        required: "invoiceNumber, customerName, and at least one item" 
      });
    }

    // Create and save the invoice
    const invoice = new Invoice({
      invoiceNumber,
      customerName,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        price: {
          retail_price: item.price.retail_price,
          wholeSale_price: item.price.wholeSale_price
        }
      })),
      totalAmount,
      status: "unpaid"
    });

    const savedInvoice = await invoice.save();
    res.status(201).json({
      message: 'Invoice created successfully',
      invoice: savedInvoice
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    // Check for duplicate invoice number
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Invoice number already exists",
        error: error.message 
      });
    }
    res.status(500).json({ 
      message: "Error creating invoice", 
      error: error.message 
    });
  }
};

//Get all invoices
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Invoices fetched successfully',
      invoices
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ 
      message: "Error fetching invoices", 
      error: error.message 
    });
  }
};

// Get invoice by id 
export const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    
    res.status(200).json({
      message: 'Invoice fetched successfully',
      invoice
    });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ 
      message: "Error fetching invoice", 
      error: error.message 
    });
  }
};

// Generate Random Invoice Number
// export const generateRandomInvoiceNumber = async (retryCount = 0) => {
//    if(retryCount > 10) {
//      throw new Error(
//        "Max retries reached while generating unique invoice number."
//      );
//    }
//   const prefix = "tm";
//   const randomPart = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
//   const newInvoiceNumber = `${prefix}${randomPart}`;

//   // Ensure the generated number is unique
//   const existingInvoice = await Invoice.findOne({ invoiceNumber: req.body.invoiceNumber });
//   if (existingInvoice) {
//     // If the number already exists, recursively generate a new one
//     return generateRandomInvoiceNumber();
//   }
//   return newInvoiceNumber;
// };


export const generateInvoiceNumber = async (req, res) => {
  try {
    // Get the latest invoice to determine the next number
    const latestInvoice = await Invoice.findOne({}, { invoiceNumber: 1 })
      .sort({ createdAt: -1, invoiceNumber: -1 })
      .limit(1);
    
    let nextNumber;
    if (!latestInvoice) {
      // If no invoices exist, start from 1
      nextNumber = 1;
    } else {
      // Extract the number from the existing invoice number, removing the 'tm' prefix
      const currentNumber = parseInt(latestInvoice.invoiceNumber.replace(/^tm/, ''));
      nextNumber = currentNumber + 1;
    }
    
    // Format the new invoice number with tm prefix and leading zeros
    const formattedNumber = `tm${nextNumber.toString().padStart(6, '0')}`;
    
    // Verify this number doesn't exist (just in case)
    const existingInvoice = await Invoice.findOne({ invoiceNumber: formattedNumber });
    if (existingInvoice) {
      // In the rare case it exists, add a random suffix
      const randomSuffix = Math.floor(Math.random() * 100);
      nextNumber = nextNumber + randomSuffix;
      formattedNumber = `tm${nextNumber.toString().padStart(6, '0')}`;
    }
    
    res.status(200).json({ invoiceNumber: formattedNumber });
  } catch (error) {
    console.error('Error generating invoice number:', error);
    res.status(500).json({ 
      message: "Failed to generate invoice number",
      error: error.message 
    });
  }
};

// const generateRandomNumber = (existingNumbers) => {
//   let newNumber;
//   do {
//     newNumber = Math.floor(Math.random() * 900000) + 100000;
//   } while (existingNumbers.includes(newNumber));
//   return newNumber;
// };
