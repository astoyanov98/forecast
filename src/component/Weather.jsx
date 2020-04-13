import React from "react";
import "./weather.css";

const Weather = ({ img, city, temperature, min, max }) => {
  return (
    <div className="container">
      <div className="cards">
        <h1>{city}</h1>
        <img src={img} alt="" />
        <h1>{temperature}&deg;</h1>
        <h2>
          min {min}&deg; | max {max}&deg;
        </h2>
      </div>
    </div>
  );
};

export default Weather;
