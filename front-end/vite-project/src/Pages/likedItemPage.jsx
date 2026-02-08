import React, {  useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";

const LikedItemPage = (props) => {
  const [linkedProduct,setLikedProduct]=useState(null);
  const [isTimeOut,setIsTimeOut]=useState(false);
  useEffect(()=>{
fetch("https://back-end-1gp5.onrender.com/getLikedItem", {
        method: "GET",
        headers: {
          Accept: "application/form-Data",
          "Content-Type": "application/json",
          "auth-token":`${localStorage.getItem("auth-token")}`,
        },
          
      })
        .then((response) => response.json())
        .then((data) =>{ console.log(data.likedItems)
          setLikedProduct(data.likedItems);
        });
        setTimeout(() => {
          setIsTimeOut(true)
        }, 6000);
  },[])
  return (
    <div className="likedCategory">
     
      <div className="shopcategory-products">
        {!linkedProduct||linkedProduct.length==0?
        (isTimeOut?<div style={{display:"flex",justifyContent:'center',alignContent:"center"}}>No liked product...</div>:
          <div className="skeleton-wrapper">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img shimmer"></div>
                <div className="skeleton-text shimmer"></div>
                <div className="skeleton-text short shimmer"></div>
              </div>
            ))}
          </div>
        )
        :linkedProduct.map((item, i) => {
         return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
        })}
      </div>
      
    </div>
  );
};

export default LikedItemPage;
