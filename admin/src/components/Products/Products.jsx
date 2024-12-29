import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "../Sidebar/Sidebar";
import "./product.css";
import Orders from "../Orders/Orders";

const Products = () => {
  // URL endpoints
  const devUrl = "http://localhost:4000/temiperi";
  const productionUrl = "https://temiperi-backend.onrender.com";

  // State to manage products data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products data
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${devUrl}/products`);
      setProducts(response.data.products);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Orders url={devUrl} />
      <div className="body_container">
        <Sidebar />

        <div className="product_container">
          <h2>Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Retail Price</th>
                    <th>Wholesale Price</th>
                    <th>Quantity</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price.retail_price}</td>
                      <td>${product.price.whole_sale_price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
