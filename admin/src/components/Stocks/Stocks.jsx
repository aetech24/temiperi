import React, { useState } from 'react'
import { products } from '../../assets/assets.js'
import './stock.css'

const Stocks = ({category, name, price_per_case, sizes, RRP_per_bottle, count_per_case, count_per_bottle}) => {

  

  return (
    <div className='list add flex_col'>
       <div className="product_table">
        <div className="product_table_format title">
          <b>Category</b>
          <b>Name</b>
          <b>Price Per Case</b>
          <b>Price per Bottle</b>
          <b>Count Per Case</b>
          <b>Count Per Bottle</b>
          <b>Count</b>
        </div>

        <div className='product_table_format'>
          <p>{category}</p>
          <p>{name}</p>
          <p>{price_per_case}</p>
          <p>{RRP_per_bottle}</p>
          <p>{sizes}</p>
          <p>{count_per_bottle}</p>
          <p>{count_per_case}</p>
        </div>
       </div>
   </div>
  )
}

export default Stocks