import React, { useState } from "react";
import { Link } from "react-router-dom";
import simpllogo from "../pictures/simpllogo.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import convertTime from "convert-time";
import Select from "react-select";

export default function LogoWithTabs() {
  const valueOne = useContext(Requiredvalue);
  const [dayDropDown, setDayDropDown] = useState(true);
  const views = [
    { value: "Day", label: "Day   " },
    { value: "Week", label: "Week  " },
    { value: "Month", label: "Month " },
  ];
  const changeView = (value) => {

    valueOne.setContentBlockDate(false);
    valueOne.setContentBlockMonth(false);
    valueOne.setContentBlockWeek(false);
    valueOne.setAppointmentValue(false);
    valueOne.setValueForPatch(false);
    valueOne.setAppointmentDate(new Date());
    {
      value == "Day" && valueOne.setContentBlockDate(true);
    }
    {
      value == "Week" && valueOne.setContentBlockWeek(true);
    }
    {
      value == "Month" && valueOne.setContentBlockMonth(true);
    }
  };
  return (
    <div className="maincontent--appointmentlist--one">
      <div className="navigationblock--left">
        <img src={simpllogo} className="navigationblock--logo"></img>
        <span className="navigationblock--webname">Simpl Calender</span>
      </div>
      <div className="maincontent--appointmentlist--dateremin">
        {dayDropDown && (
          <div className="logowithtab--dropdown">
            {/* <select onChange={(e) => changeView(e.value)}>
              <option value="Day">Day</option>
              <option value="Week">Week</option>
              <option value="Month">Year</option>
            </select> */}
            <Select
              options={views}
              isOptionSelected={views[0].value}
              selected={views[0].value}
              placeholder="Day"
              onChange={(e) => changeView(e.value)}
              className="logowithtab--dropdown"
            ></Select>
          </div>
        )}
        {/* {dayDropDown && (
          <Select
            options={views}
            onChange={(e) => changeView(e.value)}
            className="logowithtab--dropdown"
          ></Select>
          // <div className="logowithtab--dropdown">
          //   <button
          //     onClick={(e) => {
          //       value.setContentBlockDate(true);
          //       value.setContentBlockMonth(false);
          //       value.setContentBlockWeek(false);
          //       value.setAppointmentValue(false);
          //       value.setValueForPatch(false);
          //       value.setAppointmentDate(new Date());
          //     }}
          //   >
          //     day
          //   </button>
          //   <button
          //     onClick={(e) => {
          //       value.setContentBlockDate(false);
          //       value.setContentBlockMonth(false);
          //       value.setContentBlockWeek(true);
          //       value.setAppointmentValue(false);
          //       value.setValueForPatch(false);
          //       value.setAppointmentDate(new Date());
          //     }}
          //   >
          //     week
          //   </button>
          //   <button
          //     onClick={(e) => {
          //       value.setContentBlockDate(false);
          //       value.setContentBlockMonth(true);
          //       value.setContentBlockWeek(false);
          //       value.setAppointmentValue(false);
          //       value.setValueForPatch(false);
          //       value.setAppointmentDate(new Date());
          //     }}
          //   >
          //     month
          //   </button>
          // </div>
        )} */}
        <div>
          <div
            onClick={(e) => {
              valueOne.setAppointmentView(true);
              valueOne.setMeetingOverview(false);
              setDayDropDown(true);
            }}
            className={`maincontent--right--meetingoverview  ${
              valueOne.appointmentView && "active"
            } `} //!
          >
            Appointments
          </div>
        </div>
        <div
          onClick={(e) => {
            valueOne.setMeetingOverview(true);
            valueOne.setAppointmentView(false);
            setDayDropDown(false);
          }}
          className={`maincontent--right--meetingoverview  logowithtab--meeting ${
            valueOne.Meetingoverview && "active"
          } `}
        >
          Meeting overview
        </div>
      </div>
    </div>
  );
}
