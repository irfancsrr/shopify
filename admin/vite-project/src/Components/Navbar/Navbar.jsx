import React from 'react';
import './Navbar.css';
// import logo from "../../assets/logo.png";
import shopper from "../../assets/shopper.png";
import nav_profile from "../../assets/nav_profile.png";

const Navbar = () => {
  return (
    <div className='navbar' >
        <img src={shopper} className="Nav-logo" />
        <center><h3>SHOP NOW</h3></center>
        <img src={nav_profile} alt="nav-profile" className='nav-profile' />

      
    </div>
  )
}

export default Navbar

