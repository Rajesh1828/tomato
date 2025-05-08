import React, { useState,useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const{getTotalAmount,cartItems,food_list,url,token}=useContext(StoreContext)
  const [data ,setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    county:"",
    phone:""
  })

  const placeOrder = async(e)=>{
    e.preventDefault()
    const orderData = {
      items: cartItems,
      amount: getTotalAmount(),
      address:data
    }
    console.log(orderData)
    try {
      const response = await fetch(`${url}/api/order/placeOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Order placed successfully:', result);
        // Handle success (e.g., show a success message, redirect, etc.)
      } else {
        console.error('Error placing order:', response.statusText);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle network error (e.g., show an error message)
    }
  


  }


  const handleChange =(e)=>{
  const {name,value} = e.target
  setData(data=>({...data,[name]:value}))

  }
  return (
    <form onAbort={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'> Deliver information</p>
        <div className="multi-fields">
          <input  name='firstName' onChange={handleChange} value={data.firstName} type="text" placeholder='first-name'/>
          <input  name='lastName' onChange={handleChange} value={data.lastName} type="text"  placeholder='last-name'/>
        </div>
        <input  name='email' onChange={handleChange} value={data.email} type="text"  placeholder='email'/>
        <input name='street' onChange={handleChange} value={data.street} type="text" placeholder='street'/>
        <div className="multi-fields">
          <input  name='city' onChange={handleChange} value={data.city} className='city' type="text" placeholder='city'/>
          <input  name='state' onChange={handleChange} value={data.state} className='state' type="text"  placeholder='state'/>
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={handleChange} value={data.zipcode} className='zipcode' type="text" placeholder='Zipcode'/>
          <input name='county' onChange={handleChange} value={data.county} className='county' type="text"  placeholder='county'/>
        </div>
        <input name='phone' onChange={handleChange} value={data.phone} type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>cart-Total</h2>
          <div>
            <div className="cart-total-details">
              <p>sub-total</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Deliver-fee</p>
              <p>${getTotalAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount()===0?0:getTotalAmount()+2}</b>
            </div>
      
          </div>

          <button type='submit'  >Proceed To payment</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder