import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setShowLogin}) => {


  const navigate =  useNavigate()

    const {cartItems,token,setToken} = useContext(StoreContext)
     const[menu, setMenu]= useState("Home")
     const handleLogout = () =>{
        setToken(null)
        localStorage.removeItem("token")
        alert("Logout Successfully")
        navigate("/")
        
     }

    

    return (
        <div className='navbar'>
          <Link to='/'> <img src={assets.logo} alt="" className='logo' />  </Link>  
            <ul className='navbar-menu'>
             <Link to="/"  onClick={()=>{setMenu("Home")}} className={menu==="Home"? "active":""}>Home </Link>  
                <a href="#explore-menu"  onClick={()=>{setMenu("Menu")}} className={menu === "Menu"?"active":""}>Menu</a>
                <a href='#app-download' onClick={()=>{setMenu("Mobile-App")}} className={menu === "Mobile-App"?"active":""}>Mobile-App</a>
                <a href='#footer' onClick={()=>{setMenu("contact-us")}} className={menu === "contact-us"?"active":""}>contact-us</a>
        
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                    <img src={assets.basket_icon} alt='' />
              <span>{Object.values(cartItems).reduce((a,b)=>a+b,0)}</span>
                    </Link>
                    <div className="dot"></div>
                </div>
                {!token?
                <button onClick={()=>setShowLogin(true) }>Sign in</button>
            
                :  <div className="nav-bar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className="profile-menu">
                  <li><img src={assets.bag_icon} alt="" /> Orders</li>
                  <hr />
                  <li onClick={handleLogout}><img src={assets.logout_icon} alt="" /> Logout</li>
                </ul>
              </div>}
            </div>
        </div>
    )
}

export default Navbar