import React, { useState } from "react";
import { Link } from "react-router-dom";
import simpllogo from "../pictures/simpllogo.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function LogoWithTabs() {
  const value = useContext(Requiredvalue);
  const [dayDropDown, setDayDropDown] = useState(true);
  return (
    <div className="calenderbar--appointmentlist--one">
      <div className="navigationblock--left">
        <img src={simpllogo} className="navigationblock--logo"></img>
        <span className="navigationblock--webname">Simpl Calender</span>
      </div>
      <div className="calenderbar--appointmentlist--dateremin">
        {dayDropDown && (
          <div className="logowithtab--dropdown">
            <button
              onClick={(e) => {
                value.setContentBlockDate(true);
                value.setContentBlockMonth(false);
                value.setContentBlockWeek(false);
                value.setAppointmentValue(false);
                value.setValueForPatch(false);
                value.setAppointmentDate(new Date())
              }}
            >
              day
            </button>
            <button
              onClick={(e) => {
                value.setContentBlockDate(false);
                value.setContentBlockMonth(false);
                value.setContentBlockWeek(true);
                value.setAppointmentValue(false);
                value.setValueForPatch(false);
                value.setAppointmentDate(new Date())
              }}
            >
              week
            </button>
            <button
              onClick={(e) => {
                value.setContentBlockDate(false);
                value.setContentBlockMonth(true);
                value.setContentBlockWeek(false);
                value.setAppointmentValue(false);
                value.setValueForPatch(false);
                value.setAppointmentDate(new Date())
              }}
            >
              month
            </button>
          </div>
        )}
        <div>
          <div
            onClick={(e) => {
              value.setAppointmentView(true);
              value.setMeetingOverview(false);
              setDayDropDown(true);
            }}
            className={`calenderbar--right--meetingoverview ${
              value.appointmentView && "active"
            } `} //!
          >
            Appointments
          </div>
        </div>
        <div
          onClick={(e) => {
            value.setMeetingOverview(true);
            value.setAppointmentView(false);
            setDayDropDown(false);
          }}
          className={`calenderbar--right--meetingoverview ${
            value.Meetingoverview && "active"
          } `}
        >
          Meeting overview
        </div>
      </div>
    </div>
  );
}
