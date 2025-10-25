import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './item.css'
// import
import remove_icon from "../../assets/remove_icon.png";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Item = ({product,Index}) => {
    const [liked,setLiked]=useState(false);
    const navigateTo=useNavigate();
    const [productID,setProductID]=useState(null);

const removeproduct = async(id)=>{
      await fetch('https://back-end-1gp5.onrender.com/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },body:JSON.stringify({id:id})
      })
    //   navigateTo('/listproduct')
    window.location.replace('/listproduct')
      
    }

    useEffect(()=>{
            if(liked){
                fetch("https://back-end-1gp5.onrender.com/addpopuler", {
            method: "POST",
            headers: {
              Accept: "application/form-Data",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: productID }),
          })
            .then((response) => response.json())
            .then((data) => console.log(data));
            }
            
        },[liked])
        const  handleRemoveLiked=(ID)=>{
       fetch("https://back-end-1gp5.onrender.com/removepopuler", {
        method: "POST",
        headers: {
          Accept: "application/form-Data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: ID }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));  
    //  console.log("remove hu mai ");
      // console.log(productID);
    }
  return (
    <div key={Index} className="listproduct-format-main listproduct-format" >
                <img src={product.image}  className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{removeproduct(product.id)}} className='listproduct-remove-icon' src={remove_icon} />
                <div style={{zIndex:"100",top:"10em"}} onClick={()=>{
                                setLiked(!liked);
                                
                                setProductID(product._id);
                                }}>
                            {liked?<FaHeart color="red" size={24} onClick={()=>handleRemoveLiked(productID)} />:<FaRegHeart color="gray" size={24} />}       
                            
                
                            </div>
              </div> 
        
  )
}

export default Item