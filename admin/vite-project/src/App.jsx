import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { SignedIn, SignedOut, SignUp, useUser } from '@clerk/clerk-react'
import { Route } from 'react-router-dom'

const App = () => {
  const {user}=useUser();
  return (
    <div>
      <SignedOut>
        <div style={{display:'flex',justifyContent:'center'}}>

        <SignUp />
        </div>
      </SignedOut>
      <SignedIn>
        {(user?.emailAddresses[0]?.emailAddress=='irfancsrrsimt@gmail.com')?<>
          <Navbar/>
          <Admin/>

        </>:<><Navbar/><div style={{display:'flex',justifyContent:'center',alignContent:'center'}}><h2>You are not Admin</h2></div></>}

      </SignedIn>
      
    </div>
  )
}

export default App
