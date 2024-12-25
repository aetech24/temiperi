import { useEffect } from 'react'
import { useState } from 'react'
import { asset} from '../../assets/assets'
import axios from 'axios'

const Purchase = () => {
   const [products, setProducts] = useState([])
   const [stock, setStock] = useState(0)

   useEffect(() => {
      const fetchStock = async () => {
         try {
            const response = await axios.get(
              "https://temiperi-stocks-backend.onrender.com/temiperi/products"
            ); 
            console.log(response.data);
            setProducts(response.data.products)
         } catch (error) {
            console.log(error)
         }
      }
      fetchStock()
   }, [])

   const calculateTotalStock = () => {
     const stock = products || [].reduce((acc, product) => {
       return acc + product.price * product.quantity;
     }, 0);
     setStock(stock);
   };
  useEffect(() => {
    calculateTotalStock();
  }, []);

 

    const handleSale = (id, soldQuantity) => {
      const updatedProducts = products.map((product) =>
        product.id === id
          ? { ...product, quantity: products.quantity - soldQuantity }
          : product
      );
      setProducts(updatedProducts);
    };

    const handleStockUpdate = (id, addedQuantity) => {
      const updatedProducts = products.map((product) =>
        product.id === id
          ? { ...product, quantity: products.quantity + addedQuantity }
          : product
      );
      setProducts(updatedProducts);
    };

    const stockChange = () => {
      if(handleStockUpdate){
         calculateTotalStock + handleStockUpdate;
      } else {
         calculateTotalStock - handleSale;
      }
    }
    stockChange(stock)

   //console.log(products)
  return (
    <div>
       <div className="card" id='purchase'>
            <img src={asset.purchase} alt="" />
            <div className="total_sales">
               <div>
                  <h3>Stocks</h3>
                  <p>Total Stocks: {}</p>
               </div>

            </div>
            <small>Last 24 hours</small>
         </div>
    </div>
  )
}

export default Purchase
