import React, { useState } from 'react'
import './searchbar.css'
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const NavigateTo=useNavigate();
  const [searchItem,setSearchItem]=useState(null);
  const handleClick=()=>{
    // window.location.href=`/searchResult/${searchItem}`;
   NavigateTo(`/searchResult/${searchItem}`);
  }
  return (
    <div className='searchBar'>
      <div>
        <input type='text' placeholder='search products'onChange={(e)=>setSearchItem(e.target.value)} value={searchItem}/>
        <label htmlFor="searchbar" className='searchLabel'
        onClick={handleClick}
        ><i className='bx bx-search-alt-2'></i></label>
      </div>
    </div>
  )
}

export default Searchbar