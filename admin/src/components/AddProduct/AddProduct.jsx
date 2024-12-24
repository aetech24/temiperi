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

        <h2>Add New Products</h2>
        <p>Please enter the product details in the table below</p>
        <div className="addproduct_container">
          <Sidebar />
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
