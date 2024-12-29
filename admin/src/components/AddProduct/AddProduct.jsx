<<<<<<< HEAD
import React, { useState } from "react";
import "./addproduct.css";
import { Sidebar } from "../Sidebar/Sidebar";
import Orders from "../Orders/Orders";
import Header from "../Header/Header";
import axios from "axios";

const AddProduct = () => {
  // URL endpoints
  const devUrl = "http://localhost:4000/temiperi";

  // State for form fields
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: {
      retail_price: "",
      whole_sale_price: "",
    },
    quantity: "",
  });

  // URL Endpoint
  const url = "http://localhost:4000/temiperi/products";
  const productionUrl = "https://temiperi-backend.onrender.com";

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "retail_price" || name === "whole_sale_price") {
      setProductData((prev) => ({
        ...prev,
        price: { ...prev.price, [name]: Number(value) },
      }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, productData);
      alert("Product added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product!");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div>
        <Orders url={devUrl} />
=======
import './addproduct.css'
import { Sidebar } from '../Sidebar/Sidebar'
import Orders from '../Orders/Orders'
import Header from '../Header/Header'
import axios from 'axios'
import { useState } from 'react'


const AddProduct = () => {
  const [data, setData] = useState({
    category: '', 
    retail_price: '',
    wholesale_price: '',
    quantity: '',
    name: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('quantity', Number(data.quantity));
    formData.append('wholesale_price', Number(data.wholesale_price));
    formData.append('retail_price', Number(data.retail_price));
    
    const response = await axios.post('https://temiperi-stocks-backend.onrender.com/temiperi/products', formData);
    console.log(response.data)
    if(response.data.success){
      setData({
        category: "",
        retail_price: "",
        wholesale_price: "",
        quantity: "",
        name: "",
      });
    } else {
      console.log('error')
    }
  }

  // use to check if our data is rendering
  // useEffect(() => {console.log(data);
  // }, [data])


  return (
    <>
      <Header />
      <div>
        <Orders />
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3

        <h2>Add New Products</h2>
        <p>Please enter the product details in the table below</p>
        <div className="addproduct_container">
          <Sidebar />
<<<<<<< HEAD
          <form className="addproduct" onSubmit={handleSubmit}>
            <label>
              Category
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="ABL">ABL</option>
                <option value="Water">Water</option>
                <option value="Pet Drinks">Pet Drinks</option>
                <option value="Guinness">Guinness</option>
              </select>
            </label>
            <label>
              Product Name
              <input
                type="text"
                name="name"
                placeholder="Alvaro"
                value={productData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Retail Price
              <input
                type="number"
                name="retail_price"
                placeholder="Retail Price"
                value={productData.price.retail_price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Wholesale Price
              <input
                type="number"
                name="whole_sale_price"
                placeholder="Wholesale Price"
                value={productData.price.whole_sale_price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Quantity
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={productData.quantity}
                onChange={handleInputChange}
              />
            </label>
            <div className="btn">
              <button type="submit">Add Product</button>
            </div>
          </form>
        </div>

        {/* Display Recently Added Products */}
        <table>
          <caption>Recently Added Products</caption>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Retail Price</th>
              <th>Wholesale Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{productData.name}</td>
              <td>{productData.category}</td>
              <td>{productData.price.retail_price}</td>
              <td>{productData.price.whole_sale_price}</td>
              <td>{productData.quantity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddProduct;
=======
          <div className="addproduct">
            <form onSubmit={onSubmitHandler}>
              <label htmlFor="">
                Category
                <select onChange={onChangeHandler} name="category" id="">
                  <option value="ABL">ABL</option>
                  <option value="Beer">Beer</option>
                  <option value="Peeva">Peeva Products</option>
                  <option value="Verna">Verna Products</option>
                  <option value="Twelluim">Twelluim Products</option>
                  <option value="Guiness">Guniness</option>
                </select>
              </label>
              <label htmlFor="">
                Product Name
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder="Alvaro" />
              </label>
              <label htmlFor="">
                Quantity
                <input onChange={onChangeHandler} value={data.quantity} type="text" name='quantity' placeholder="300" />
              </label>
              <label htmlFor="">
                Retail Price
                <input onChange={onChangeHandler} value={data.retail_price} type="text" name='retail_price' placeholder="Retail Price" />
              </label>
              <label htmlFor="">
                Wholesale Price
                <input onChange={onChangeHandler} value={data.wholesale_price} type="text" name='wholesale_price' placeholder="wholesale Price" />
              </label>
              <label htmlFor="">
                Size
                <input type="text" name='size' placeholder="RRB / Bottle" />
              </label>

              <div className="btn">
                <button type='submit'>Add Product</button>
              </div>
            </form>
          </div>
        </div>

        {/* ============== display of recently added product table */}

        
      </div>
    </>
  );
}

export default AddProduct
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
