import React, { useState } from "react";
import ChartForYear from "../Statistics/ChartForYear";
import ChartForMonth from "../Statistics/ChartForMonth";
import ChartForWeek from "../Statistics/ChartForWeek";
import { useContext } from "react";
import InBuildCalender from "../CustomCalender/InBuildCalender";
import cancelicon from "../pictures/cancelicon.png";
import { Requiredvalue } from "../MainContent";
import Moment from "moment";
import "../Statistics/ChartForYear.scss";
import Select from "react-select";
import {options} from "../Datafile";
 
//The code imports several chart components such as ChartForYear, ChartForYearDuration,
//ChartForMonth, ChartForMonthDuration, ChartForWeek, and ChartFroWeekDuration
//which are used to display statistics of the appointments in different time periods.

export default function Statisticsview() {
  const value = useContext(Requiredvalue);

  const [statistisMode, setStatistisMode] = useState("Weekly");
  const [changeDate, setChangeDate] = useState(false);

  const views = [
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];

  const [Mode, setMode] = useState("Weekly");
  const changeView = (value) => {
    setMode(value);
    setChangeDate(false);
    setStatistisMode(value);
  };

  //This function renders a div containing a dropdown select component for switching between different views, a button for changing the date, and a custom date picker component (InBuildCalender) that appears when the "Change date" button is clicked.
  //The select component allows the user to change the view mode and updates the "Mode" variable. The "Change date" button toggles the visibility of the custom date picker component.
  //The custom date picker component allows the user to select a new date, and includes a confirm button to save the new date and a cancel button to close the date picker.
  const buttonGroup = () => {
    return (
      <div className="toggle--group">
        <div className="chartForYear--view">
          <Select
            options={views}
            onChange={(e) => changeView(e.value)}
            value={{ value: Mode, label: Mode }}
            className="chartForYear--view"
            aria-label="Select view dropdown"
          ></Select>
        </div>

        <button
          className={`toggle--btn
  ${statistisMode === "Yearl" && "autofocused"}`}
          id="toggle--btn-3"
          aria-label="Change date toggle button"
          onClick={(e) => {
            e.preventDefault();
            setChangeDate(!changeDate);
          }}
        >
          Change date
        </button>
        {changeDate && (
          <div className="chartForYear--inbulidcalender addappointment--content-month">
            <img
              src={cancelicon}
              className="chartForYear--inbulidcalender--cancelicon"
              aria-label="Cancel date selection button"
              onClick={(e) => {
                e.preventDefault();
                setChangeDate(false);
              }}
            ></img>
            <InBuildCalender
              setAppointmentDate={value.setAppointmentDate}
              appointmentDate={value.appointmentDate}
              aria-label="Custom calender component for selecting date of appointment"
            ></InBuildCalender>
          </div>
        )}
      </div>
    );
  };

  //This function renders a div containing weekly statistics, including a title displaying the selected date.
  //The div contains two other functional components, "ChartForWeek" and "ChartForWeekDuration", which display charts for weekly statistics and duration statistics respectively.
  //The function only renders the statistics if the "statisticsMode" variable is set to "Weekly".
  const statistisModeWeekly = () => {
    return (
      statistisMode === "Weekly" && (
        <div>
          {/* The Statisticsview component is a functional component that renders several charts to display 
      statistics of the appointments in different time periods such as weekly, monthly and yearly. */}
          <ChartForWeek aria-label="Weekly duration statistics chart"></ChartForWeek>
        </div>
      )
    );
  };
  //Component shows monthly statistics for the selected date
  //Displays a chart for the number of appointments and another for the duration of appointments
  //Includes date and title displaying the selected date and "Monthly statistics" respectively.
  const statistisModeMonthly = () => {
    return (
      statistisMode === "Monthly" && (
        <div>
          <ChartForMonth aria-label="Monthly statistics chart" ></ChartForMonth>
        </div>
      )
    );
  };

  //statistisModeYearly is a functional component that renders the yearly statistics mode of the app
  //It displays a bar chart and a line chart of the yearly statistics of the appointments
  //It uses the Moment.js library to format the date and the ChartForYear and ChartForYearDuration components to render the charts.
  const statistisModeYearly = () => {
    return (
      statistisMode === "Yearly" && (
        <div>
          <ChartForYear aria-label="Yearly duration statistics chart" ></ChartForYear>
        </div>
      )
    );
  };
  return (
    <div className="statisticsview">
      <div className="statistics--datechange">
        <div
          className="meetingoverview--right--calendertitle statistics----right--calendertitle"
          aria-label={`Weekly statistics for the date: ${Moment(
            value.appointmentDate
          ).format("DD MMM YYYY")}`}
        >
          <div>{Moment(value.appointmentDate).format("ddd, DD MMM YYYY ")}</div>
          <div className="statistics--weekly">Statistics</div>
        </div>
        <div>{buttonGroup()}</div>
      </div>
      {statistisModeWeekly()}
      {statistisModeMonthly()}
      {statistisModeYearly()}
    </div>
  );
}
