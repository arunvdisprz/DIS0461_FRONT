import React from "react";
import simpllogo from "../Assets/simpllogo.png";

export default function NavigationBlock() {
  return (
    //The NavigationBlock function is a React component that renders a navigation block containing an image of a logo .
    //And a span element displaying the text "Simpl Calendar".
    <div
      className="navigationblock"
      aria-label="Navigation block containing the Simpl Calendar logo and web name"
    >
      <div className="navigationblock--left">
        {/* This is a required property that should be a string containing the url
        of the image to be displayed as logo. */}
        <img
          src={simpllogo}
          className="navigationblock--logo"
          alt="Simpl Calendar logo"
          aria-label="Simpl Calendar logo"
        ></img>
        <span
          className="navigationblock--webname"
          aria-label="Simpl Calendar Web name"
        >
          Simpl Calendar
        </span>
      </div>
    </div>
  );
}
