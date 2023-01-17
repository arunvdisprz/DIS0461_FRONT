import React, { useState } from "react";
import simpllogo from "../pictures/simpllogo.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import Select from "react-select";

export default function LogoWithTabs() {
  const valueOne = useContext(Requiredvalue);
  const [dayDropDown, setDayDropDown] = useState(true);
  const views = [
    { value: "Day", label: "Day" },
    { value: "Week", label: "Week" },
    { value: "Month", label: "Month" },
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
    <div className="logowithtab">
      <div className="maincontent--appointmentlist--one">
        <div className="navigationblock--left">
          <img src={simpllogo} className="navigationblock--logo"></img>
          <span className="navigationblock--webname">Simpl Calender</span>
        </div>
        <div className="maincontent--appointmentlist--dateremin">
          {dayDropDown && (
            <div className="logowithtab--dropdown">
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
          <div>
            <div
              onClick={(e) => {
                valueOne.setAppointmentView(true);
                valueOne.setMeetingOverview(false);
                setDayDropDown(true);
              }}
              className={`maincontent--right--meetingoverview  ${
                valueOne.appointmentView && "active"
              } `} //
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
    </div>
  );
}
