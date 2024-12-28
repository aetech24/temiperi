import Invoice from "../models/invoiceModel.js";
//import invoiceModel from "../models/invoiceModel.js";


//create new invoice
export const createInvoice = async (req, res) => {
   try {
      const invoice = await Invoice.create(req.body)
      await invoice.save()
      res.status(201).json({message: 'invoice created successfully', invoice})
   } catch (error) {
      res.status(400).json({error: error.message})
      console.log(error);  
   }
}

//Get all invoices

export const getInvoices = async (req, res) => {
   try {
      const search = 'a'
      const invoice = await Invoice.find({})

      res.status(201).json({success: true, message: 'getting invoices', invoice})
   } catch (error) {
     //throw error.response?.data || error.message
     res.status(500).json({error: error.message});
   }
}

// Get invoice by id 
export const getInvoice = async (req, res) => {
   try {
      const {name, sort, numericFilters} = req.query;
      const queryObject = {}

      if(name) {
         queryObject.name = {$regex: name, $options: 'i'}
      }

      if(numericFilters){
         const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
         }
         const regEx = /\b(<|>|<=|=|>=)\b/g
         let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
         )

         // const options = ['quantity'];
         // filters = filters.forEach((item) => {
         //    const [operator, value] = item
         //    if(options.value)
         // })
      }

      console.log(queryObject)
      let result = Invoice.find(queryObject)
      // sort
      if(sort) {
         const sortList = sort.split(',').join('')
         result = result.sort(sortList)
      } else {
         result = result.sort('createdAt')
      }

      const invoice = await Invoice.findById(req.params.id);
      if(!invoice) return res.status(404).json({message: 'Invoice not Found'})
      res.status(200).json(invoice)

   } catch (error) {
      res.status(500).json({error: error.message})
   }
  
}

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
    const existingNumbers = await Invoice.find();
    const newNumber = generateRandomNumber(existingNumbers);
    const invoice = new Invoice({ number: newNumber });
    await invoice.save();
    res.json({ invoiceNumber: newNumber });
  } catch (error) {
    res.status(400).json({ message: "Failed to generate invoice number" });
  }
};

const generateRandomNumber = (existingNumbers) => {
  let newNumber;
  do {
    newNumber = Math.floor(Math.random() * 900000) + 100000;
  } while (existingNumbers.includes(newNumber));
  return newNumber;
};
