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
