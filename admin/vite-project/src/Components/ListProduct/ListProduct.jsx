import React, { useEffect, useState } from 'react'
// import './listproduct.css'
import "./ListProduct.css";
import Item from '../items/item';

const ListProduct = () => {
 
  const [allproduct,setAllProducts] = useState([]);
    
  const fetchInfo = async() => {
    await fetch('https://back-end-1gp5.onrender.com/allproducts').then((res)=>res.json()).then((data)=>{setAllProducts(data)});

  }
  //
   useEffect(() =>{
      fetchInfo();
    },[])
// 
    const removeproduct = async(id)=>{
      await fetch('https://back-end-1gp5.onrender.com/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },body:JSON.stringify({id:id})
      })
      await fetchInfo();
    }

  return (
    <div className='listproduct' >
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
        <p>populer</p>

      </div>
      <div className="listproduct-allproduct">
        <hr/>
        {allproduct.map((product,index) =>{
          return <>    
           
          <Item product={product} Index={index}/>
          <hr/>
          </>

        })}
      </div>
      
    </div>
  )
}

export default ListProduct
