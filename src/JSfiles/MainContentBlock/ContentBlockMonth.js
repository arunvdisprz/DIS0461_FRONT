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
  const value1 = useContext(Requiredvalue);
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
    // value1.setAppointmentDate(date);
  };

  const handleSetToday = () => {
    value1.setAppointmentDate(new Date());
    setCurrentDate(new Date()); //!it will update here
  };

  const Autofocus = (index) => {
    return (
      <div
        key={index}
        onClick={() => handleClickDate(index + 1)}
        className={`contentblockmonth--grid--button  ${
          index == value1.appointmentDate.getDate() - 1 &&
          format(currentDate, "MMM  yyyy") ==
            format(value1.appointmentDate, "MMM  yyyy") &&
          "autofocused"
        } `}
      >
        {index + 1}
        {
          value.allAppointment.filter(
            (person) =>
              person.appointmentStartTime >
              Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
          )
          //   .map((appointment) => (
          //     <div className="createblock--upcoming--content">
          //       <div
          //         className="createblock--upcoming--content--color"
          //         style={{ backgroundColor: appointment.color }}
          //       ></div>
          //       <div>
          //         <div className="createblock--upcoming--content--date">
          //           {Moment(appointment.appointmentDate).format("ddd, MMM DD")}
          //         </div>
          //         <div className="createblock--upcoming--content--title">
          //           {appointment.appointmentContent
          //             ? appointment.appointmentContent
          //             : "no title"}
          //         </div>
          //         <div className="createblock--upcoming--content--time">
          //           {Moment(appointment.appointmentStartTime).format("h:mmA")}-
          //           {Moment(appointment.appointmentEndTime).format("h:mmA")}
          //         </div>
          //       </div>
          //     </div>
          //   ))
        }
      </div>
    );
  };

  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <div className="ContentBlockMonth--currentmonth ">
      {/* <div className="ContentBlockMonth--currentmonth">
        <button
          onClick={handleSetToday}
          className="contentblockmonth--currentmonth--button"
        >
          Current Month
        </button>
      </div> */}
      <div className="contentblockmonth--currentmonth--calender">
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
              onClick={() => handleClickDate(index + 1)}
              className={`contentblockmonth--grid--button`} //!
            >
              <div
                className={`contentblockmonth--grid--button1 ${
                  index == value1.appointmentDate.getDate() - 1 &&
                  format(currentDate, "MMM  yyyy") ==
                    format(value1.appointmentDate, "MMM  yyyy") &&
                  "autofocused"
                } `}
              >{index + 1}</div>
              
              {value1.allAppointment
                .filter(
                  (person) =>
                    Moment(person.appointmentDate).format("yyyy-MM-D") ==
                    Moment(currentDate).format("yyyy-MM-") + (index + 1)
                )
                .map((appointment) => (
                  <div className="createblock--upcoming--content--time">
                    {Moment(appointment.appointmentStartTime).format("h:mmA")}-
                    {Moment(appointment.appointmentEndTime).format("h:mmA")}
                  </div>
                ))}
            </div>
          ))}
          {Array.from({ length: suffixDays }).map((_, index) => (
            <div key={index} className="contentblockmonth--grid--button "></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentBlockMonth;
