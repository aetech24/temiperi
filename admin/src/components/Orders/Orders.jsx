import React, { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios'

const Orders = ({url}) => {
  const [productList, setProductList] = useState([])

   const fetchList = async() => {
      const response = await axios.get(`${url}/orders`)
      if(response.data.success){
        setProductList(response.data.data)
      } else {
        console.log(Error)
      }
   }

   useEffect(() => {
    fetchList()
   }, [])
  return (
    <div className='table_container'>
      <h2>Recent Orders</h2>

      <div className="product_table">
        <div className="product_table_format title">
          <b>Product Id</b>
          <b>Product Name</b>
          <b>Order Date</b>
          <b>Delivery Date</b>
          <b>Company Name</b>
          <b>Status</b>
          <b>Payment</b>
        </div>

        {productList.map((item, index) => {
        <div className='product_table_format'>
          <p>{item.product_id}</p>
          <p>{item.product_name}</p>
          <p>{item.order_data}</p>
          <p>{item.delivery_date}</p>
          <p>{item.company}</p>
          <p>{item.status}</p>
          <p>{item.payment}</p>
        </div>
        })}
      </div>
   </div>
  )
}

export default Orders