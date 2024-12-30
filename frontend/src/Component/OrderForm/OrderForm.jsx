import { useEffect, useState } from "react";
import { asset } from "../../assets/assets";
import "./sales.css";
import axios from "axios";
import InvoiceGenerator from "../Invoice/InvoiceGenerator";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import html2pdf from 'html2pdf.js';

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
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products. Please check your connection.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    const generateInvoiceNumber = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${baseURL}/invoice/number`
        );
        const { invoiceNumber } = response.data;
        if (!invoiceNumber || typeof invoiceNumber !== 'string' || !invoiceNumber.startsWith('tm')) {
          throw new Error('Invalid invoice number format');
        }
        setData(prevData => ({
          ...prevData,
          invoiceNumber: invoiceNumber
        }));
      } catch (error) {
        console.error("Error generating invoice number:", error);
        // Use a more sophisticated fallback that's less likely to conflict
        const timestamp = Date.now().toString().slice(-6);
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const fallbackNumber = `tm${timestamp}${randomNum}`;
        setData(prevData => ({
          ...prevData,
          invoiceNumber: fallbackNumber
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if there are any items to submit
      if (previewItems.length === 0) {
        const currentItem = data.items[0];
        // If no items in preview and current item is empty, show error
        if (!currentItem.description || currentItem.quantity <= 0) {
          toast.error("Please add at least one item before submitting.");
          return;
        }

        // If current item has data, add it first
        if (currentItem.description && currentItem.quantity > 0) {
          const selectedProduct = products.find((product) => product.name === currentItem.description);
          if (selectedProduct && selectedProduct.quantity < currentItem.quantity) {
            toast.error("Not enough stock available for this product.");
            return;
          }
          // Add current item to preview items
          setPreviewItems([...previewItems, { ...currentItem }]);
        }
      }

      // Get final list of items
      const finalItems = [...previewItems];
      if (data.items[0].description && data.items[0].quantity > 0) {
        finalItems.push({ ...data.items[0] });
      }

      // Calculate total amount
      const totalAmount = finalItems.reduce((sum, item) => {
        return sum + (item.quantity * item.price);
      }, 0);

      // Prepare the invoice data
      const invoiceData = {
        invoiceNumber: data.invoiceNumber,
        customerName: data.customerName,
        items: finalItems.map(item => ({
          description: item.description,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount
      };

      // Submit the invoice
      const response = await axios.post(
        `${baseURL}/invoice`,
        invoiceData
      );
      
      if (response.status === 201) {
        toast.success("Order submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // Reset form after successful submission
        setData({
          invoiceNumber: "",
          customerName: "",
          items: [{ description: "", quantity: 0, price: 0 }]
        });
        setPreviewItems([]);
        
        // Generate new invoice number
        generateInvoiceNumber();
      }
    } catch (error) {
      console.error("Error submitting invoice:", error);
      toast.error(error.response?.data?.error || "Failed to submit invoice. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleAddItem = () => {
    const currentItem = data.items[0];
    
    // Validate item
    if (!currentItem.description || currentItem.quantity <= 0) {
      toast.error("Please select a product and ensure quantity is valid.");
      return;
    }

    // Check stock
    const selectedProduct = products.find(product => product.name === currentItem.description);
    if (selectedProduct && selectedProduct.quantity < currentItem.quantity) {
      toast.error("Not enough stock available for this product.");
      return;
    }

    // Add item to preview
    setPreviewItems([...previewItems, { ...currentItem }]);
    
    // Reset current item
    setData({
      ...data,
      items: [{ description: "", quantity: 0, price: 0 }]
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

  const generatePDF = async () => {
    const invoice = document.getElementById('invoice-content');
    if (!invoice) return null;
    
    const options = {
      margin: 1,
      filename: `Invoice-${data.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    try {
      const pdfBlob = await html2pdf().set(options).from(invoice).outputPdf('blob');
      return pdfBlob;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return null;
    }
  };

  const handlePrintInvoice = () => {
    const printContent = document.querySelector('.preview-section');
    if (!printContent) {
      toast.error("Print reference not found", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Convert logo to base64 to ensure it prints
    const getBase64Image = (img) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/png");
    };

    // Preload the image
    const logoImg = new Image();
    logoImg.src = asset.logo;
    logoImg.onload = () => {
      const base64Logo = getBase64Image(logoImg);
      
      const printableContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @media print {
              body { 
                padding: 20px;
                color: #000 !important;
              }
              th {
                background-color: #2c3e50 !important;
                color: white !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .preview-customer-info, .terms-section {
                background-color: #f8f9fa !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              tfoot td {
                background-color: #f8f9fa !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              color: #2c3e50;
            }
            .preview-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #eee;
            }
            .preview-company-info {
              text-align: center;
            }
            .preview-company-info h2 {
              color: #2c3e50;
              margin-bottom: 5px;
              font-size: 24px;
            }
            .preview-company-info p {
              color: #666;
              margin: 2px 0;
              font-size: 14px;
            }
            .preview-date {
              text-align: right;
            }
            .preview-customer-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 6px;
            }
            .preview-customer-info h4 {
              color: #2c3e50;
              margin: 5px 0;
              font-size: 16px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              background-color: white;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #eee;
            }
            th {
              background-color: #2c3e50;
              color: white;
              font-weight: 500;
              text-transform: uppercase;
              font-size: 14px;
            }
            .currency-symbol {
              color: #666;
              margin-right: 2px;
            }
            tfoot td {
              font-weight: bold;
              background-color: #f8f9fa;
            }
            .signature-section {
              display: flex;
              justify-content: space-between;
              margin: 50px 0 30px;
              padding: 0 50px;
            }
            .signature-box {
              text-align: center;
            }
            .signature-box p:first-child {
              margin-bottom: 10px;
              color: #666;
              border-top: 1px solid #666;
              padding-top: 10px;
            }
            .terms-section {
              padding: 20px;
              background-color: #f8f9fa;
              border-radius: 6px;
              margin-top: 30px;
            }
            .terms-section p {
              font-weight: 600;
              margin-bottom: 10px;
              color: #2c3e50;
            }
            @media print {
              body { padding: 20px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="preview-header">
            <img src="${base64Logo}" alt="Company Logo" width="100" style="object-fit: contain;" />
            <div class="preview-company-info">
              <h2>Temiperi Enterprise</h2>
              <p>Wholesale and Retail of Drinks</p>
              <p>Contact: +233 24 123 4567</p>
            </div>
            <div class="preview-date">
              <p>Date: ${formattedDate}</p>
              <p>Time: ${formattedTime}</p>
            </div>
          </div>

          <div class="preview-customer-info">
            <div>
              <h4>Invoice #: ${data.invoiceNumber}</h4>
              <h4>Customer: ${data.customerName}</h4>
            </div>
          </div>

          <h3>Order Summary</h3>
          <table>
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
              ${previewItems.map((item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td><span class="currency-symbol">GH₵</span>${Number(item.price).toFixed(2)}</td>
                  <td><span class="currency-symbol">GH₵</span>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4"><strong>Total Amount:</strong></td>
                <td>
                  <strong>
                    <span class="currency-symbol">GH₵</span>${previewItems.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>

          <div class="signature-section">
            <div class="signature-box">
              <p>____________________</p>
              <p>Authorized Signature</p>
            </div>
          </div>

          <div class="terms-section">
            <p>All Terms & Conditions applied</p>
          </div>
        </body>
        </html>
      `;

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(printableContent);
      printWindow.document.close();
      
      // Wait for images to load before printing
      setTimeout(() => {
        printWindow.print();
        // Optional: close the window after printing
        // printWindow.close();
      }, 500);
    };
  };

  const handleShareWhatsApp = () => {
    setShowPhonePrompt(true);
  };

  const sendToWhatsApp = async () => {
    if (!customerPhone) {
      toast.error("Please enter a phone number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Generate PDF
    const pdfBlob = await generatePDF();
    if (!pdfBlob) {
      toast.error("Error generating PDF invoice");
      return;
    }

    // Create message content with proper formatting
    const message = `*TEMIPERI ENTERPRISE*\n\n` +
      `*Invoice #:* ${data.invoiceNumber}\n` +
      `*Customer:* ${data.customerName}\n` +
      `*Date:* ${formattedDate}\n` +
      `*Time:* ${formattedTime}\n\n` +
      `Please find your invoice attached.\n\n` +
      `Thank you for your business!`;

    // Create WhatsApp URL with the formatted phone number
    const whatsappUrl = `https://wa.me/${customerPhone}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
    
    // Reset prompt
    setShowPhonePrompt(false);
    setCustomerPhone("");
  };

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
            <form onSubmit={handleSubmit}>
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

              <button type="button" onClick={handleAddItem}>
                Add Item
              </button>

              <button type="submit">Submit</button>

              {/* Preview Section */}
              {previewItems.length > 0 && (
                <>
                  <div className="preview-section" id="invoice-content">
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

                  {/* Action buttons outside the preview section */}
                  <div className="invoice-actions">
                    <button onClick={handlePrintInvoice} className="action-button print">
                      Print Invoice
                    </button>
                    <button onClick={handleShareWhatsApp} className="action-button whatsapp">
                      Share via WhatsApp
                    </button>
                  </div>

                  {/* Phone number prompt */}
                  {showPhonePrompt && (
                    <div className="phone-prompt-overlay">
                      <div className="phone-prompt">
                        <h3>Enter Customer's Phone Number</h3>
                        <PhoneInput
                          country={'gh'}
                          value={customerPhone}
                          onChange={phone => setCustomerPhone(phone)}
                          inputProps={{
                            required: true,
                          }}
                        />
                        <div className="phone-prompt-buttons">
                          <button onClick={sendToWhatsApp}>Send</button>
                          <button onClick={() => setShowPhonePrompt(false)}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
