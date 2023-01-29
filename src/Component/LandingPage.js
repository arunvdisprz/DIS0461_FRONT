import React from "react";
import NavigationBlock from "./LandingPageJs/NavigationBlock.js";
import EasyScheduling from "./LandingPageJs/EasyScheduling.js";
import "../Styles/LandingPageScss/NavigationBlock.scss";
import "../Styles/LandingPageScss/EasyScheduling.scss";

export default function LandingPage() {
  return (
    <div>
      <NavigationBlock></NavigationBlock>
      <EasyScheduling></EasyScheduling>
    </div>
  );
}
