import Product from "../models/productModel.js";

//get all products
export const getAllProducts = async (req, res)=> {
   try {
      const products = await Product.find({})
      res.status(201).json({products})
   } catch (error) {
      console.log(error);
      res.status(500).json({message: error})
   }
}

//create products
export const addProdut = async (req, res) => {
   try {
      const products = await Product.create(req.body)
      res.status(201).json({success: true, message: 'Product added', products})
   } catch (error) {
      console.log(error);
      res.json({success: false, message: error})
   }
}
//get a product 

export const getProduct = async (req, res) => {
   try {
      const { name: productName } = req.params;
      const product = await Product.findOne({ name: productName});
      if (!product) {
        return res.status(404).json({ message: `No product with id: ${productName}` });
      }
   } catch (error) {
      res.json({success: false, message: error})
   }
}
//update a product

export const updateProduct = async (req, res) => {
   try {
     const { name: productName } = req.params;
     const product = await Product.findOneAndUpdate(
       { name: productName },
       req.body,
       { new: true, runValidators: true }
     );
     if (!product) {
       return res
         .status(404)
         .json({ message: `No product with id: ${productName}` });
     }
   } catch (error) {
     res.json({ success: false, message: error });
   }
}
//delete a product

export const deleteProduct = async (req, res) => {

}