import { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios'

const url = `http://localhost:4000/temiperi/invoice?_=${new Date().getTime()}`;

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
   
   useEffect(() => {
    console.log('hello')

     const fetchOrder = async() => {
      try {
        const response = await axios.get(url,  { headers: {
        'Cache-Control': 'no-cache', // Force server to bypass caching
      }},)
        const data = response.data
        console.log(data)
        setOrderList(data.orderList || [])
      } catch (error) {
        console.log(error)
      }
    };
    fetchOrder()
   }, [])


  return (
    <div className='table_container'>
      <h2>Recent Orders</h2>
      <div className="product_table">
        <div className="product_table_format title">
          <b>Invoice Number</b>
          <b>Customer Name</b>
          <b>Order Date</b>
          <b>Price</b>
          <b>Quantity</b>
          <b>Status</b>
          <b>Total Amount</b>
        </div>

        {Array.isArray(orderList) && orderList.map((order) => {
          console.log('this is the new: ' + order)
          return (
            <div className='product_table_format' key={order._id}>
              <p>{order.invoiceNumber ?? 'N/A'}</p>
              <p>{order.customerName ?? 'N/A'} </p>
              <p>{order.createdAt ?? 'N/A'} </p>
              <p>{order.price ?? 'N/A'} </p>
              <p>{order.quantity ?? 'N/A'} </p>
              <p>{order.status ?? 'N/A'} </p>
              <p>{order.totalAmount ?? 'N/A'} </p>
            </div>
          )
        })}
      </div>
   </div>
  )
}

export default Orders