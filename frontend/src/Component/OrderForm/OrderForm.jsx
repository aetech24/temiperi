import { useEffect, useState } from "react";
import { asset } from "../../assets/assets";
import "./sales.css";
import axios from "axios";
import InvoiceGenerator from "../Invoice/InvoiceGenerator";

const baseURL = process.env.NODE_ENV === 'production' 
  ? "https://temiperi-stocks-backend.onrender.com/temiperi"
  : "http://localhost:4000/temiperi";

const OrderForm = () => {
  const [data, setData] = useState({
    invoiceNumber: "",
    customerName: "",
    items: [{ description: "", quantity: 0, price: 0 }],
  });
  const [products, setProducts] = useState([]);
  const [previewItems, setPreviewItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestInvoiceNumber, setLatestInvoiceNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please check your connection.");
      }
    };

    const generateInvoiceNumber = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${baseURL}/invoice/number`
        );
        const { invoiceNumber } = response.data;
        setData(prevData => ({
          ...prevData,
          invoiceNumber: `tm${invoiceNumber}`
        }));
      } catch (error) {
        console.error("Error generating invoice number:", error);
        // Don't show alert, just use a fallback
        const fallbackNumber = Math.floor(1000 + Math.random() * 9000).toString().padStart(6, '0');
        setData(prevData => ({
          ...prevData,
          invoiceNumber: `tm${fallbackNumber}`
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    generateInvoiceNumber();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const getProductOptions = () => {
    return products.map((product) => ({
      name: product.name,
      price: product.retail_price,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...data.items];
    if (field === "quantity" && value <= 0) return;

    items[index][field] = value;

    if (field === "description") {
      const selectedProduct = products.find(p => p.name === value);
      if (selectedProduct) {
        // Default to retail price when product is first selected
        items[index].price = selectedProduct.price?.retail_price || 0;
        items[index].wholesalePrice = selectedProduct.price?.wholeSale_price || 0;
      }
    }

    if (field === "quantity") {
      const selectedProduct = products.find(p => p.name === items[index].description);
      if (selectedProduct) {
        // Use wholesale price if quantity > 10, otherwise use retail price
        items[index].price = value > 10 
          ? (selectedProduct.price?.wholeSale_price || 0)
          : (selectedProduct.price?.retail_price || 0);
      }
    }

    setData({ ...data, items });
  };

  const addItem = () => {
    const currentItem = data.items[0];
    if (!currentItem.description || currentItem.quantity <= 0 || currentItem.price <= 0) {
      alert("Please select a product and ensure quantity and price are valid.");
      return;
    }

    const selectedProduct = products.find((product) => product.name === currentItem.description);

    // Check if there's enough stock
    if (selectedProduct && selectedProduct.quantity < currentItem.quantity) {
      alert("Not enough stock available for this product.");
      return;
    }

    // Update the stock in the products array
    const updatedProducts = products.map((product) =>
      product.name === currentItem.description
        ? { ...product, quantity: product.quantity - currentItem.quantity }
        : product
    );
    setProducts(updatedProducts); // Update the products state to reflect the stock decrease

    // Add the item to preview items
    setPreviewItems((prev) => [...prev, { ...currentItem }]);

    // Reset form fields
    setData({
      ...data,
      items: [{ description: "", quantity: 0, price: 0 }],
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredProducts = () => {
    return products.filter((product) =>
      product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const currentItem = data.items[0];
    if (!currentItem.description || currentItem.quantity <= 0) {
      alert("Please select a product and enter a valid quantity before submitting.");
      return;
    }

    // Add the current item to preview items
    const updatedPreviewItems = [...previewItems, { ...currentItem }];
    
    // Format items to match backend schema
    const formattedItems = updatedPreviewItems.map(item => {
      const product = products.find(p => p.name === item.description);
      const isWholesale = item.quantity > 10;
      
      // Get the retail and wholesale prices from the product
      const retail_price = product?.price?.retail_price || 0;
      const wholeSale_price = product?.price?.wholeSale_price || 0;
      
      // Calculate the unit price based on quantity
      const unitPrice = isWholesale ? wholeSale_price : retail_price;
      
      return {
        description: item.description,
        quantity: item.quantity,
        price: {
          retail_price,
          wholeSale_price
        },
        appliedPrice: isWholesale ? 'wholesale' : 'retail',
        unitPrice
      };
    });

    // Calculate total amount based on formatted items
    const totalAmount = formattedItems.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);

    const invoiceData = {
      invoiceNumber: data.invoiceNumber,
      customerName: data.customerName,
      items: formattedItems,
      totalAmount,
      status: "unpaid"
    };

    try {
      const response = await axios.post(
        `${baseURL}/invoice`,
        invoiceData
      );
      
      if (response.status === 201) {
        alert("Order submitted successfully!");
        // Reset form after successful submission
        setData({
          invoiceNumber: `tm${Math.floor(100000 + Math.random() * 900000)}`,
          customerName: "",
          items: [{ description: "", quantity: 0, price: 0 }],
        });
        setPreviewItems([]);
      }
    } catch (error) {
      console.error('Error submitting invoice:', error);
      alert("Error creating invoice. Please check the console for details.");
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
            <table className="stocks-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Wholesale Price</th>
                  <th>Retail Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name || "Unnamed Product"}</td>
                      <td>
                        <span className="currency-symbol">GH₵</span>
                        {product.price?.wholeSale_price?.toFixed(2) || "N/A"}
                      </td>
                      <td>
                        <span className="currency-symbol">GH₵</span>
                        {product.price?.retail_price?.toFixed(2) || "N/A"}
                      </td>
                      <td>{product.quantity || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No products available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sales_container">
          <div className="form_container">
            <form onSubmit={onSubmitHandler}>
              <h1>Submit Order</h1>
              <label>
                Invoice Number
                <InvoiceGenerator 
                  value={data.invoiceNumber}
                  loading={loading}
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
                  <div className="search-container">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search products..."
                      className="search-input"
                    />
                    <select
                      value={data.items[0].description}
                      onChange={(e) =>
                        handleItemChange(0, "description", e.target.value)
                      }
                      required
                    >
                      <option value="">Select a product</option>
                      {getFilteredProducts().map((product, idx) => (
                        <option key={idx} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={data.items[0].quantity || ""}
                    onChange={(e) =>
                      handleItemChange(0, "quantity", Number(e.target.value))
                    }
                    required
                    min="1" // Ensures quantity starts from 1
                  />
                </label>
                <label className="price-label">
                  Price:
                  <span className="price-display">
                    GH₵{data.items[0].price.toFixed(2)}
                  </span>
                  <span className="total-display">
                    <strong>
                      Total: GH₵{(data.items[0].quantity * data.items[0].price).toFixed(2)}
                    </strong>
                  </span>
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
                    {/* <div className="preview-company-info">
                      <h2>Temiperi Enterprise</h2>
                      <p>Wholesale and Retail of Drinks</p>
                      <p>Contact: +233 24 123 4567</p>
                    </div> */}
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
                        <p>Authorized Signature</p>
                      </div>
                    </div>
                    <div className="terms-section">
                      <p>All Terms & Conditions applied</p>
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
