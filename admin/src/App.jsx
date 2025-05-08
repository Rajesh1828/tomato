import React from 'react'
import Navbar from './componets/Navbar/Navbar'
import Sidebar from './componets/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from '../pages/Add/Add'
import List from '../pages/List/List'
import Order from '../pages/Orders/Order'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';




const App = () => {

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="app-content">
        <Sidebar />


        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Order/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App