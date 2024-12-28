import { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios'

const url = `http://localhost:4000/temiperi/invoice?_=${new Date().getTime()}`;

const Orders = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    console.log('Fetching orders...');
    const fetchOrder = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Cache-Control': 'no-cache', // Force server to bypass caching
          },
        });
        const data = response.data;
        console.log(data);
        setOrderList(data.orderList || []);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className='table_container'>
      <h2>Recent Orders</h2>
      <table className="product_table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orderList) && orderList.length > 0 ? (
            orderList.map((order) => (
              <tr key={order._id}>
                <td>{order.invoiceNumber ?? 'N/A'}</td>
                <td>{order.customerName ?? 'N/A'}</td>
                <td>{order.createdAt ?? 'N/A'}</td>
                <td>{order.price ?? 'N/A'}</td>
                <td>{order.quantity ?? 'N/A'}</td>
                <td>{order.status ?? 'N/A'}</td>
                <td>{order.totalAmount ?? 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
