import { useEffect, useState } from "react";
import { asset } from "../../assets/assets";
//import { createInvoice } from "../../../../backend/controllers/invocieControllers";
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

  const handleItemChange = (index, field, value) => {
    const items = [...data.items];
    items[index][field] = value;
    setData({ ...data, items });
  };

  const addItem = () => {
    setData({
      ...data,
      items: [...data.items, { description: "", quantity: 0, price: 0 }],
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
        "http://localhost:4000/temiperi/invoice",
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
              <h3>Items</h3>
              {data.items.map((item, index) => (
                <div key={index} className="items">
                  <label>
                    Description:
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </label>

                  <label>
                    Price:
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", Number(e.target.value))
                      }
                    />
                  </label>
                </div>
              ))}

              <button type="button" onClick={addItem}>
                Add Item
              </button>
              <h3>Total Amount: {calculateTotal()}</h3>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
