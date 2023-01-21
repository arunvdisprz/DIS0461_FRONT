import React, { useState } from "react";
import simpllogo from "../pictures/simpllogo.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import Select from "react-select";

export default function LogoWithTabs() {
  const valueOne = useContext(Requiredvalue);
  const [dayDropDown, setDayDropDown] = useState(true);
  const [Mode, setMode] = useState("Day");
  const views = [
    { value: "Day", label: "Day" },
    { value: "Month", label: "Month" },
  ];

  //ChangeView function which is responsible for changing the view of the calendar when a different view is selected from the dropdown.
  //The function takes the selected view as a parameter and updates the Mode state variable,
  //And also updates the properties of the Requiredvalue context to show or hide different views of the calendar.
  const changeView = (value) => {
    setMode(value);
    valueOne.setContentBlockDate(false);
    valueOne.setContentBlockMonth(false);
    valueOne.setAppointmentValue(false);
    valueOne.setValueForPatch(false);
    valueOne.setAppointmentDate(new Date());
    {
      value == "Day" && valueOne.setContentBlockDate(true);
    }
    {
      value == "Month" && valueOne.setContentBlockMonth(true);
    }
  };

  // Multiple functions for handling tab clicks, such as logoClick, appointmntView, meetingView, and statissticsView.
  // These functions are used to change the state of the Requiredvalue context, and also change the view of the application based on the tab clicked.
  const logoClick = () => {
    valueOne.setAppointmentView(true);
    valueOne.setMeetingOverview(false);
    valueOne.setStatisticsview(false);
    setDayDropDown(true);
    changeView("Day");
  };

  const appointmntView = () => {
    valueOne.setAppointmentView(true);
    valueOne.setMeetingOverview(false);
    valueOne.setStatisticsview(false);
    setDayDropDown(true);
  };
  const meetingView = () => {
    valueOne.setMeetingOverview(true);
    valueOne.setAppointmentView(false);
    valueOne.setStatisticsview(false);
    setDayDropDown(false);
  };
  const statisticsView = () => {
    valueOne.setMeetingOverview(false);
    valueOne.setAppointmentView(false);
    valueOne.setStatisticsview(true);
    setDayDropDown(false);
  };

  return (
    // The component is responsible for displaying the logo of the application, the tabs for switching between different views of the calendar, and a dropdown for selecting the view of the calendar.
    <div
      className="logowithtab"
      aria-label="This is the logo and tab navigation section"
    >
      <div className="maincontent--appointmentlist--one">
        <div
          className="navigationblock--left"
          onClick={logoClick}
          aria-label="Click here to go back to the default view"
        >
          <img
            src={simpllogo}
            className="navigationblock--logo"
            aria-label="Simpl Calender logo"
          ></img>
          <span className="navigationblock--webname">Simpl Calender</span>
        </div>
        <div className="maincontent--appointmentlist--dateremin">
          {dayDropDown && (
            <div className="logowithtab--dropdown">
              <Select
                options={views}
                onChange={(e) => changeView(e.value)}
                value={{ value: Mode, label: Mode }}
                className="logowithtab--dropdown"
                aria-label="Select view dropdown"
              ></Select>
            </div>
          )}
          <div>
            <div
              onClick={appointmntView}
              className={`maincontent--right--meetingoverview  ${
                valueOne.appointmentView && "active"
              } `}
              aria-label="Appointment view tab"
            >
              Appointments
            </div>
          </div>
          <div
            onClick={meetingView}
            className={`maincontent--right--meetingoverview  logowithtab--meeting ${
              valueOne.meetingoverview && "active"
            } `}
            aria-label="Meeting overview tab"
          >
            Meeting overview
          </div>
          <div
            onClick={statisticsView}
            className={`maincontent--right--meetingoverview  logowithtab--meeting ${
              valueOne.statisticsview && "active"
            } `}
            aria-label="Statistics tab"
          >
            Statistics
          </div>
        </div>
      </div>
    </div>
  );
}
