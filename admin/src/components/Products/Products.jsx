import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "../Sidebar/Sidebar";
import "./product.css";
import { icons } from "../../icons/heroIcons";
import { toast } from "react-toastify";

const Products = () => {
  // URL endpoints
  const devUrl = "http://localhost:4000/temiperi";
  const prodUrl = "https://temiperi-backend.onrender.com/temiperi";
  const baseUrl = window.location.hostname === "localhost" ? devUrl : prodUrl;

  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    retail_price: "",
    whole_sale_price: "",
    quantity: "",
  });

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
    setEditForm({
      name: product.name,
      category: product.category,
      retail_price: product.price.retail_price,
      whole_sale_price: product.price.whole_sale_price,
      quantity: product.quantity,
    });
    setShowEditModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(editingProduct);
    console.log(editForm);
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Show loading toast
      const loadingToast = toast.loading("Updating product...");

      // Format the data
      const updateData = {
        name: editForm.name,
        category: editForm.category,
        price: {
          retail_price: parseFloat(editForm.retail_price),
          whole_sale_price: parseFloat(editForm.whole_sale_price),
        },
        quantity: parseInt(editForm.quantity),
      };

      // Send update request
      const response = await axios.patch(
        `${baseUrl}/products/${editingProduct._id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        // Update local state
        const updatedProducts = products.map((prod) =>
          prod._id === editingProduct._id ? response.data : prod
        );
        setProducts(updatedProducts);

        // Close modal and reset form
        setShowEditModal(false);
        setEditingProduct(null);
        setEditForm({
          name: "",
          category: "",
          retail_price: "",
          whole_sale_price: "",
          quantity: "",
        });

        console.log(response.data.message);

        // Show success message
        toast.dismiss(loadingToast);
        toast.success("Product updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Refresh the products list
        fetchProducts();
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to update product. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
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
                      <td>GH₵{product.price.retail_price}</td>
                      <td>GH₵{product.price.whole_sale_price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td>
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

          {/* Edit Modal */}
          {showEditModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Edit Product</h2>
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label>Product Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category:</label>
                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Retail Price:</label>
                    <input
                      type="number"
                      name="retail_price"
                      value={editForm.retail_price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Wholesale Price:</label>
                    <input
                      type="number"
                      name="whole_sale_price"
                      value={editForm.whole_sale_price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      name="quantity"
                      value={editForm.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="modal-buttons">
                    <button type="submit" className="update-btn">
                      Update Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
