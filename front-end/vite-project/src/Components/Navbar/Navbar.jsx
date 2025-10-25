import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart from "../Assets/cart.png";
import { Link, useNavigate} from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import dropdown from "../Assets/dropdown.png";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
   const [formData,setFormData] = useState(null);
    const [liked, setLiked] = React.useState(false);

  const {isSignedIn,user}=useUser();
  const { getTotalCartItems,setIsLoggedIn} = useContext(ShopContext);
  const menuRef = useRef();
  const [onceCardValue,setOnceCardValue]=useState(true);
  const navigateTo=useNavigate();
  const [isActive, setIsActive] = useState(false);
  
  const styles = {
    button: { 
      transition: 'transform 0.2s ease-in-out',
    },
    active: {
      transform: 'scale(0.78)',
    },
  };


  

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };
  useEffect(()=>{
   if(isSignedIn ){
    
    setFormData({
      username:user.username,
      email:user.emailAddresses[0].emailAddress
    })
    setTimeout(()=>{

setIsLoggedIn(true);
setOnceCardValue(false);
    },3000)
   
  console.log('login')
   }
   else
    console.log("not login")
  
  },[isSignedIn]);
  if(formData){
  (async()=>{
    let responseData;
     await fetch('https://back-end-1gp5.onrender.com/signup',{
      method:"POST",
      headers:{
        Accept:"application/form-data",
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      // window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  })()

  } 
    


  return (
    <div className="Navbar_main_container">
      <div className="nav-logo" style={{cursor:"pointer"}} onClick={()=>{setLiked(false);setMenu('nav-logo'); window.location.replace('/')}}>
        <img src={logo} width="100px" height="60px" />
        <p>SHOPIFY</p>
      </div>
      {/* <img className="nav-dropdown" onClick={dropdown_toggle} src={dropdown} />  */}
      <img className="nav-dropdown" onClick={dropdown_toggle} src={dropdown} />

      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
            setLiked(false);
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
            setLiked(false);
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>{" "}
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
            setLiked(false);
          }}
        >
          <Link style={{ textDecoration: "none" }} to="womens">
            {" "}
            Women
          </Link>{" "}
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
            setLiked(false);
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            {" "}
            Kid{" "}
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="login-cart">

        <SignedOut>
        <Link to="/sign-in">
            <button  onClick={()=>{setLiked(false);setMenu('nav-logo')}} style={{width: "150px",height: "50px",outline: "none",border: "2px solid #7a7a7a",borderRadius: "50px",
    color: "#515151",
    fontSize: "25px",
    fontWeight: 500,
    background: "white",
    
    cursor: "pointer",
  }}
>sign-in</button>
          </Link>
      </SignedOut>
      <SignedIn>
         <div className={`heart-wrapper ${liked ? 'active' : ''}`} onClick={() =>{
            setMenu("cart-icon");
           setLiked(!liked);
            navigateTo("/likedItems")
          }
          }
           >
      {liked ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
    </div>

       
        <Link to="/cart"  onClick={() => {
            setMenu("cart-icon");
            setLiked(false);
          }}>
          <img src={cart} width="60px" height="60px" alt="" style={{
        ...styles.button,
        ...(isActive ? styles.active : {}),
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
/>
        </Link>
        <div className="nav-cart-count">{onceCardValue?0:getTotalCartItems()}</div>
         <div >
        <UserButton 
/>
        </div>
      </SignedIn>
        
       
        
      </div>
    </div>
  );
};

export default Navbar;
