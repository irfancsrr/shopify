import './item.css'

import remove_icon from "../../assets/remove_icon.png";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Item = ({product,Index}) => {
    

const removeproduct = async(id)=>{
      await fetch('https://back-end-1gp5.onrender.com/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },body:JSON.stringify({id:id})
      })
    
    window.location.replace('/listproduct')
      
    }

   
    const  handleAddPopular=(ID)=>{
      fetch("https://back-end-1gp5.onrender.com/addpopuler", {
            method: "POST",
            headers: {
              Accept: "application/form-Data",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: ID}),
          })
            .then((response) => response.json())
            .then((data) => {console.log(data)
              if(data.success)
    window.location.replace('/listproduct')

            });

  
    }
        const  handleRemovePopular=(ID)=>{
       fetch("https://back-end-1gp5.onrender.com/removepopuler", {
        method: "POST",
        headers: {
          Accept: "application/form-Data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: ID }),
      })
        .then((response) => response.json())
        .then((data) => {console.log(data)
          if(data.success)
    window.location.replace('/listproduct')

        });  
  
    }
    
  return (
    <div key={Index} className="listproduct-format-main listproduct-format" >
                <img src={product.image}  className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{removeproduct(product.id)}} className='listproduct-remove-icon' src={remove_icon} />
                <div style={{zIndex:"100",top:"10em",cursor:'pointer'}} >
                            {product.popular?<FaHeart className='setPopular'  color="red" size={24} onClick={()=>handleRemovePopular(product._id)} />:
                              <FaRegHeart className='setPopular' onClick={()=>handleAddPopular(product._id)} color="gray" size={24} />}       
                            
                
                            </div>
              </div> 
        
  )
}

export default Item