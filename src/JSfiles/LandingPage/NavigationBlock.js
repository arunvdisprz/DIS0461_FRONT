import React from "react";
import { Link } from "react-router-dom";
import simpllogo from "../pictures/simpllogo.png";
import arrow_right_alticon from "../pictures/arrow_right_alticon.png";

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
