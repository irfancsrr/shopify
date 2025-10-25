import React, { use, useContext, useEffect, useState } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
    const navigateTO=useNavigate();
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [liked,setLiked]=useState(false);
    useEffect(()=>{
        fetch("https://back-end-1gp5.onrender.com/isLikedItem", {
        method: "POST",
        headers: {  
          Accept: "application/form-Data",
          "Content-Type": "application/json",
          "auth-token":`${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ likedItemID: product._id }),
      })
        .then((response) => response.json())
        .then((data) =>{ console.log(data);setLiked(data.success);});
    },[navigateTO])
    useEffect(()=>{
        if(liked){
            fetch("https://back-end-1gp5.onrender.com/likedItem", {
        method: "POST",
        headers: {
          Accept: "application/form-Data",
          "Content-Type": "application/json",
          "auth-token":`${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ productID: product._id }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
        }
        
    },[liked])
  const  handleRemoveLiked=()=>{
       fetch("https://back-end-1gp5.onrender.com/removeLikedItem", {
        method: "POST",
        headers: {
          Accept: "application/form-Data",
          "Content-Type": "application/json",
          "auth-token":`${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ productID: product._id }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));  
    }
  return (
    <div className='productdisplay-main-container' > 
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img  className='productdisplay-main-img' src={product.image} alt="" />
            </div>
            <div style={{zIndex:"100",position:"absolute",top:"10em"}} onClick={()=>{
                setLiked(!liked);

                }}>
            {liked?<FaHeart color="red" size={24} onClick={handleRemoveLiked} />:<FaRegHeart color="gray" size={24} />}       
           

            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} />
                <img src={star_icon} />
                <img src={star_icon}/>
                <img src={star_icon}/>
                <img src={star_dull_icon} />
                <p>{122}</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-prices-old">${product.old_price}</div>
                <div className="productdisplay-right-prices-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                A lightweight, usually knitted , pullover shirt,close-fitting a round neckline and short
                sleeves , worm as an undershirt or outer garment
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button className='addtocardbutton' onClick={() => {
                // console.log(`product id ${product.id}`)
                addToCart(product.id)}} >Add to Cart</button>
            <p className='productdisplay-right-category' > <span>Category:</span> Women , T-shirt, Crop Top </p>
            <p className='productdisplay-right-category' > <span>Tags:</span> Modern Latest </p>
        </div>
      
    </div>
  )
}

export default ProductDisplay
