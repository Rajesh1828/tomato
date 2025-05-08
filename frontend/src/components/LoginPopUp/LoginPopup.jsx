import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Login")
    const [data,setData]= useState({
        name: "",
        email: "",
        password: ""

    })

     const {url,setToken }= useContext(StoreContext)
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }

    // useEffect(() => {
    //     console.log(data)
    // },[data])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newUrl = url ;
        if(currentState === "Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        
        }

        const res = await axios.post(newUrl,data);

        if(res.status === 200){
            
            setToken(res.data.token)
            localStorage.setItem("token",res.data.token)
            
                
            setShowLogin(false)     
        
        }
        else{
            console.log(res.data.success)
            alert(res.data.message)
            
        }



        
    }
    return (
        <div className='login-popup'>
            <form onSubmit={handleSubmit} className="login-popup-container">
                <div className="login-popup-tittle">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-pop-inputs">
                    {currentState === "Login" ? <> </> : <input onChange={handleChange} name='name' value={data.name} type='text' placeholder='your name' required />
                    }

                    <input  onChange={handleChange} name='email'  value={data.email} type="email" placeholder='your-email ' required />
                    <input onChange={handleChange} name='password' value={data.password} type="password" placeholder='your-password' require />
                </div>

                <button className='login-popup-btn' type='submit'>{currentState === "signup" ? "Sign up" : "Login"}</button>
                
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>I agree to the terms and conditions</p>
                    {currentState === "Login" ?
                        <p>Don't have an Account ?<span onClick={() => setCurrentState("signup")}> click-here</span></p> :
                        <p>Already have an Account ?<span onClick={() => setCurrentState("Login")}> login</span></p>}
                </div>

            </form>

        </div>
    )
}

export default LoginPopup