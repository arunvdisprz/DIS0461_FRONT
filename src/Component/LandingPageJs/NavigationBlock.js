import React from "react";
import simpllogo from "../Assets/simpllogo.png";

export default function NavigationBlock() {
  return (
    //The NavigationBlock function is a React component that renders a navigation block containing an image of a logo .
    //And a span element displaying the text "Simpl Calender".
    <div
      className="navigationblock"
      aria-label="Navigation block containing the Simpl Calender logo and web name"
    >
      <div className="navigationblock--left">
        {/* This is a required property that should be a string containing the url
        of the image to be displayed as logo. */}
        <img
          src={simpllogo}
          className="navigationblock--logo"
          alt="Simpl Calender logo"
          aria-label="Simpl Calender logo"
        ></img>
        <span
          className="navigationblock--webname"
          aria-label="Simpl Calender Web name"
        >
          Simpl Calender
        </span>
      </div>
    </div>
  );
}
