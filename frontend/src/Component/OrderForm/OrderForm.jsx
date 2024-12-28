import { useEffect, useState } from "react";
import { asset } from "../../assets/assets";
import "./sales.css";
import axios from "axios";

const url = "http://localhost:4000/temiperi/products";

const OrderForm = () => {
  const [data, setData] = useState({
    invoiceNumber: "",
    customerName: "",
    items: [
      {
        description: "",
        quantity: 0,
        size: "medium",
        price: {
          retail_price: 0,
          wholeSale_price: 0,
        },
      },
    ],
  });
  const [products, setProducts] = useState([]);
  const [previewItems, setPreviewItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [latestInvoiceNumber, setLatestInvoiceNumber] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please check your connection.");
      }
    };

    const fetchLatestInvoiceNumber = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/temiperi/invoice/latest"
        );
        if (response.data.latestInvoiceNumber) {
          setData((prevData) => ({
            ...prevData,
            invoiceNumber: response.data.latestInvoiceNumber,
          }));
        }
      } catch (error) {
        console.error("Error fetching latest invoice number:", error);
        setData((prevData) => ({
          ...prevData,
          invoiceNumber: "tm001",
        }));
      }
    };

    fetchProduct();
    fetchLatestInvoiceNumber();
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
    const updatedItems = [...data.items];

    if (field === "description") {
      const selectedProduct = products.find((p) => p.name === value);
      if (selectedProduct) {
        updatedItems[index] = {
          ...updatedItems[index],
          description: value,
          price: {
            retail_price: selectedProduct.price.retail_price,
            wholeSale_price: selectedProduct.price.wholeSale_price,
          },
        };
      }
    } else if (field === "quantity") {
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: Math.max(0, Number(value)),
      };
    } else if (field === "size") {
      updatedItems[index] = {
        ...updatedItems[index],
        size: value,
      };

      const selectedProduct = products.find(
        (p) => p.name === updatedItems[index].description
      );
      if (selectedProduct) {
        const basePrice = selectedProduct.price;
        let adjustedPrice;
        switch (value) {
          case "small":
            adjustedPrice = {
              retail_price: basePrice.retail_price * 0.8,
              wholeSale_price: basePrice.wholeSale_price * 0.8,
            };
            break;
          case "large":
            adjustedPrice = {
              retail_price: basePrice.retail_price * 1.2,
              wholeSale_price: basePrice.wholeSale_price * 1.2,
            };
            break;
          default: // medium
            adjustedPrice = basePrice;
        }
        updatedItems[index].price = adjustedPrice;
      }
    }

    setData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    const currentItem = data.items[0];
    if (
      !currentItem.description ||
      currentItem.quantity <= 0 ||
      currentItem.price.wholeSale_price <= 0
    ) {
      alert("Please select a product and ensure quantity and price are valid.");
      return;
    }

    const selectedProduct = products.find(
      (product) => product.name === currentItem.description
    );

    if (selectedProduct && selectedProduct.quantity < currentItem.quantity) {
      alert("Not enough stock available for this product.");
      return;
    }

    const updatedProducts = products.map((product) =>
      product.name === currentItem.description
        ? { ...product, quantity: product.quantity - currentItem.quantity }
        : product
    );
    setProducts(updatedProducts);

    setPreviewItems((prev) => [...prev, { ...currentItem }]);

    setData({
      ...data,
      items: [
        {
          description: "",
          quantity: 0,
          size: "medium",
          price: {
            retail_price: 0,
            wholeSale_price: 0,
          },
        },
      ],
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

    setPreviewItems((prev) => [...prev, { ...currentItem }]);

    const totalAmount = previewItems.reduce(
      (sum, item) => sum + item.quantity * item.price.wholeSale_price,
      currentItem.quantity * currentItem.price.wholeSale_price
    );

    const invoiceData = { ...data, totalAmount };

    try {
      const response = await axios.post(
        "http://localhost:4000/temiperi/invoice",
        invoiceData
      );
      if (response.status === 201) {
        alert("Order submitted successfully!");

        const updatedInvoiceNumber = latestInvoiceNumber + 1;

        setLatestInvoiceNumber(updatedInvoiceNumber);
        setData({
          invoiceNumber: `tm00${updatedInvoiceNumber + 1}`,
          customerName: "",
          items: [
            {
              description: "",
              quantity: 0,
              size: "medium",
              price: {
                retail_price: 0,
                wholeSale_price: 0,
              },
            },
          ],
        });
        setPreviewItems([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Invoice number already exists. Please refresh and try again.");
      } else {
        alert("Error creating invoice: " + error.message);
      }
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
                <input
                  type="text"
                  value={data.invoiceNumber}
                  name="invoiceNumber"
                  placeholder="tm001"
                  required
                  readOnly
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
                  Size:
                  <select
                    value={data.items[0].size}
                    onChange={(e) => handleItemChange(0, "size", e.target.value)}
                    required
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={data.items[0].quantity || ""}
                    onChange={(e) =>
                      handleItemChange(0, "quantity", e.target.value)
                    }
                    required
                    min="1"
                  />
                </label>
                <label className="price-label">
                  Price:
                  <span className="price-display">
                    GH₵{data.items[0].price.wholeSale_price.toFixed(2)}
                  </span>
                  <span className="total-display">
                    <strong>
                      Total: GH₵
                      {(data.items[0].quantity * data.items[0].price.wholeSale_price).toFixed(
                        2
                      )}
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
                            {item.price.wholeSale_price.toFixed(2)}
                          </td>
                          <td>
                            <span className="currency-symbol">GH₵</span>
                            {(item.quantity * item.price.wholeSale_price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4">
                          <strong>Total Amount:</strong>
                        </td>
                        <td>
                          <strong>
                            <span className="currency-symbol">GH₵</span>
                            {previewItems.reduce(
                              (sum, item) =>
                                sum + item.quantity * item.price.wholeSale_price,
                              0
                            ).toFixed(2)}
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
