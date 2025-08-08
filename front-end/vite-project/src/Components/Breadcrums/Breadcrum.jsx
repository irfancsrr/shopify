import React from 'react'
import "./Breadcrum.css"
import arroww_icon from "../Assets/arroww_icon.png";

const Breadcrum = (props) => {

    const {product} = props;

  return (
    <div className='breadcrum-main-container' >
        HOME <img src={arroww_icon}  /> SHOP <img src={arroww_icon}  /> {product.category} <img src={arroww_icon}  /> {product.name}
      
    </div>
  )
}

export default Breadcrum
