import React from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { useState } from "react";
import { useEffect } from "react";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState(null);

  useEffect(() => {
    fetch("https://back-end-1gp5.onrender.com/popularinmen").then((response) =>
      response.json().then((data) => setPopularProducts(data))
    );
  }, []);

  return (
    <div className="Popular-main-container">
      <h1>POPULAR IN MENS</h1>
      <hr />

      <div className="popular-item">
        {popularProducts?
        popularProducts.map((item, i) => {
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

export default Popular;
