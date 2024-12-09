import React, { useState } from 'react'
import Orders from '../Orders/Orders'
import './product.css'
import { products } from '../../assets/assets'
import { Sidebar } from '../Sidebar/Sidebar'
import Stocks from '../Stocks/Stocks'

// 
const Products = ({category, name, price_per_case, RRP_per_bottle, sizes, count_per_case, coun_per_bottle}) => {


 const [currentProducts, setCurrentProuducts] = useState([])
 const [productCount, setProductCount] = useState(0)

  return (
    
    <div>
      <Orders />
      <div className="body_container">
       <Sidebar />

      <div className='product_container'>
        <h2>Products</h2>
          { products.map((item, index) => (
                <Stocks key={index} category={item.category} RRP_per_bottle={item.RRP_per_bottle} name={item.name} price_per_case={item.price_per_case} size={item.sizes} count_per_case={item.count_per_case} count_per_bottle={item.RRP_per_bottle} />
            ))
          }
      </div>
      </div>
      </div>
  )
}

export default Products