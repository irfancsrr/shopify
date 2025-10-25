import React from 'react'
import "./Admin.css"
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Promocode from '../../Components/promocode/Promocode'

const Admin = () => {
  return (
    <div className='admin' >
        <Sidebar/>
      <Routes>
        
        <Route path='/promocode' element={<Promocode/>} />
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/listproduct' element={<ListProduct/>} />
      </Routes>
    </div>
  )
}

export default Admin;
