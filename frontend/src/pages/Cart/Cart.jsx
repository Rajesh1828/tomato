import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
const Cart = () => {

  const { cartItems, addToCart, removeFromCart, food_list,  getTotalAmount ,url} = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-tittle">
          <p>Item</p>
          <p>title</p>
          <p>price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>

        </div>
        <br />
        
        {
          Object.values(cartItems).reduce((a, b) => a + b.a, 0) === 0 ? (
            <h1>🛒 Cart is empty</h1>
          ) : (
            food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div className="cart-item" key={item._id}>
                    <img src={url+"/images/"+ item.image} alt="image" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <div className="cart-items-quantity">
                      <button onClick={() => removeFromCart(item._id)}>-</button>
                      <p>{cartItems[item._id]}</p>
                      <button onClick={() => addToCart(item._id)}>+</button>
                    </div>
                    <p>${cartItems[item._id] * item.price}</p>
                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                  </div>
                );
              }
            })
          )
        }

      </div>


      <div className="cart-bottom">
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

          <button onClick={()=>navigate('/placeOrder')}>Proceed To checkOut</button>
        </div>
        <div className="cart-promocode">
          <h3>if you have a promocode</h3>
          <div className="cart-promocode-input">
            <input type="text" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart