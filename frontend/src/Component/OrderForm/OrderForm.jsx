import React, { useState } from 'react'
import { asset } from '../../assets/assets'
import axios from 'axios'
import {toast} from 'react-toastify'
import { createInvoice } from '../../../../backend/controllers/invocieControllers'
import '../Sales/sales.css'


const OrderForm = (onInvoiceCreated) => {
   //defining product data
   const [data, setData] = useState({
      invoiceNumber: '',
      customerName: '', 
      items: [{description: '', quantity: 0, price: 0}]
   })

   const [success, setSuccess] = useState(false)

   const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData(data => ({...data, [name]:value}))
   }

   const handleItemChange = (index, field, value) => {
      const items = [...data.items];
      items[index][field] = value;
      setData({...data, items})
   }

   const addItem = () => {
      setData({
         ...data, items: [...data.items, {description: '', quantity: 0, price: 0}]
      });
   };

   const calculateTotal = () => {
      data.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
   }

   const onSubmitHandler = async (e) => {
      e.preventDefault();
      const totalAmount = calculateTotal()
      const invoiceData = {...data, totalAmount}
      //const formData = new FormData();

      try {
         const newInvoice = await createInvoice(invoiceData)
         alert('invoice created successfully')
         onInvoiceCreated(newInvoice);
         setData({
            invoiceNumber: '',
            customerName: '',
            items: [{description: '', quantity: 0, price: 0}]
         })
      } catch (error) {
         alert('error creating invoice: ' + error)
      }
     
   }

   //date and time 
   const date = new Date().getDate()
   const time = new Date().getHours()
   const minute = new Date().getMinutes()
   const month = new Date().getMonth()
   const year = new Date().getFullYear()

  return (
   <>
      {
         success ? (<><h1>Order Submitted, view invoice</h1><p><a href=''></a>Invoice</p></>):(
            <div className='sales_container'>
            <img src={asset.logo} alt="" width={120}/>
            <div className="date">
               <b>Date: {date}</b>
               <b> {month + 1}</b>
               <b> {year + ', '}</b>
               <b>Time: {time}</b>
               <b> {minute}</b>
            </div> 
      
      
            <div className="form_container">
            <form onSubmit={onSubmitHandler}>
               <h1>Submit Order</h1>
               <label>
                  Invoice Number
                  <input 
                     type="text" 
                     value={data.invoiceNumber} 
                     onChange={onChangeHandler} 
                     name='invoiceNumber' 
                     required
                  />
               </label>
               <label>
                  Customer Name: 
                  <input 
                     type="text" 
                     value={data.customerName} 
                     onChange={onChangeHandler} 
                     name='customerName' 
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
                        value={data.description} 
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)} 
                     />
                     </label>
                     <label>
                        Quantity:
                     <input 
                        type="text" 
                        value={data.quantity} 
                        onChange={(e) => handleItemChange(index, 'quantity', +e.target.value)} 
                     />
                     </label>
                     <label>
                        Price:
                     <input 
                        type="text" 
                        value={data.price} 
                        onChange={(e) => handleItemChange(index, 'price', +e.target.value)} 
                     
                     />
                     </label>
                  </div>
               ))}
             
               <button type='button' onClick={addItem}>Add Item</button>
               <h3>Total Amount: {calculateTotal()}</h3>
               <button type='submit'>Submit</button>
            </form>
            </div>
          </div>
         )
      }
   </>
  
  )
}

export default OrderForm