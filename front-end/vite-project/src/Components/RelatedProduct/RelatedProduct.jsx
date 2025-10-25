import React, { useContext } from "react";
import "./RelatedProduct.css";
import data_product from "../Assets/data";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const RelatedProduct = (props) => {
  const { allproduct } = useContext(ShopContext);
  return (
    <div className="RelatedProduct-main-container">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-item"  >
        {allproduct.map((item, i) => {
          if (props.category == item.category) {
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
          }
        })
        }
      </div>
    </div>
  );
};

export default RelatedProduct;
