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
        {New_collection?New_collection.map((item, i) => {
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

export default NewCollection;
