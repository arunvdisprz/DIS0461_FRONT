import React from "react";
import "./InBuildCalender.scss";
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

export default function InBuildCalender({
  setAppointmentDate,
  appointmentDate,
}) {
  const [currentDate, setCurrentDate] = useState(new Date()); //this current date
  const value = currentDate;

  //The startDate and endDate variables are used to determine the first and last days of the current month,
  // while the numDays variable calculates the total number of days in the current month.
  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  //here you get value with 0-6 if 0 means sun and 6 mean sat that it
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  //The prevMonth, nextMonth, prevYear, and nextYear functions are used to navigate to the previous or next month or year respectively.
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
    setAppointmentDate(date);
  };

  const handleSetToday = () => {
    setAppointmentDate(new Date());
    setCurrentDate(new Date());
  };

  //The addDate and subtractDate functions are used to increment or decrement the appointmentDate and currentDate by 1 day.
  const addDate = () => {
    setAppointmentDate(add(appointmentDate, { days: 1 }));
    setCurrentDate(add(appointmentDate, { days: 1 }));
  };
  const subtractDate = () => {
    setAppointmentDate(sub(appointmentDate, { days: 1 }));
    setCurrentDate(sub(appointmentDate, { days: 1 }));
  };

  //The Autofocus function is used to render a button element for each date of the current month,
  //And applies a class of "autofocused" to the button if the date matches the appointmentDate and is in the same month and year as the currentDate.
  const Autofocus = (index) => {
    return (
      <button
        key={index}
        onClick={() => handleClickDate(index + 1)}
        className={`inbulidcalender--grid--button ${
          index == appointmentDate.getDate() - 1 &&
          format(currentDate, "MMM  yyyy") ==
            format(appointmentDate, "MMM  yyyy") &&
          "autofocused"
        } `}
      >
        {index + 1}
      </button>
    );
  };

  const weeks = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="inbulidcalenderb" aria-label="Calendar">
      <div className="inbulidcalenderb--today--date" aria-label="Today's date">
        <button
          onClick={handleSetToday}
          className="inbulidcalender--today--btn "
          aria-label="Set to today's date"
        >
          Today
        </button>
        <div
          className="maincontent--right--calenderdate1"
          aria-label="Date navigation"
        >
          <div aria-label="Previous date">
            <button
              onClick={subtractDate} //IT will decrease the date
              className="inbulidcalender--grid--button"
              aria-label="Previous date"
            >
              <img
                src={arrowleft}
                className="maincontent--right--cancelicon"
                alt="Previous date"
              ></img>
            </button>
          </div>
          <div aria-label="Next date">
            <button
              onClick={addDate} //IT will increase the date
              className="inbulidcalender--grid--button"
              aria-label="Next date"
            >
              <img
                src={arrowright}
                className="maincontent--right--cancelicon"
                alt="Next date"
              ></img>
            </button>
          </div>
          <div
            className="maincontent--right--showingdate"
            aria-label="Displayed date"
          >
            {Moment(appointmentDate).format("Do MMM  YYYY")}
          </div>
        </div>
      </div>
      <div className="inbulidcalender" aria-label="Calendar grid">
        <div className="inbulidcalender--grid">
          <button
            onClick={() => prevYear()}
            className="inbulidcalender--grid--button"
            aria-label="Previous year"
          >
            <img
              src={doublearrowleft}
              className="maincontent--right--cancelicon"
              alt="Previous year"
            ></img>
          </button>
          <button
            onClick={() => prevMonth()}
            className="inbulidcalender--grid--button"
            aria-label="Previous month"
          >
            <img
              src={arrowleft}
              className="maincontent--right--cancelicon"
              alt="Previous month"
            ></img>
          </button>
          <button
            className="inbulidcalender--grid--span3 inbulidcalender--grid--emptybutton inbulidcalender--grid--weeksymbol"
            aria-label="Displayed month and year"
          >
            {format(currentDate, "MMM  yyyy")}
          </button>
          <button
            onClick={() => nextMonth()}
            className="inbulidcalender--grid--button"
            aria-label="Next month"
          >
            <img
              src={arrowright}
              className="maincontent--right--cancelicon"
              alt="Next month"
            ></img>
          </button>
          <button
            onClick={() => nextYear()}
            className="inbulidcalender--grid--button"
            aria-label="Next year"
          >
            <img
              src={doublearrowright}
              className="maincontent--right--cancelicon"
              alt="Next year"
            ></img>
          </button>
          {weeks.map((week, index) => (
            <button
              key={index}
              className="inbulidcalender--grid--emptybutton inbulidcalender--grid--weeksymbol"
              aria-label={`Week ${index + 1}`}
            >
              {week}
            </button>
          ))}
          {/* //The _ argument is a placeholder for the element itself, which is not used in the callback function.  */}
          {Array.from({ length: prefixDays }).map((_, index) => (
            <button
              key={index}
              className="inbulidcalender--grid--emptybutton "
              aria-label={`Prefix day ${index + 1}`}
            />
          ))}
          {Array.from({ length: numDays }).map((_, index) => Autofocus(index))}
          {Array.from({ length: suffixDays }).map((_, index) => (
            <button
              key={index}
              className="inbulidcalender--grid--emptybutton"
              aria-label={`Suffix day ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
