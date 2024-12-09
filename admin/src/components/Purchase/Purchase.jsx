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