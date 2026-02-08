import React, { useEffect, useState } from "react";
import "./NewCollection.css";
// import New_collection from "../Assets/new_collection";
import Item from "../Item/Item";
// import { data } from "react-router-dom";

const NewCollection = () => {


  const [New_collection,setNew_collection] = useState(null)

  useEffect(()=>{

    fetch('https://back-end-1gp5.onrender.com/newcollectioned').then((response)=>response.json()).then((data)=>setNew_collection(data))

  },[])

  return (
    <div id="NewCollection" className="NewCollection-main-container">
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className="collections">
        {!New_collection||New_collection.length==0?
         <div className="Item-main-container">
          <div className="skeleton-wrapper">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img shimmer"></div>
                <div className="skeleton-text shimmer"></div>
                <div className="skeleton-text short shimmer"></div>
              </div>
            ))}
          </div>
         </div>
          
        :New_collection.map((item, i) => {
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

export default NewCollection;
