import React from "react";
import ChartForYear from "../Statistics/ChartForYear";
import ChartForYearDuration from "../Statistics/ChartForYearDuration";
import ChartForMonth from "../Statistics/ChartForMonth";
import ChartForMonthDuration from "../Statistics/ChartForMonthDuration";
import ChartForWeek from "../Statistics/ChartForWeek";
import ChartForWeekDuration from "../Statistics/ChartFroWeekDuration";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import Moment from "moment";
function Statisticsview() {
  const value = useContext(Requiredvalue);
  return (
    <div>
      <div className="meetingoverview--right--calendertitle"></div>
      <div className="meetingoverview--right--calendertitle statistics----right--calendertitle">
        {Moment(value.appointmentDate).format("  DD MMM YYYY  ")},Weekly
        statistics
      </div>
      <div className="statistics ">
        <div className="statistics--background">
          <ChartForWeek></ChartForWeek>
        </div>
        <div className="statistics--background">
          <ChartForWeekDuration></ChartForWeekDuration>
        </div>
      </div>
      <div className="meetingoverview--right--calendertitle statistics----right--calendertitle">
        {Moment(value.appointmentDate).format("MMM YYYY  ")}, Monthly statistics
      </div>
      <div className="statistics ">
        <div className="statistics--background">
          <ChartForMonth></ChartForMonth>
        </div>
        <div className="statistics--background">
          <ChartForMonthDuration></ChartForMonthDuration>{" "}
        </div>
      </div>
      <div className="meetingoverview--right--calendertitle statistics----right--calendertitle">
        {Moment(value.appointmentDate).format("YYYY  ")},Yearly statistics
      </div>
      <div className="statistics ">
        <div className="statistics--background">
          <ChartForYear></ChartForYear>{" "}
        </div>
        <div className="statistics--background">
          <ChartForYearDuration></ChartForYearDuration>{" "}
        </div>
      </div>
    </div>
  );
}

export default Statisticsview;
