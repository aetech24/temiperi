import { useEffect, useState } from "react";
import { asset } from "../../assets/assets";
import "./sales.css";
import axios from "axios";

const url = "https://temiperi-stocks-backend.onrender.com/temiperi/products";

const OrderForm = () => {
  const [data, setData] = useState({
    invoiceNumber: "",
    customerName: "",
    items: [{ description: "", quantity: 0, price: 0 }],
  });
  const [products, setProducts] = useState([]);
  const [previewItems, setPreviewItems] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
         //  "http://localhost:4000/temiperi/products"
         url
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please check your connection.");
      }
    };

    fetchProduct();
  }, []);


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const getProductOptions = () => {
    return products.map(product => ({
      name: product.name,
      price: product.retail_price // or wholesale_price depending on your needs
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...data.items];
    items[index][field] = value;
    
    if (field === "description") {
      const selectedProduct = products.find(p => p.name === value);
      if (selectedProduct) {
        items[index].price = selectedProduct.retail_price || 0;
      }
    }
    
    setData({ ...data, items });
  };

  const addItem = () => {
    const currentItem = data.items[0];
    if (!currentItem.description || currentItem.quantity <= 0) {
      alert("Please select a product and enter a valid quantity");
      return;
    }

    // Add current item to preview
    setPreviewItems([...previewItems, { ...currentItem }]);

    // Reset the input fields
    setData({
      ...data,
      items: [{ description: "", quantity: 0, price: 0 }],
    });
  };

  const calculateTotal = () => {
    return data.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };

  const validateForm = () => {
    if (!data.invoiceNumber || !data.customerName) {
      alert("Invoice number and customer name are required.");
      return false;
    }
    if (
      data.items.some(
        (item) => !item.description || item.quantity <= 0 || item.price <= 0
      )
    ) {
      alert("All items must have a description, quantity > 0, and price > 0.");
      return false;
    }
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const totalAmount = calculateTotal();
    const invoiceData = { ...data, totalAmount };

    try {
      const newInvoice = await axios.post(
        "https://temiperi-stocks-backend.onrender.com/temiperi/invoice",
        invoiceData
      );
      console.log(newInvoice);
      if (newInvoice.status === 201) {
        console.log("Invoice created successfully:", newInvoice.data);
      } else {
        console.error("Unexpected response status:", newInvoice.status);
      }
      console.log(newInvoice)
      setData({
        invoiceNumber: "",
        customerName: "",
        items: [{ description: "", quantity: 0, price: 0 }],
      });
    } catch (error) {
      alert("Error creating invoice: " + error.message);
    }
  };

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  

  return (
    <div className="main_container">
      <div className="header">
        <img src={asset.logo} alt="" width={60} />
        <div className="search_bar">
          <input type="search" placeholder="Search Product" />
        </div>
        <div className="date">
          <b>Date: {formattedDate}</b>
          <b> Time: {formattedTime}</b>
        </div>
      </div>

      <div className="container">
        <div className="side_bar">
          <h2>Stock Update</h2>
          <div className="stocks">
            <h3>Available Stocks</h3>
            <div className="stock_details_container">
              <article className="stock_details">
                <p>Name</p>
                <div className="price">
                  <div className="price_info">
                    <small>Whole Sale</small>
                    <small>Retail</small>
                  </div>
                </div>
                <small>Quantity</small>
              </article>

              {Array.isArray(products) &&
                products.map((product) => (
                  <article key={product._id} className="stock_info">
                    <p>{product.name || "Unnamed Product"}</p>
                    <div className="price">
                      <div className="price_info">
                        {/* <small>{product.price ?? 'N/A'}</small>
                        <small>{product.price ?? 'N/A'}</small> */}
                      </div>
                    </div>
                    <small>{product.quantity ?? "N/A"}</small>
                  </article>
                ))}
            </div>
          </div>
        </div>

        <div className="sales_container">
          <div className="form_container">
            <form onSubmit={onSubmitHandler}>
              <h1>Submit Order</h1>
              <label>
                Invoice Number
                <input
                  type="text"
                  value={data.invoiceNumber}
                  onChange={onChangeHandler}
                  name="invoiceNumber"
                  placeholder="tm001"
                  required
                />
              </label>
              <label>
                Customer Name:
                <input
                  type="text"
                  value={data.customerName}
                  onChange={onChangeHandler}
                  name="customerName"
                  required
                />
              </label>
              <h3>Add Item</h3>
              <div className="items">
                <label>
                  Description:
                  <select
                    value={data.items[0].description}
                    onChange={(e) =>
                      handleItemChange(0, "description", e.target.value)
                    }
                    required
                  >
                    <option value="">Select a product</option>
                    {getProductOptions().map((product, idx) => (
                      <option key={idx} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={data.items[0].quantity}
                    onChange={(e) =>
                      handleItemChange(0, "quantity", Number(e.target.value))
                    }
                    required
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    value={data.items[0].price}
                    onChange={(e) =>
                      handleItemChange(0, "quantity", Number(e.target.value))
                    }
                  />
                </label>
              </div>

              <button type="button" onClick={addItem}>
                Add Item
              </button>

              <button type="submit">Submit</button>

              {/* Preview Section */}
              {previewItems.length > 0 && (
                <div className="preview-section">
                  <div className="preview-header">
                    <img src={asset.logo} alt="Company Logo" width={100} />
                    <div className="preview-company-info">
                      <h2>Temiperi Enterprise</h2>
                      <p>Wholesale and Retail of Drinks</p>
                      <p>Contact: +233 24 123 4567</p>
                    </div>
                    <div className="preview-date">
                      <p>Date: {formattedDate}</p>
                      <p>Time: {formattedTime}</p>
                    </div>
                  </div>

                  <div className="preview-customer-info">
                    <div>
                      <h4>Invoice #: {data.invoiceNumber}</h4>
                      <h4>Customer: {data.customerName}</h4>
                    </div>
                  </div>

                  <h3>Order Summary</h3>
                  <table className="preview-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewItems.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.description}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <span className="currency-symbol">GH₵</span>
                            {item.price.toFixed(2)}
                          </td>
                          <td>
                            <span className="currency-symbol">GH₵</span>
                            {(item.quantity * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4"><strong>Total Amount:</strong></td>
                        <td>
                          <strong>
                            <span className="currency-symbol">GH₵</span>
                            {previewItems.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="preview-footer">
                    <div className="signature-section">
                      <div className="signature-box">
                        <p>____________________</p>
                        <p>Customer Signature</p>
                      </div>
                      <div className="signature-box">
                        <p>____________________</p>
                        <p>Authorized Signature</p>
                      </div>
                    </div>
                    <div className="terms-section">
                      <p>Terms & Conditions:</p>
                      <small>1. Goods once sold cannot be returned</small>
                      <small>2. All prices include VAT</small>
                      <small>3. This is a computer generated invoice</small>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
