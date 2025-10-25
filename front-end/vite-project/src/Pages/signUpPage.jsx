import React from "react";
import "./CSS/LoginSignup.css";
import {SignUp} from '@clerk/clerk-react'

const SignUpPage = () => {
  

  return (
    <div className="container" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      
      <SignUp
  path="/sign-up"
  routing="path"
  signInUrl="/sign-in" // 
/>

    </div>
   );
};

export default SignUpPage;
