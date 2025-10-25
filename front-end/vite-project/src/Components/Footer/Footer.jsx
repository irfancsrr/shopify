import React from "react";
import "./Footer.css";
import logo from "../Assets/logo.png";
import insta_icon from "../Assets/insta_icon.png"
import linkedln_icon from "../Assets/linkedln_icon.png"
import wb_icon from "../Assets/wb_icon.png"
import { useNavigate } from "react-router-dom";


const Footer = () => {
  return (
    <div className="Footer-main-container">
      <div className="footer-logo" style={{cursor:"pointer"}} onClick={()=>{window.scrollTo(0,0); window.location.replace('/')}}>
        <img src={logo }  width="90px" height="65px" alt="footer-logo" />
        <p>SHOPIFY</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li> About </li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icon-container">
       <a href="https://www.instagram.com/">  <img src={insta_icon} alt="instagram-icon" /> </a> 
        </div>
        <div className="footer-icon-container">
         <a href="https://in.linkedin.com/"> <img src={linkedln_icon} alt="linkedln-icon" /> </a> 
        </div>
        <div className="footer-icon-container">
         <a href="https://www.whatsapp.com/"> <img src={wb_icon} alt="whatsaap-icon" /> </a> 
        </div>
      </div>
      <div className="footer-copyright">
        <hr/>
        <p>Copyright @ 2023 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
