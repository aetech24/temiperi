import { useEffect } from 'react'
import { useState } from 'react'
import { asset } from '../../assets/assets'

const Sales = () => {
  const [sales, setSales] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const response = await fetch("http://localhost:4000/temiperi/orders");
      const products = await response.json();
      console.log(products);
      setProducts(products);
    };
    getSales();
  }, []);

  // Function to update a product's quantity and recalculate


  return (
    <div>
      <div className="card" id="sales">
        <img src={asset.sale} alt="" />

        <div className="total_sales">
          <div>
            <h3>Total Sales</h3>
            <p>GH </p>
          </div>

          {/* <div className="sales_percent">
                  <p>Increase in sales by</p>
                  <div className="percent">
                     <h4>{percentage}%</h4>
                  </div>
               </div> */}
        </div>
        <small>Last 24 hours</small>
      </div>
    </div>
  );
}

export default Sales