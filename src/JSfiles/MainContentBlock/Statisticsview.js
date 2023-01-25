import React, { useState } from "react";
import ChartForYear from "../Statistics/ChartForYear";
import ChartForYearDuration from "../Statistics/ChartForYearDuration";
import ChartForMonth from "../Statistics/ChartForMonth";
import ChartForMonthDuration from "../Statistics/ChartForMonthDuration";
import ChartForWeek from "../Statistics/ChartForWeek";
import ChartForWeekDuration from "../Statistics/ChartFroWeekDuration";
import { useContext } from "react";
import InBuildCalender from "../CustomCalender/InBuildCalender";
import cancelicon from "../pictures/cancelicon.png";
import { Requiredvalue } from "../MainContent";
import Moment from "moment";
import "../Statistics/ChartForYear.scss";
import Select from "react-select";

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
    {
      value === "Weekly" && setStatistisMode("Weekly");
    }
    {
      value === "Monthly" && setStatistisMode("Monthly");
    }
    {
      value === "Yearly" && setStatistisMode("Yearly");
    }
  };

  const buttonGroup = () => {
    return (
      <div className="toggle-group">
        <Select
          options={views}
          onChange={(e) => changeView(e.value)}
          value={{ value: Mode, label: Mode }}
          
          aria-label="Select view dropdown"
        ></Select>

        <button
          className={`toggle-btn
  ${statistisMode === "Yearl" && "autofocused"}`}
          id="toggle-btn-3"
          aria-label="Change date toggle button"
          onClick={(e) => {
            e.preventDefault();
            setChangeDate(!changeDate);
          }}
        >
          Change date
        </button>
        {changeDate && (
          <div className="ChartForYear--inbulidcalender">
            <img
              src={cancelicon}
              className="ChartForYear--inbulidcalender--cancelicon"
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
            <button
              className="maincontent--right--appsave ChartForYear--inbulidcalender--button"
              aria-label="Confirm date selection button"
              onClick={(e) => {
                e.preventDefault();
                setChangeDate(false);
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    );
  };
  const statistisModeWeekly = () => {
    return (
      statistisMode === "Weekly" && (
        <div>
          <div
            className="meetingoverview--right--calendertitle statistics----right--calendertitle"
            aria-label={`Weekly statistics for the date: ${Moment(
              value.appointmentDate
            ).format("DD MMM YYYY")}`}
          >
            <div>
              {Moment(value.appointmentDate).format("ddd, DD MMM YYYY ")}
            </div>
            <div className="statistics--weekly">Weekly statistics</div>
          </div>
          {/* The Statisticsview component is a functional component that renders several charts to display 
      statistics of the appointments in different time periods such as weekly, monthly and yearly. */}
          <div className="statistics ">
            <div className="statistics--background">
              <ChartForWeek aria-label="Weekly statistics chart"></ChartForWeek>
            </div>
            <div className="statistics--background">
              <ChartForWeekDuration aria-label="Weekly duration statistics chart"></ChartForWeekDuration>
            </div>
          </div>
        </div>
      )
    );
  };
  const statistisModeMonthly = () => {
    return (
      statistisMode === "Monthly" && (
        <div>
          <div
            className="meetingoverview--right--calendertitle statistics----right--calendertitle"
            aria-label={`Monthly statistics for the date: ${Moment(
              value.appointmentDate
            ).format("MMM YYYY")}`}
          >
            <div>
              {Moment(value.appointmentDate).format("ddd, DD MMM YYYY ")}
            </div>
            <div className="statistics--weekly">Monthly statistics</div>
          </div>
          <div className="statistics ">
            <div className="statistics--background">
              <ChartForMonth aria-label="Monthly statistics chart"></ChartForMonth>
            </div>
            <div className="statistics--background">
              <ChartForMonthDuration aria-label="Monthly duration statistics chart"></ChartForMonthDuration>
            </div>
          </div>
        </div>
      )
    );
  };
  const statistisModeYearly = () => {
    return (
      statistisMode === "Yearly" && (
        <div>
          <div
            className="meetingoverview--right--calendertitle statistics----right--calendertitle"
            aria-label={`Yearly statistics for the date: ${Moment(
              value.appointmentDate
            ).format("YYYY")}`}
          >
            <div>
              {Moment(value.appointmentDate).format("ddd, DD MMM YYYY ")}
            </div>
            <div className="statistics--weekly">Yearly statistics</div>
          </div>
          <div className="statistics ">
            <div className="statistics--background">
              <ChartForYear aria-label="Yearly statistics chart"></ChartForYear>
            </div>
            <div className="statistics--background">
              <ChartForYearDuration aria-label="Yearly duration statistics chart"></ChartForYearDuration>
            </div>
          </div>
        </div>
      )
    );
  };
  return (
    <div className="statisticsview">
      {buttonGroup()}
      {statistisModeWeekly()}
      {statistisModeMonthly()}
      {statistisModeYearly()}
    </div>
  );
}
