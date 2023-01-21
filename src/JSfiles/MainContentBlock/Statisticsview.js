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

//The code imports several chart components such as ChartForYear, ChartForYearDuration,
//ChartForMonth, ChartForMonthDuration, ChartForWeek, and ChartFroWeekDuration
//which are used to display statistics of the appointments in different time periods.

export default function Statisticsview() {
  const value = useContext(Requiredvalue);
  return (
    <div>
      <div className="meetingoverview--right--calendertitle"></div>
      <div
        className="meetingoverview--right--calendertitle statistics----right--calendertitle"
        aria-label={`Weekly statistics for the date: ${Moment(
          value.appointmentDate
        ).format("DD MMM YYYY")}`}
      >
        {Moment(value.appointmentDate).format(" DD MMM YYYY ")},Weekly
        statistics
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
      <div
        className="meetingoverview--right--calendertitle statistics----right--calendertitle"
        aria-label={`Monthly statistics for the date: ${Moment(
          value.appointmentDate
        ).format("MMM YYYY")}`}
      >
        {Moment(value.appointmentDate).format("MMM YYYY ")}, Monthly statistics
      </div>
      <div className="statistics ">
        <div className="statistics--background">
          <ChartForMonth aria-label="Monthly statistics chart"></ChartForMonth>
        </div>
        <div className="statistics--background">
          <ChartForMonthDuration aria-label="Monthly duration statistics chart"></ChartForMonthDuration>
        </div>
      </div>
      <div
        className="meetingoverview--right--calendertitle statistics----right--calendertitle"
        aria-label={`Yearly statistics for the date: ${Moment(
          value.appointmentDate
        ).format("YYYY")}`}
      >
        {Moment(value.appointmentDate).format("YYYY ")},Yearly statistics
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
  );
}
