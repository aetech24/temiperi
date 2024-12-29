import { useState } from "react";
import axios from "axios";
import { asset } from "../../assets/assets";
import "../Sales/sales.css";

const OrderForm = ({ onInvoiceCreated }) => {
  // Define product data
  const [data, setData] = useState({
    invoiceNumber: "",
    customerName: "",
    items: [{ description: "", quantity: 0, price: 0 }],
  });

  // Handle input changes for invoice data
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input changes for items
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...data.items];
    updatedItems[index][field] = value;
    setData((prev) => ({ ...prev, items: updatedItems }));
  };

  // Add a new item to the list
  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 0, price: 0 }],
    }));
  };

  // Calculate total amount
  const calculateTotal = () => {
    return data.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const totalAmount = calculateTotal();
    const payload = { ...data, totalAmount };

    try {
      const response = await axios.post(
        "http://localhost:4000/temiperi/invoice",
        payload
      );
      alert("Invoice created successfully!");

      if (onInvoiceCreated) {
        onInvoiceCreated(response.data);
      }

      // Reset form data
      setData({
        invoiceNumber: "",
        customerName: "",
        items: [{ description: "", quantity: 0, price: 0 }],
      });
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Error creating invoice: " + error.message);
    }
  };

  // Date and time
  const date = new Date();
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <div className="sales_container">
      <img src={asset.logo} alt="logo" width={120} />
      <div className="date">
        <b>Date: {formattedDate}</b>
        <b> Time: {formattedTime}</b>
      </div>

      <div className="form_container">
        <form onSubmit={onSubmitHandler}>
          <h1>Submit Order</h1>

          <label>
            Invoice Number:
            <input
              type="text"
              name="invoiceNumber"
              value={data.invoiceNumber}
              onChange={onChangeHandler}
              required
            />
          </label>

          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={data.customerName}
              onChange={onChangeHandler}
              required
            />
          </label>

          <h3>Items</h3>
          {data.items.map((item, index) => (
            <div key={index}>
              <label>
                Description:
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  required
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", +e.target.value)
                  }
                  required
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", +e.target.value)
                  }
                  required
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
  );
};

export default OrderForm;
