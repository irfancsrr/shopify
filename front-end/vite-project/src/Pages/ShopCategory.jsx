import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import dropdown from "../Components/Assets/dropdown.png";

const ShopCategory = (props) => {
  const { allproduct } = useContext(ShopContext);

  return (
    <div className="shopcategory">
      <img className="shopcategory-banner" src={props.banner} alt="banners" />
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
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore" >Explore More</div>
    </div>
  );
};

export default ShopCategory;
