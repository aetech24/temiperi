import React from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom'
import { asset } from '../../assets/assets'

export const Sidebar = () => {
  return (
    <div className='sidebar_container'>
      {/* <h3>this is our side bar</h3> */}
      <div className="content">
         <img src={asset.product_icon} alt="" />
         <NavLink to={'/product'}>
            Products
         </NavLink>
      </div>

      <div className="content">
         <img src={asset.analytics_icon} alt="" />
<<<<<<< HEAD
         <NavLink to={'/'}>
=======
         <NavLink to={'/analysis'}>
>>>>>>> 97e05c18e7d04786bdefc534ce840a5ec71f1cf3
            Analysis
         </NavLink>
      </div>

      <div className="content">
         <img src={asset.add_product} alt="" />
         <NavLink to={'/addproduct'}>
            Add Products
         </NavLink>
      </div>

      <div className="content">
         <img src={asset.setting_icon} alt="" />
         <NavLink to={'/settings'}>
            Settings
         </NavLink>
      </div>
    </div>
  )
}
