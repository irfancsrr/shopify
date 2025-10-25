import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/remove_icon.png";
import Form from 'react-bootstrap/Form';
import ProceedToCheckout from "./proceedToCheckout";
import { useNavigate } from "react-router-dom";


const CartItems = () => {
  const {getTotalCartAmount,allproduct, cartItems, removeFromCart } =
    useContext(ShopContext);
    const [proceedToCheckout,setProceedToCheckout]=useState(false);
    const navigateTO=useNavigate();
    const [promocode,setPromocode]=useState("");
    let [copyCardProduct,setCopyCardProduct]=useState(null);
    let [orderProductDetail,setOrderProductDetail]=useState(null);
    const [offamount,setOffamount]=useState(0);
   

useEffect(()=>{
  if(copyCardProduct?.length){
    setProceedToCheckout(false);
  }
},[copyCardProduct])
  useEffect(()=>{
    let copyFilter=allproduct.filter(item=>cartItems[item.id]>0);
    
    let copyProduct=copyFilter.map(item=>{
      
      let copyItem={
        productId:item._id,
        quantity:cartItems[item.id],
        price:item.new_price
      }
    // console.log(copyItem);
     return copyItem


    })
    setOrderProductDetail(copyProduct)
      setCopyCardProduct(copyFilter);
      // console.log(copyFilter)
  // console.log("hello bhiya")
  },[]);
  
  const handlePromo=async(promoValue)=>{
    fetch("https://back-end-1gp5.onrender.com/getOffamountByPromocode",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({promoValue})
    })
    .then((data)=>data.json())
    .then(respond=>{
      // console.log("promocode",respond);
      // if((Date.now()-respond.date)<2)
      setOffamount(respond.offamount)
      setPromocode("")
      });
  }
  // console.log(/)   
  return (
    (allproduct?
      <div className="CartItems-main-container">
      <div className="Cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {copyCardProduct?
      copyCardProduct.map((e) => {
          return (
            <div>
              <div className="cartitems-format Cartitem-format-main">
                <img className="carticon-product-icon" style={{cursor:"pointer"}} src={e.image} alt="" onClick={()=>{
                  navigateTO(`/product/${e.id}`);
                }} />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p> 
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                    // window.location.reload();
                  }}
                  alt="remove-icon"
                />
              </div>
              <hr />
            </div>
          );
      }):<></>
      }
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${((getTotalCartAmount())>offamount)?getTotalCartAmount()-offamount:getTotalCartAmount()}</h3>
            </div>
          </div>
         {proceedToCheckout?<ProceedToCheckout totalAmount={((getTotalCartAmount())>offamount)?getTotalCartAmount()-offamount:getTotalCartAmount()} OrderProductDetail={orderProductDetail} />:
        <button className="proceedToCheckout" onClick={()=>{
          if(copyCardProduct?.length)setProceedToCheckout(!proceedToCheckout)}}>PROCEED TO CHECKOUT</button>
        } 
        

        </div>
        <div className="cartitem-promocode">
          <p>if you have a promo code ,Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" onChange={(e)=>setPromocode(e.target.value)} value={promocode} />
            <button onClick={()=>handlePromo(promocode)} >Submit</button>
          </div>
        </div>
      </div>
    </div>:<div className="loader" style={{margin:"6em auto"}}></div>)
  );
};

export default CartItems;