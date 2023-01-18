import React from "react";
import InBuildCalender from "../CustomCalender/InBuildCalender";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import ClosestDate from "./ClosestDate";
import addicon from "../pictures/addicon.png";
import noresult from "../pictures/noresult.jpg";
import Moment from "moment";
export default function CreateBlock() {
  const value = useContext(Requiredvalue);
  var plusonehour = new Date();
  plusonehour.setHours(plusonehour.getHours() + 1);

  var upcomingAppointment = 0;
  value.allAppointment
    .filter(
      (person) =>
        person.appointmentStartTime >
        Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
    )
    .map(() => upcomingAppointment++);

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
      <InBuildCalender
        setAppointmentDate={value.setAppointmentDate}
        appointmentDate={value.appointmentDate}
      ></InBuildCalender>
      <div className="createblock--upcoming">
        <div className="createblock--upcoming--title">
          Upcoming event <div className="createblock--upcoming--number">{upcomingAppointment}</div>
        </div>
        {upcomingAppointment == 0 && (
          <img src={noresult} className="createblock--upcoming--image"></img>
        )}
        <div className="createblock--upcoming--contentblock">
          <ClosestDate></ClosestDate>
        </div>
      </div>
    </div>
  );
}
