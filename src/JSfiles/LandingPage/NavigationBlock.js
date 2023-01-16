import React from "react";
import simpllogo from "../pictures/simpllogo.png";

export default function NavigationBlock() {
  return (
    <div className="navigationblock">
      <div className="navigationblock--left">
        <img src={simpllogo} className="navigationblock--logo"></img>
        <span className="navigationblock--webname">Simpl Calender</span>
      </div>
    </div>
  );
}
