import React, {  useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";

const LikedItemPage = (props) => {
  const [linkedProduct,setLikedProduct]=useState(null);
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
  },[])
  return (
    <div className="shopcategory">
     
      <div className="shopcategory-products">
        {linkedProduct?linkedProduct.map((item, i) => {
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
        }):<div className="loader" style={{margin:"6em auto"}}></div>}
      </div>
      
    </div>
  );
};

export default LikedItemPage;
