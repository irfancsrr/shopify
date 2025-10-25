import React from "react";
import "./DescriptionBox.css";

const   DescriptionBox = () => {
  return (
    <div className="descriptionbox-main-container">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews(122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website is an online platform that facilitate buying and
          selling of products or services over the internet serves as a virtual
          marketplace where businesses and individual showcase their products,
          interact with customers , and conduct transactions without the need
          for a physicial presence. E-Commerce have gained immense popularity
          due to their conveince accesbility, and the global reach they offer.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
