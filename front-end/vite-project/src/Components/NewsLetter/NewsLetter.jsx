import React, { useState } from 'react'
import "./NewsLetter.css"

const NewsLetter = () => {
      const [subscribe,setSubscribe]=useState("");
  return (
    <div className='NewsLetter-main-container' >
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stayed updated</p>
        <div>
            <input type="email"onChange={(e)=>setSubscribe(e.target.value)} value={subscribe} placeholder='Email id' />
            <button onClick={()=>setSubscribe("")}>Subscribe</button>
        </div>
      
    </div>
  )
}

export default NewsLetter
