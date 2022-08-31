import React from "react";
import "./pageNotFound.css";

const pageNotFound = () => {
  return (
    <div className="bodynotfound">
      <div className="containernotfound">
        <div className="content2">
          <h2>404</h2>
          <h4>0pps! Page not found</h4>
          <p>
            The page you were looking for doesn 't exist. You may have mistyped
            the address or the page may have moved.{" "}
          </p>
          <a href="/myarticles">Back To Home</a>
        </div>
      </div>
    </div>
  );
};

export default pageNotFound;
