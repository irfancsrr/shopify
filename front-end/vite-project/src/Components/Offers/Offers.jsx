import React from 'react'
import "./Offers.css"
import exclusive from '../Assets/exclusive.png'

const Offers = () => {
  return (
    <div className='Offers-main-container'>

        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for You</h1>
            <p>ONLY ON BEST SELLER PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive} alt="exclusive image" />
        </div>
      
    </div>
  )
}

export default Offers
