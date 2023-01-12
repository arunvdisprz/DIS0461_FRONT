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

function Inbuildcalender({ setAppointmentDate, appointmentDate }) {

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
    setAppointmentDate(date);
  };

  const handleSetToday = () => {
    setAppointmentDate(new Date());
    setCurrentDate(new Date()); //!it will update here
  };

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
        } `} //!
      >
        {index + 1}
      </button>
    );
  };

  const weeks = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="inbulidcalenderbar">
      <div className="inbulidcalenderbar--today--date">
        <button onClick={handleSetToday} className="NavBar23 ">
          Today
        </button>
        <div className="calenderbar--right--calenderdate1">
          <div>
            <button
              onClick={() => {
                setAppointmentDate(sub(appointmentDate, { days: 1 }));
                setCurrentDate(sub(appointmentDate, { days: 1 }));
              }} //!IT will decrease the date
              className="inbulidcalender--grid--button"
            >
              <img
                src={arrowleft}
                className="calenderbar--right--cancelicon"
              ></img>
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setAppointmentDate(add(appointmentDate, { days: 1 }));
                setCurrentDate(add(appointmentDate, { days: 1 }));
              }} //!IT will increase the date
              className="inbulidcalender--grid--button"
            >
              <img
                src={arrowright}
                className="calenderbar--right--cancelicon"
              ></img>
            </button>
          </div>
          <div className="calenderbar--right--showingdate">
            {Moment(appointmentDate).format("Do MMM  YYYY")}
          </div>
        </div>
      </div>

      <div className="inbulidcalender">
        {/* {format(currentDate, "dd MMM  yyyy")} */}
        <div className="inbulidcalender--grid">
          <button
            onClick={() => prevYear()}
            className="inbulidcalender--grid--button"
          >
            <img
              src={doublearrowleft}
              className="calenderbar--right--cancelicon"
            ></img>
          </button>
          <button
            onClick={() => prevMonth()}
            className="inbulidcalender--grid--button"
          >
            <img
              src={arrowleft}
              className="calenderbar--right--cancelicon"
            ></img>
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
              className="calenderbar--right--cancelicon"
            ></img>
          </button>
          <button
            onClick={() => nextYear()}
            className="inbulidcalender--grid--button"
          >
            <img
              src={doublearrowright}
              className="calenderbar--right--cancelicon"
            ></img>
          </button>
          {weeks.map((week, index) => (
            <button key={index} className="inbulidcalender--grid--emptybutton inbulidcalender--grid--weeksymbol">
              {week}
            </button>
          ))}
          {/* //The _ argument is a placeholder for the element itself, which is not used in the callback function.  */}
          {Array.from({ length: prefixDays }).map((_, index) => (
            <button
              key={index}
              className="inbulidcalender--grid--emptybutton "
            />
          ))}
          {Array.from({ length: numDays }).map((_, index) => Autofocus(index))}
          {Array.from({ length: suffixDays }).map((_, index) => (
            <button
              key={index}
              className="inbulidcalender--grid--emptybutton"
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Inbuildcalender;
