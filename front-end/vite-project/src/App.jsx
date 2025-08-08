import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/men_banner.png"
import banner2 from "./Components/Assets/banner2.png"
import banner3 from "./Components/Assets/banner3.png"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />}></Route>

          <Route path="/mens" element={<ShopCategory  banner={men_banner} category="men" />}></Route>
          <Route path="/womens" element={<ShopCategory  banner ={banner2} category="women" />} ></Route>
          <Route path="/kids" element={<ShopCategory banner ={banner3}  category="kid" />}></Route>

          <Route path="/product" element={<Product />}>  
            <Route path=":productId" element={<Product />}></Route>
              </Route>  
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<LoginSignup />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
