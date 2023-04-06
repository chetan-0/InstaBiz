import React, { Component } from "react";
import "../components/Home.css";
import logo from "../Images/0x0-removebg-preview.png";
import "../components/Home.css";

const TodoComponent = {
  width: "800px",
  margin: "30px auto",
  color: "black",
  minHeight: "200px",
  boxSizing: "border-box",
};
const Home = () => {
  return (
    <div className="home-container">
      <div className="content-heading">
        <div className="heading-div">
          <h1 className="product-heading">Welcome to Your BI$ Partner</h1>
          <p>You can buy and sell your products here.</p>
        </div>
      </div>
    </div>
  );
};
export default Home;
