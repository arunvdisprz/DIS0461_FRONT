import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import simpllogo from "../pictures/simpllogo.png";

import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function LogoWithTabs() {
  const value = useContext(Requiredvalue);
  return (
    <div className="calenderbar--appointmentlist--one">
      <div className="navigationblock--left">
        <img src={simpllogo} className="navigationblock--logo"></img>
        <span className="navigationblock--webname">Simpl Calender</span>
      </div>
    </div>
  );
}
