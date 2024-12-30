import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "../Sidebar/Sidebar";
import "./product.css";
import { icons } from "../../icons/heroIcons";

const Products = () => {
  // URL endpoints
  const devUrl = "http://localhost:4000/temiperi";
  const prodUrl = "https://temiperi-backend.onrender.com/temiperi";
  const baseUrl = window.location.hostname === "localhost" ? devUrl : prodUrl;

  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); // Track product being edited
  const [updatedField, setUpdatedField] = useState({ field: "", value: "" }); // Field & value

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`);
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

  // Handle edit click
  const handleEditClick = (product) => {
    setEditingProduct(product);
    console.log(editingProduct);
    setUpdatedField({ field: "", value: "" }); // Reset field and value
  };

  // Handle field update submission
  const handleUpdateField = async () => {
    if (!updatedField.field || updatedField.value === "") {
      alert("Field and value are required!");
      return;
    }

    try {
      // Send PATCH request
      const response = await axios.patch(
        `${baseUrl}/products/${editingProduct._id}`,
        {
          field: updatedField.field,
          value: updatedField.value,
        }
      );

      // Update local state with updated product
      const updatedProducts = products.map((prod) =>
        prod._id === response.data._id ? response.data : prod
      );
      setProducts(updatedProducts);

      // Reset editing state
      setEditingProduct(null);
      setUpdatedField({ field: "", value: "" });
      alert("Field updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product!");
    }
  };

  return (
    <div>
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
                    <th>Actions</th>
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
                      <td>
                        {/* Edit Button */}
                        <span
                          className="cursor-pointer"
                          onClick={() => handleEditClick(product)}
                        >
                          {icons.edit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Edit Form */}
          {editingProduct && (
            <div className="edit-form">
              <h3>Edit Product: {editingProduct.name}</h3>
              <label>Field:</label>
              <input
                type="text"
                placeholder="e.g., quantity, price.retail_price"
                value={updatedField.field}
                onChange={(e) =>
                  setUpdatedField({ ...updatedField, field: e.target.value })
                }
              />
              <label>Value:</label>
              <input
                type="text"
                placeholder="New value"
                value={updatedField.value}
                onChange={(e) =>
                  setUpdatedField({ ...updatedField, value: e.target.value })
                }
              />
              <button onClick={handleUpdateField}>Update Field</button>
              <button onClick={() => setEditingProduct(null)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
