import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";


export const StoreContext = createContext(null);



const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [token , setToken] = useState("");
    const [food_list , setFoodList] = useState([]);


    const url = "https://tomato-backend-0h8d.onrender.com"

 const addToCart = async(itemId) => {
    if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))

    }
    else{
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1}))
    }
    if(token){
        await axios.post(url+"/api/cart/add", {itemId}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
            
    }
 }


 const removeFromCart = async(itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
        await axios.post(url+"/api/cart/remove", {itemId}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
 }


 const getTotalAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItems){
        if( cartItems[item]>0){
            let food_info = food_list.find((product)=>product._id === item)
            totalAmount+= food_info.price*cartItems[item];

        }

    }
    return totalAmount
    
 }

 // Fetch food list from the server
 // Fetch food list from the server
 const fetchFoodList = async ()=>{
    const res = await axios.get(url+"/api/food/all");
    setFoodList(res.data.data)
 }

    const fetchCartItems = async ()=>{
        if(token){
            const res = await axios.post(url+"/api/cart/get", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(res.data.cartData);
        }
    }

    // Fetch food list and cart items when the component mounts or when the token changes
    // and when the token changes
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    
        fetchFoodList();
    
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            fetchCartItems();
        }
    
    }, [token]);  // Fetch cart when token changes
    
    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getTotalAmount,
        url,
        token,
        setToken


    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )


}


export default StoreContextProvider;
