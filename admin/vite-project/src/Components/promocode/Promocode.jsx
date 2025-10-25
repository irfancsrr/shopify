import React from 'react'
import './Promocode.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Promocode = () => {
    const [promocode,setPromocode]=useState('');
    const [offamount,setOffamount]=useState(0);
    const navigateTO=useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
      if(offamount && promocode.length){
        fetch("https://back-end-1gp5.onrender.com/addpromocode",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({promocode,offamount})
      }).then(data=>data.json()).then(response=>console.log(response));
      navigateTO('/')
      }
    }
  return (
    <div className='container'>
        <div className='main-content'> 
          <form   >
            <label htmlFor="promocode">PromoCode</label>
            <br />
            <input type="text" id='promocode' name='promocode' onChange={(e)=>setPromocode(e.target.value)} value={promocode} />
            <br />
            <label htmlFor="offamount">Offamount</label>
            <br />  
            <input type='number' id='offamount' name='offamount' onChange={(e)=>setOffamount(e.target.value)} value={offamount} />
            <br /><br /><button className='button-3' onClick={handlesubmit}>add promocode</button>
          </form>


        </div>
    </div>
  )
}

export default Promocode