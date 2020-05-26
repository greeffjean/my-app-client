import React from "react";
import "./Home.css";
import welcome from "./welcome-image.jpg";

export default function Home() {

  return (
    <div className="Home">
      <div className="lander">
        <h1>My App</h1>
        <p>You now have access to My App!</p>
        <img src={welcome} alt="welcome" />
      </div>
    </div>
  );
}