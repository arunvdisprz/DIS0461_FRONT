import React from "react";
import "../CustomCalender/InBuildCalender.scss";
import doublearrowleft from "../pictures/doublearrowleft.png";
import arrowleft from "../pictures/arrowleft.png";
import doublearrowright from "../pictures/doublearrowright.png";
import arrowright from "../pictures/arrowright.png";
import { useState } from "react";
import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import Moment from "moment";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

function ContentBlockMonth() {
  const valueOne = useContext(Requiredvalue);
  const [currentDate, setCurrentDate] = useState(new Date()); //!this current date
  const value = currentDate;

  //date "March 15, 2021", startOfMonth() might return a new Date object representing "March 1, 2021".
  const startDate = startOfMonth(value);
  //date "March 15, 2021", endOfMonth() might return a new Date object representing "March 31, 2021".
  const endDate = endOfMonth(value);
  // date "March 15, 2021" and startDate is a Date object representing the date "March 1, 2021", differenceInDays() might return the number 14.
  const numDays = differenceInDays(endDate, startDate) + 1;

  //here you get value with 0-6 if 0 means sun and 6 mean sat that it
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => {
    setCurrentDate(sub(value, { months: +1 }));
  };
  const nextMonth = () => {
    setCurrentDate(add(value, { months: +1 }));
  };
  const prevYear = () => {
    setCurrentDate(sub(value, { years: 1 }));
  };
  const nextYear = () => {
    setCurrentDate(add(value, { years: 1 }));
  };

  const handleClickDate = (index) => {
    //Date object representing the date "March 15, 2021" and index is the number 10, setDate() might return a new Date object representing "March 10, 2021".
    const date = setDate(value, index);
    setCurrentDate(date);
  };

  const handleSetToday = () => {
    valueOne.setAppointmentDate(new Date());
    setCurrentDate(new Date()); //!it will update here
  };

  const setValues = (index) => {
    handleClickDate(index + 1);
    valueOne.setAppointmentValue(true);
    valueOne.setValueForPatch(false);
    valueOne.setAppointmentDate(
      Moment(currentDate).format("yyyy-MM-") +
        (index + 1 < 10 ? "0" + (index + 1) : index + 1) +
        Moment(currentDate).format("THH:mm:ss")
    );
    valueOne.setStartTimeValue("10:00");
    valueOne.setEndTimeValue("11:00");
    valueOne.setAppointmentValue(true);
  };
  
  const patchValues = (
    index,
    e,
    id,
    appointmentStartTime,
    appointmentEndTime,
    name,
    appointmentContent
  ) => {
    e.stopPropagation();
    valueOne.setPatchId(id);
    valueOne.setAppointmentDate(
      Moment(currentDate).format("yyyy-MM-") +
        (index + 1 < 10 ? "0" + (index + 1) : index + 1) +
        Moment(currentDate).format("THH:mm:ss")
    );
    valueOne.setPatchStartTime(Moment(appointmentStartTime).format("HH:mm"));
    valueOne.setPatchEndTime(Moment(appointmentEndTime).format("HH:mm"));
    valueOne.setPatchName(name);
    valueOne.setPatchContent(appointmentContent);
    valueOne.setValueForPatch(!valueOne.valueForPatch);
    valueOne.setAppointmentValue(false);
    valueOne.setvalueForPatchEdit(false);
  };
  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <div className="contentblockmonth--currentmonth--calender">
      <div className="contentblockmonth--currentmonth--div">
        <button
          onClick={handleSetToday}
          className="contentblockmonth--currentmonth--button  "
        >
          Current Month
        </button>
      </div>
      <div className="inbulidcalender--grid">
        <button
          onClick={() => prevYear()}
          className="inbulidcalender--grid--button"
        >
          <img
            src={doublearrowleft}
            className="maincontent--right--cancelicon"
          ></img>
        </button>
        <button
          onClick={() => prevMonth()}
          className="inbulidcalender--grid--button"
        >
          <img src={arrowleft} className="maincontent--right--cancelicon"></img>
        </button>
        <button className="inbulidcalender--grid--span3 inbulidcalender--grid--emptybutton inbulidcalender--grid--weeksymbol">
          {format(currentDate, "MMM  yyyy")}
        </button>

        <button
          onClick={() => nextMonth()}
          className="inbulidcalender--grid--button"
        >
          <img
            src={arrowright}
            className="maincontent--right--cancelicon"
          ></img>
        </button>
        <button
          onClick={() => nextYear()}
          className="inbulidcalender--grid--button"
        >
          <img
            src={doublearrowright}
            className="maincontent--right--cancelicon"
          ></img>
        </button>
        {weeks.map((week, index) => (
          <button
            key={index}
            className="inbulidcalender--grid--emptybutton inbulidcalender--grid--weeksymbol"
          >
            {week}
          </button>
        ))}
        {/* //The _ argument is a placeholder for the element itself, which is not used in the callback function.  */}
        {Array.from({ length: prefixDays }).map((_, index) => (
          <div key={index} className="contentblockmonth--grid--button "></div>
        ))}
        {Array.from({ length: numDays }).map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setValues(index);
            }}
            className={`contentblockmonth--grid--button`} //!
          >
            <div
              className={`contentblockmonth--grid--button1 
                  ${
                    Moment(new Date()).format("yyyy-MM-D") ==
                      Moment(currentDate).format("yyyy-MM-") + (index + 1) &&
                    "autofocused"
                  }`}
            >
              {index + 1}
            </div>

            {valueOne.allAppointment
              .filter(
                (person) =>
                  Moment(person.appointmentDate).format("yyyy-MM-D") ==
                  Moment(currentDate).format("yyyy-MM-") + (index + 1)
              )
              .map((appointment) => (
                <div
                  onClick={(e) => {
                    patchValues(
                      index,
                      e,
                      appointment.id,
                      appointment.appointmentStartTime,
                      appointment.appointmentEndTime,
                      appointment.name,
                      appointment.appointmentContent
                    );
                  }}
                  className="contentblockmonth--content"
                  style={{ borderColor: appointment.color }}
                >
                  <div className="contentblockmonth--content--time">
                    {appointment.appointmentContent || "No title"}
                  </div>
                </div>
              ))}
          </div>
        ))}
        {Array.from({ length: suffixDays }).map((_, index) => (
          <div key={index} className="contentblockmonth--grid--button "></div>
        ))}
      </div>
    </div>
  );
}

export default ContentBlockMonth;
