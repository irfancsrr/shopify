import React, { useState } from 'react'
import "./proceedToCheckout.css";
import { useNavigate } from 'react-router-dom';
const ProceedToCheckout = ({OrderProductDetail,totalAmount}) => {
    const [email,setEmail]=useState("");
    const [address,setAddress]=useState("");
    const [phoneNumber,setPhoneNumber]=useState(0);
    const navigateTO=useNavigate();
   const handleSubmit=()=>{
    fetch("https://back-end-1gp5.onrender.com/uploadOrder", {
        method: "POST",
        headers: {
          Accept: "application/form-Data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({orderProduct: OrderProductDetail,email,phoneNumber,address,totalAmount }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
        alert("your order has placed... ")
        // window.location.replace("/");
        navigateTO('/')

   }
  return (
    <form class="contact-form">
  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter your email" required />

  <label for="location">Location Address</label>
  <input type="text" id="location" name="location"onChange={(e)=>setAddress(e.target.value)} value={address} placeholder="Enter your location" required />

  <label for="phone">Phone Number</label>
  <input type="tel" id="phone" name="phone" onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} placeholder="Enter your phone number" required />

  <button onClick={handleSubmit}>Continue</button>
</form>
  )
}

export default ProceedToCheckout