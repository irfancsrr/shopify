import React, { useEffect, useState } from 'react'
// import "./searchResult.css";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";

import { useParams } from 'react-router-dom';
import Searchbar from '../Components/searchbar/searchbar';

const SearchResult = () => {
    const {searchItem}=useParams();
    const [searchResult,setsearchResult]=useState(null);
    const [Spinner,setSpinner]=useState(<div className="loader" style={{margin:"6em auto"}}></div>);
    useEffect(()=>{
      if(searchItem){
        fetch(`https://back-end-1gp5.onrender.com/search?searchItem=${searchItem}`)
      .then(result=>result.json())
      .then(data=>setsearchResult(data)).catch(err=>console.log("error"));

      }
      setTimeout(() => {
        setSpinner(<h1>No result</h1>)
      }, 7000);
    },[searchItem]);
  return (
    <div className="searchResult">
     <Searchbar/>
      <div className="shopcategory-products">
        {(searchResult?.length)?searchResult?.map((item, i) => {
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
        }):<div style={{display:"block",textAlign:"center",width:"90vw",margin:"0 auto"}}>{Spinner}</div>}
      </div>
      
    </div>
  )
}

export default SearchResult

// import React from 'react'

// const SearchResult = () => {
//   const {searchItem}=useParams();
//   console.log(searchItem);
//   return (
//     <div className="searchResult">SearchResult</div>
//   )
// }

// export default SearchResult