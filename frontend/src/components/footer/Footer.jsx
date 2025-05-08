import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id="footer">

            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, minima dolorum reprehenderit natus debitis corrupti libero nulla perferendis eligendi iure?</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.instagram_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+123-344-3222</li>
                        <li>contact@example.com</li>
                    </ul>
                </div>
            
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2023. All rights reserved</p>
        </div>
    )
}

export default Footer