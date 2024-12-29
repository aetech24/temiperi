import { useEffect, useState } from "react";
import "./order.css";
import axios from "axios";

const Orders = ({ url }) => {
  const [productList, setProductList] = useState();

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/orders`);
      if (response.data) {
        setProductList(response.data.data);
        console.log(productList);
        console.log("I am active and working");
      } else {
        console.log("Error fetching orders");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="table_container">
      <h2 className="font-bold">Recent Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Company Name</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {productList?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.delivery
                    ? new Date(order.delivery).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{order.company || "N/A"}</td>
                <td>{order.status || "N/A"}</td>
                <td>{order.payment || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
