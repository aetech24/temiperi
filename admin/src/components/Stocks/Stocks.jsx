<<<<<<< HEAD
import React, { useState } from 'react'
import { products } from '../../assets/assets.js'
import './stock.css'

const Stocks = ({category, name, price_per_case, sizes, RRP_per_bottle, count_per_case, count_per_bottle}) => {

  
=======
import React, { useState, useEffect } from 'react'
import './stock.css'

const Stocks = ({category, name, wholesale_price, sizes, retails_price, quantity}) => {

  const [stock, setStock] = useState([]);
   useEffect(() => {
     const fetchProducts = async () => {
       const response = await axios.get(
         "https://temiperi-stocks-backend.onrender.com/temiperi/products"
       );
       console.log(response.data);
       const stock = await response.data;
       console.log(stock);
       setStock(stock);
     };
     fetchProducts();
   }, []);
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3

  return (
    <div className='list add flex_col'>
       <div className="product_table">
        <div className="product_table_format title">
          <b>Category</b>
          <b>Name</b>
<<<<<<< HEAD
          <b>Price Per Case</b>
          <b>Price per Bottle</b>
          <b>Count Per Case</b>
          <b>Count Per Bottle</b>
          <b>Count</b>
=======
          <b>Wholesale Price</b>
          <b>Retails Price</b>
          <b>Quantity</b>
          <b>Size</b>
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
        </div>

        <div className='product_table_format'>
          <p>{category}</p>
          <p>{name}</p>
<<<<<<< HEAD
          <p>{price_per_case}</p>
          <p>{RRP_per_bottle}</p>
          <p>{sizes}</p>
          <p>{count_per_bottle}</p>
          <p>{count_per_case}</p>
=======
          <p>{wholesale_price}</p>
          <p>{retails_price}</p>
          <p>{quantity}</p>
          <p>{sizes}</p>
       
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
        </div>
       </div>
   </div>
  )
}

<<<<<<< HEAD
export default Stocks
=======
export default Stocks
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
