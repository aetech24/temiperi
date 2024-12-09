import React from 'react'
import './addproduct.css'
import { Sidebar } from '../Sidebar/Sidebar'
import Orders from '../Orders/Orders'
import Header from '../Header/Header'

const AddProduct = () => {
  return (
    <>
    <Header />
    <div>
      <Orders />

      <h2>Add New Products</h2>
      <p>Please enter the product details in the table below</p>
      <div className='addproduct_container'>
        
      <Sidebar />
          <div className="addproduct">
            <label htmlFor="">
              <select name="" id="">
                <option value="">ABL</option>
                <option value="">Water</option>
                <option value="">Pet Drinks</option>
                <option value="">Guniness</option>
              </select>
            </label>
            <label htmlFor="">
              Product Name
              <input type="text" placeholder='Alvaro'/>
            </label>
            <label htmlFor="">
              Product Size
              <input type="text" placeholder='300ml'/>
            </label>
            <label htmlFor="">
              Price Per Case
              <input type="text" placeholder='300ml 12x02'/>
            </label>
            <label htmlFor="">
              RRB / Bottle
              <input type="text" placeholder='RRB / Bottle'/>
            </label>
          </div>
        </div>
            <div className='btn'><button>Add Product</button></div>

        {/* ============== display of recently added product table */}

        <table>
          <caption>Recently Add Products</caption>
          <thead>
            <tr>
              <th rowSpan={5}>Product Name</th>
              <th rowSpan={5}>Cargory</th>
              <th rowSpan={5}>Size</th>
              <th rowSpan={5}>Price per case</th>
              <th rowSpan={5}>RRP / Bottle</th>
            </tr>
          </thead>
        </table>
      </div>
      </>
  )
}

export default AddProduct