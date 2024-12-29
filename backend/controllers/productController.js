import Product from "../models/productModel.js";

//get all products
<<<<<<< HEAD
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: 1 });
    res.status(201).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//create products
export const addProduct = async (req, res) => {
  try {
    const products = new Product(req.body);
    const savedProduct = await products.save();
    res.status(201).json({ data: savedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
//get a product

export const getProduct = async (req, res) => {};
//update a product

export const updateProduct = async (req, res) => {};
//delete a product

export const deleteProduct = async (req, res) => {};
=======
export const getAllProducts = async (req, res)=> {
   try {
      const {name, sort, fields} = req.query
      const featuredProduct = {}

      //name
      if(name){
         featuredProduct.name = {$regex: name, $options: 'i'}
      }

      console.log(req.query)
      let result = Product.find(featuredProduct)

      // sort 

      if(sort){
         //products = products.sort(name)
         console.log(sort);
         const sortList = sort.split(',').join('');
         result = result.sort(sortList)            
      } else {result = result.sort()}


      //fields
      if(fields){
          const fieldList = fields.split(",").join("");
          result = result.select(fieldList); 
      }

      const products = await result

      res.status(201).json({products, nbHits: Product.length})
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
//get all product 

export const getProduct = async (req, res) => {
   try {
     const { name, sort, fields } = req.query;
     const featuredProduct = {};

     //name
     if (name) {
       featuredProduct.name = featuredProduct.name = {
         $regex: name,
         $options: "i",
       };
     }

     console.log(req.query);
     let result = Product.find(featuredProduct);

     //sort
     if (sort) {
       //products = products.sort();
       console.log(sort);
       const sortList = sort.split(",").join("");
       result = result.sort(sortList);
     } else {
       result = result.sort(createdAt);
     }

     //fields
     if (fields) {
       const fieldList = fields.split(",").join("");
       result = result.select(fieldList);
     }

     const products = await result;
     return res.status(404).json({ product, nbHits: Product.length });
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
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
