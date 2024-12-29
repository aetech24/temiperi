<<<<<<< HEAD
import React from 'react'
import { useState } from 'react'
import { asset, products } from '../../assets/assets'
import Products from '../Products/Products'

const Purchase = ({percentage}) => {
   const [purchase, setPurchase] = useState(0)

   console.log(Products)
  return (
    <div>
       <div className="card" id='purchase'>
            <img src={asset.purchase} alt="" />
            <div className="total_sales">
               <div>
                  <h3>Total Purchase</h3>
                  <p>GH {purchase}</p>
               </div>

               <div className="sales_percent">
                  <p>Increase in sales by</p>
                  <div className="percent">
                     <h4>{percentage}%</h4>
                  </div>
               </div>

            </div>
            <small>Last 24 hours</small>
         </div>
    </div>
  )
}

export default Purchase
=======
import { useEffect, useState } from "react";
import { asset } from "../../assets/assets";
import axios from "axios";

const Purchase = () => {
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(
          "https://temiperi-stocks-backend.onrender.com/temiperi/products"
        );
        console.log(response.data);
        setProducts(response.data.products);
  
        // Calculate total stock
        const totalStock = response.data.products.reduce((acc, product) => {
          const price = Number(product.price) || 0; // Fallback to 0 if price is invalid
          const quantity = Number(product.quantity) || 0; // Fallback to 0 if quantity is invalid
          return acc + price * quantity;
        }, 0);
        setStock(totalStock);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };
    fetchStock();
  }, []);

  const handleSale = (id, soldQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity - soldQuantity }
        : product
    );
    setProducts(updatedProducts);
    updateTotalStock(updatedProducts);
  };

  const handleStockUpdate = (id, addedQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + addedQuantity }
        : product
    );
    setProducts(updatedProducts);
    updateTotalStock(updatedProducts);
  };

  const updateTotalStock = (updatedProducts) => {
    const totalStock = updatedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setStock(totalStock);
  };

  return (
    <div>
      <div className="card" id="purchase">
        <img src={asset.purchase} alt="Purchase" />
        <div className="total_sales">
          <div>
            <h3>Stocks</h3>
            <p>Total Stocks: GH₵ {stock.toFixed(2)}</p>
          </div>
        </div>
        <small>Last 24 hours</small>
      </div>
    </div>
  );
};

export default Purchase;
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
