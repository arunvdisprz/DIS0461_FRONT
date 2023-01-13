import React from "react";
import Inbuildcalender from "../CustomCalender/InBuildCalender";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import ClosestDate from "./ClosestDate";
import addicon from "../pictures/addicon.png";
import Moment from "moment";
export default function CreateBlock() {
  const value = useContext(Requiredvalue);
  var plusonehour = new Date();
  plusonehour.setHours(plusonehour.getHours() + 1);

  return (
    <div className="createblock">
      <div
        className="createblock--plusbartext"
        onClick={() => {
          value.setStartTimeValue(Moment(new Date()).format("HH:00"));
          value.setEndTimeValue(Moment(plusonehour).format("HH:00"));
          value.setAppointmentValue(!value.appointmentValue);
          value.setValueForPatch(false);
        }}
      >
        <span>+</span>
        Create
      </div>
      <Inbuildcalender
        setAppointmentDate={value.setAppointmentDate}
        appointmentDate={value.appointmentDate}
      ></Inbuildcalender>
      <div className="createblock--upcoming">
        <div className="createblock--upcoming--title">Upcoming event</div>
        <div className="createblock--upcoming--contentblock">
          <ClosestDate></ClosestDate>
        </div>
      </div>
    </div>
  );
}


