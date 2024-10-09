import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src="@/assets/logo.png" alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat neque asperiores, iure, quae ipsa quam distinctio molestiae nemo autem possimus reiciendis accusantium at consequatur delectus voluptatem est corrupti illum repudiandae.</p>
          <div className="footer-social-icons">
            <img src="@/assets/facebook_icon.png" alt="" />
            <img src="@/assets/twitter_icon.png" alt="" />
            <img src="@/assets/linkedin_icon.png" alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-342-456-7890</li>
            <li>sangee@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright © 2012 - 2024 Tomato®. All rights reserved.</p>
    </div>
  )
}

export default Footer
