import React from "react";
import InBuildCalender from "../CustomCalender/InBuildCalender";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import ClosestDate from "./ClosestDate";
import noresult from "../pictures/noresult.jpg";
import Moment from "moment";
export default function CreateBlock() {
  const value = useContext(Requiredvalue);
  var plusonehour = new Date();
  plusonehour.setHours(plusonehour.getHours() + 1);
  var upcomingAppointment = 0;

  //the number of upcoming appointments by filtering the allAppointment array from the context and
  //Counting the number of appointments that have a start time greater than the current time.
  value.allAppointment
    .filter(
      (person) =>
        person.appointmentStartTime >
        Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
    )
    .map(() => upcomingAppointment++);

  //"createNewAppointment" which sets the start and end time to the current time and an hour later respectively,
  //And sets the value of the appointment to true and the value for patch to false.
  const createNewAppointment = () => {
    value.setStartTimeValue(Moment(new Date()).format("HH:00"));
    value.setEndTimeValue(Moment(plusonehour).format("HH:00"));
    value.setAppointmentValue(!value.appointmentValue);
    value.setValueForPatch(false);
  };

  return (
    <div
      className="createblock"
      aria-label="This is a block for creating new appointments"
    >
      <div
        className="createblock--plusbartext"
        onClick={createNewAppointment}
        aria-label="Click here to create a new appointment"
      >
        <span>+</span>
        Create
      </div>
      {/* Is used to select the date of the appointment */}
      <InBuildCalender
        setAppointmentDate={value.setAppointmentDate}
        appointmentDate={value.appointmentDate}
        aria-label="Custom calender component for selecting date of appointment"
      ></InBuildCalender>
      <div
        className="createblock--upcoming"
        aria-label="Upcoming event section"
      >
        <div
          className="createblock--upcoming--title"
          aria-label="Upcoming events title"
        >
          Upcoming event{" "}
          <div
            className="createblock--upcoming--number"
            aria-label="Number of upcoming events"
          >
            {upcomingAppointment}
          </div>
        </div>
        {upcomingAppointment == 0 && (
          <img
            src={noresult}
            className="createblock--upcoming--image"
            aria-label="No upcoming events image"
          ></img>
        )}
        <div className="createblock--upcoming--contentblock">
          {/* Is used to display the closest upcoming event */}
          <ClosestDate aria-label="Component for displaying the closest upcoming event"></ClosestDate>
        </div>
      </div>
    </div>
  );
}
