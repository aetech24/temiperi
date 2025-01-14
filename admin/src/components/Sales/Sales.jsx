import React from 'react'
import { useState } from 'react'
import { asset } from '../../assets/assets'

const Sales = ({percentage, setPercentage}) => {
   const [sales, setSales] = useState(0)
  return (
    <div>
      <div className="card" id='sales'>
            <img src={asset.sale} alt="" />
            <div className="total_sales">
               <div>
                  <h3>Total Sales</h3>
                  <p>GH {sales}</p>
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

export default Sales