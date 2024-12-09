import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login/Login'
import Analysis from './components/Analysis/Analysis'
import Header from './components/Header/Header'
import Orders from './components/Orders/Orders'
import Products from './components/Products/Products'
import AddProduct from './components/AddProduct/AddProduct'
import Settings from './components/Settings/Settings'
import Report from './components/Reprot/Report'
import Footer from './components/Footer/Footer'

const App = ({data}) => {

  const url = 'http://localhost:4000'
  const [showLogin, setShowLogin] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if(!data){
      showLogin
    } else {
      navigate('/analysis')
    }
  }, [])
  return (
    <>
      {showLogin ? < Login url={url}/> : setShowLogin='/analysis'}
    <div>
      <Routes>
        <Route path='/analysis' element={<Analysis url={url}/>}/>
        <Route path='/product' element={<Products url={url}/>}/>
        <Route path='/addproduct' element={<AddProduct url={url}/>}/>
        <Route path='/settings' element={<Settings url={url}/>}/>
        <Route path='/report' element={<Report url={url}/>}/>
        <Route path='/orders' element={<Orders url={url}/>} />
        <Route path='/login' element={<Login url={url}/>}/>
      </Routes>
      {/* <Footer /> */}
    </div>
    </>
  )
}

export default App