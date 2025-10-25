import React from "react";
import {SignUp,SignIn, SignedIn} from '@clerk/clerk-react'

import Navbar from "./Components/Navbar/Navbar";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import SignUpPage from "./Pages/signUpPage";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/men_banner.png"
import banner2 from "./Components/Assets/banner2.png"
import banner3 from "./Components/Assets/banner3.png"
import LikedItemPage from "./Pages/likedItemPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/likedItems" element={<LikedItemPage/>}></Route>
          <Route path="/allproducts" element={<ShopCategory  banner={men_banner} category="all" />}></Route>
          <Route path="/mens" element={<ShopCategory  banner={men_banner} category="men" />}></Route>
          <Route path="/womens" element={<ShopCategory  banner ={banner2} category="women" />} ></Route>
          <Route path="/kids" element={<ShopCategory banner ={banner3}  category="kid" />}></Route>

          <Route path="/product" element={<Product />}>  
            <Route path=":productId" element={<Product />}></Route>
              </Route> 
          <Route path="/cart" element={<SignedIn><Cart /></SignedIn>}></Route>
          {/* <Route
  path="/sign-up"
  element={
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in" // 
    />
  }
/> */}

<Route
  path="/sign-in/*"
  element={<div  style={{display:"flex",justifyContent:"center",alignItems:"center"}}><SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up" // 
    /></div>}
/>
          
          <Route path="/sign-up/*" element={<SignUpPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
