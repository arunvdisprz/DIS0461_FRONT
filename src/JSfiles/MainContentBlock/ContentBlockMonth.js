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

export default function ContentBlockMonth() {
  const valueOne = useContext(Requiredvalue);
  const [currentDate, setCurrentDate] = useState(new Date()); //!this current date
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

  //Set current month of the year
  const handleSetToday = () => {
    valueOne.setAppointmentDate(new Date());
    setCurrentDate(new Date()); //!it will update here
  };

  //Each cell is clickable and has a click event handler that calls the "setValues" function.
  //This function updates the "Requiredvalue" context with the date for a new appointment.
  //The date is the index of the cell clicked, in the format of "yyyy-MM-ddTHH:mm:ss"
  const setValues = (index) => {
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

  //function "patchValues" that is passed as a click event handler to each appointment element.
  //When an appointment element is clicked, this function updates the "Requiredvalue" context with data for the selected appointment,
  // such as the id, start time, end time, name, and content of the appointment.
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

  //The component renders a header that displays the month and year of the selected date,
  //And navigation buttons to move between months and years. It also renders a button to go to today's date
  return (
    <div
      className="contentblockmonth--currentmonth--calender"
      aria-label="calendar month view"
    >
      {/* "prevMonth", "nextMonth", "prevYear", and "nextYear" button are used to navigate to the previous or next month or year respectively.
          "handleSetToday" button is used to go to today's date. */}
      <div className="contentblockmonth--currentmonth--div">
        <button
          onClick={handleSetToday}
          className="contentblockmonth--currentmonth--button  "
          aria-label="current month button"
        >
          Current Month
        </button>
      </div>
      <div className="inbulidcalender--grid" aria-label="calendar grid">
        <button
          onClick={() => prevYear()}
          className="inbulidcalender--grid--button"
          aria-label="previous year button"
        >
          <img
            src={doublearrowleft}
            className="maincontent--right--cancelicon"
            aria-hidden="true"
          ></img>
        </button>
        <button
          onClick={() => prevMonth()}
          className="inbulidcalender--grid--button"
          aria-label="previous month button"
        >
          <img
            src={arrowleft}
            className="maincontent--right--cancelicon"
            aria-hidden="true"
          ></img>
        </button>
        <button className="inbulidcalender--grid--span3 inbulidcalender--grid--emptybutton inbulidcalender--grid--weeksymbol">
          {format(currentDate, "MMM  yyyy")}
        </button>
        <button
          onClick={() => nextMonth()}
          className="inbulidcalender--grid--button"
          aria-label="next month button"
        >
          <img
            src={arrowright}
            className="maincontent--right--cancelicon"
            aria-hidden="true"
          ></img>
        </button>
        <button
          onClick={() => nextYear()}
          className="inbulidcalender--grid--button"
          aria-label="next year button"
        >
          <img
            src={doublearrowright}
            className="maincontent--right--cancelicon"
            aria-hidden="true"
          ></img>
        </button>
        {weeks.map((week, index) => (
          <button
            key={index}
            className="inbulidcalender--grid--emptybutton inbulidcalender--grid--weeksymbol"
            aria-label={`week ${index + 1}`}
          >
            {week}
          </button>
        ))}

        {/* "Array.from" to generate an array with the length of "prefixDays". This
        array represents the number of days from the previous month that appear
        on the calendar before the first day of the current month. */}
        {Array.from({ length: prefixDays }).map((_, index) => (
          <div
            key={index}
            className="contentblockmonth--grid--button "
            aria-label={`Prefix day ${index + 1}`}
          ></div>
        ))}

        {/* "Array.from" to generate an array with the length of "numDays". This
          array represents the number of days in the current month. after it will check 
          whether have appointment or not in particular day*/}
        {Array.from({ length: numDays }).map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setValues(index);
            }}
            className={`contentblockmonth--grid--button`}
            aria-label={`day ${index + 1}`}
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
                  aria-label={`appointment on ${appointment.appointmentDate}`}
                >
                  <div className="contentblockmonth--content--time">
                    {appointment.appointmentContent.length < 25
                      ? appointment.appointmentContent
                      : appointment.appointmentContent.slice(0, 22) + "..."}
                  </div>
                </div>
              ))}
          </div>
        ))}
        {/* Array.from" to generate an array with the length of "suffixDays". This
          array represents the number of days from the next month that appear on
          the calendar after the last day of the current month. */}
          
        {Array.from({ length: suffixDays }).map((_, index) => (
          <div
            key={index}
            className="contentblockmonth--grid--button "
            aria-label={`day ${index + 1 + numDays}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
