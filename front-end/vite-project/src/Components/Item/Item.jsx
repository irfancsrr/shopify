import React from "react";
import "./Item.css";
import { Link, useNavigate } from "react-router-dom";

const Item = (props) => {
  const navigateTO=useNavigate();
  return (
    <div className="Item-main-container">
      {/* <Link to={`/product/${props.id}`}> */}
        <img
          onClick={()=>{window.scrollTo(0, 0);
            navigateTO(`/product/${props.id}`);
          }}
          className="img"
          src={props.image}
          alt="images"
        />
      {/* </Link> */}
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new"> ${props.new_price}</div>
        <div className="item_price-old"> ${props.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
