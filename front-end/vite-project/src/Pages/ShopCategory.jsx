import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import dropdown from "../Components/Assets/dropdown.png";
import { useNavigate } from "react-router-dom";

const ShopCategory = (props) => {
  const { allproduct } = useContext(ShopContext);
  const navigateTo=useNavigate();
  return (
    (allproduct?
      <div className="shopcategory">
     {props.category=='all'?<></>:<img className="shopcategory-banner" src={props.banner} alt="banners" />} 
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> Out of 36 products
        </p>

        <div className="shopcategory-sort">
          Sort by <img src={dropdown} alt="Dropdown-icon" />
        </div>
      </div>

      <div className="shopcategory-products">
        {allproduct.map((item, i) => {
          if (props.category === item.category) {
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
          }else if(props.category=='all'){
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            )
          }
           else {
            return null;
          }
        })}
      </div>
      {props.category=="all"?<></>:
      <div className="shopcategory-loadmore"onClick={()=>{navigateTo('/allproducts')}} style={{cursor:"pointer",textDecoration:"none"}} >Explore More</div>
      }
    </div>:
    <div className="loader" style={{margin:"6em auto"}}></div>
    )
  );
};

export default ShopCategory;
