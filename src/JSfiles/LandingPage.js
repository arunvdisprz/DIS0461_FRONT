import React from "react";
import NavigationBlock from "./LandingPage/NavigationBlock.js";
import EasyScheduling from "./LandingPage/EasyScheduling.js";
import "./LandingPage/NavigationBlock.scss";
import "./LandingPage/EasyScheduling.scss";

export default function LandingPpage() {
  return (
    <div>
      <NavigationBlock></NavigationBlock>
      <EasyScheduling></EasyScheduling>
    </div>
  );
}
