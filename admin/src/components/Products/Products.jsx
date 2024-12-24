import { useState } from 'react'
import Orders from '../Orders/Orders'
import './product.css'
import { Sidebar } from '../Sidebar/Sidebar'
import Stocks from '../Stocks/Stocks'
import { useEffect } from 'react'
import axios from 'axios'

// 
const Products = ({
  category,
  name,
  wholesale_price,
  sizes,
  retails_price,
  quantity,
}) => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "http://localhost:4000/temiperi/products"
      );
      console.log(response.data);
      const stock = await response.data;
      console.log(stock);
      setStock(stock);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Orders />
      <div className="body_container">
        <Sidebar />

        <div className="product_container">
          <h2>Products</h2>
          {Array.isArray(stock) && stock.map((item, index) => (
            <Stocks
              key={index}
              category={category}
              name={name}
              wholesale_price={wholesale_price}
              retails_price={retails_price}
              quantity={quantity}
              size={sizes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products