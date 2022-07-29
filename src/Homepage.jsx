import React from "react";
import "./css/Homepage.css";
import "./css/Homepage.css";
import homepagePng from "./images/homepage.png";

function Homepage() {
  return (
    <>
      <div className="welcome-banner">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5cfa5a1a2df47900015e2643/1616085648067-OQ5TUTY61TFOBZN6I6ZN/Home+Page+Banner-test.jpg?format=2500w"
          alt="lesson two"
          className="banner"
        />
        <div className="center-text">Stile</div>
      </div>
      <div className="homepage">
        <img src={homepagePng} alt={"homepage"} className="background-img" />
        <div className="welcome-text">
          <p id="welcome">Welcome to Mini Stile! </p>
          <br />
          <br />
          <div className="text">
            <p>The buggier but cooler,</p>
            <p>somewhat functional version of Stile</p>
            <br />
            <br />
            <br />
            <p>Made by Stile's best Employees</p>
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
