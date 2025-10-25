import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product from "../../assets/add_product.png";
import list_product from "../../assets/list_product.png";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product} />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product}/>
          <p>Product List</p>
        </div>
      </Link>

      <Link to={"/promocode"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          {/* <img src={list_product}/> */}
          <p>Add PromoCode</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
