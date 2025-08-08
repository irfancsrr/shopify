import React from 'react'
import "./NewsLetter.css"

const NewsLetter = () => {
  return (
    <div className='NewsLetter-main-container' >
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stayed updated</p>
        <div>
            <input type="email" placeholder='Email id' />
            <button>Subscribe</button>
        </div>
      
    </div>
  )
}

export default NewsLetter
