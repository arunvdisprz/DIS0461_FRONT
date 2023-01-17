import React from 'react'
import ChartForYear from "../Statistics/ChartForYear";
import ChartForYearDuration from "../Statistics/ChartForYearDuration";
import ChartForMonth from "../Statistics/ChartForMonth";
import ChartForMonthDuration from "../Statistics/ChartForMonthDuration";
import ChartForWeek from "../Statistics/ChartForWeek";
import ChartForWeekDuration from "../Statistics/ChartFroWeekDuration";
function Statisticsview() {
  return (
    <div>
        <div className="meetingoverview--right--calendertitle"></div>
        <div className="meetingoverview--right--calendertitle statistics----right--calendertitle">
          Week
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
          Month
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
          Year
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
  )
}

export default Statisticsview