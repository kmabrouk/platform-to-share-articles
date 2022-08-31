import React from "react";
import { useSelector } from "react-redux";

import { Button } from "./Button";
import "./HeroSection.css";
// import video from "./video-2.mp4";

function HeroSection() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className="hero-container">
      <h1>Stay curious</h1>
      <p>
        Become a WOK member to enjoy unlimited access and directly support the
        writers you read most.
      </p>
      {!userInfo && (
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            Get unlimted access
          </Button>
        </div>
      )}
    </div>
  );
}

export default HeroSection;
