import React, { useState } from "react";
import Moment from "moment";
import convertTime from "convert-time";
import arrowrighthorizontalline from "../pictures/arrowrighthorizontalline.png";
import wavinghandicon from "../pictures/wavinghandicon.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function ContentBlock() {
  const value = useContext(Requiredvalue);
  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];


  //This function updates the "Requiredvalue" context with the start and end time for a new appointment.
  // The start time is the index of the line clicked, in the format of "H:00",
  // and the end time is the next hour in the format of "H+1:00".
  const setTimeValue = (indexmain) => {
    value.setAppointmentValue(true);
    value.setValueForPatch(false);
    value.setStartTimeValue(indexmain + ":00");
    indexmain == 23
      ? value.setEndTimeValue("23:59")
      : value.setEndTimeValue(indexmain + 1 + ":00");
    console.log(value.startTimeValue, value.endTimeValue);
  };

  //"marginTop" function takes the start time of an appointment as a parameter and
  // calculates the top margin value of the appointment element based on the minutes of the start time.
  const marginTop = (appointmentStartTime) => {
    return ((Moment(appointmentStartTime).format("mm") - 0) / 6) * 5;
  };

  //"height" function takes the start time and end time of an appointment as parameters and
  //calculates the height of the appointment element based on the duration of the appointment.
  const height = (appointmentStartTime, appointmentEndTime) => {
    return (
      (((Moment(appointmentEndTime).format("H") -
        Moment(appointmentStartTime).format("H")) *
        60 +
        (Moment(appointmentEndTime).format("mm") -
          Moment(appointmentStartTime).format("mm"))) /
        6.1) *
      5
    );
  };


  //function "patchValues" that is passed as a click event handler to each appointment element. 
  //When an appointment element is clicked, this function updates the "Requiredvalue" context with data for the selected appointment, 
  //such as the id, start time, end time, name, and content of the appointment.
  const patchValues = (
    e,
    id,
    appointmentStartTime,
    appointmentEndTime,
    name,
    appointmentContent
  ) => {
    e.stopPropagation();
    value.setPatchId(id);
    value.setPatchStartTime(Moment(appointmentStartTime).format("HH:mm"));
    value.setPatchEndTime(Moment(appointmentEndTime).format("HH:mm"));
    value.setPatchName(name);
    value.setPatchContent(appointmentContent);
    value.setAppointmentValue(false);
    value.setvalueForPatchEdit(false);
  };

  //The component renders a header that displays the day of the week and date for the selected day,
  //And a greeting message based on the time of the day and the name of the user.
  return (
    <div className="contentblock" aria-label="Calendar view">
      <div
        className="maincontent--right--contentblock"
        aria-label="Calendar appointments"
      >
        <div
          className="contentblock--dateday"
          aria-label="Calendar date and day"
        >
          <div
            className="contentblock--dateday--textnum"
            aria-label="Calendar date and day details"
          >
            <div
              className="contentblock--dateday--text"
              aria-label="Calendar day"
            >
              {day[value.appointmentDate.getDay()]}
            </div>
            <div
              className="contentblock--dateday--num"
              aria-label="Calendar date"
            >
              {value.appointmentDate.getDate()}
            </div>
          </div>
          <div>
            <span className="contentblock--good" aria-label="Greeting">
              <img
                src={wavinghandicon}
                className="contentblock--waveicon"
                aria-hidden="true"
              ></img>
              {Moment(new Date()).format("HH") < 12.0
                ? "Good Morning"
                : Moment(new Date()).format("HH") < 18.0
                ? "Good Afternoon "
                : "Good Evening"}
              {value.name == "null" ? "" : " " + value.name.toUpperCase()}
            </span>
          </div>
          <div aria-hidden="true"></div>
        </div>
        
        {/* Renders 24 lines representing 24 hours in a day. Each line is clickable and has a click event handler that calls the "setTimeValue" function.  */}
        {Array.from({ length: 24 }).map((_, indexmain) => (
          <div
            className="maincontent--right--linebar"
            key={indexmain}
            onClick={() => setTimeValue(indexmain)}
            aria-label={`Click to select time ${convertTime(
              +indexmain + ":00",
              "hhA"
            )}`}
          >
            <div className="maincontent--right--linebarnumber">
              {indexmain == 0 ? "" : convertTime(+indexmain + ":00", "hhA")}
            </div>
            <div className="maincontent--right--linebardiv">
              {Moment(new Date()).format("H") == indexmain &&
                Moment(new Date()).format("dd mm yyyy") ==
                  Moment(value.appointmentDate).format("dd mm yyyy") && (
                  <div
                    style={{
                      marginTop:
                        ((Moment(new Date()).format("mm") - 0) / 6) * 5 + "px",
                      position: "absolute",
                      zIndex: "2",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="contentblock--appointmentDate--horizontal">
                      <img
                        src={arrowrighthorizontalline}
                        className="contentblock--appointmentDate--horizontalline--icon"
                      ></img>
                      <div className="contentblock--appointmentDate--horizontalline"></div>
                    </div>
                  </div>
                )}
              {value.data.map((appointment, index) =>
                Moment(appointment.appointmentStartTime).format("H") - 0 >=
                  indexmain &&
                Moment(appointment.appointmentStartTime).format("H") - 0 <
                  indexmain + 1 ? (
                  <div
                    className="contentblock--content "
                    style={{
                      "--title-color": appointment.color,
                      height:
                        height(
                          appointment.appointmentStartTime,
                          appointment.appointmentEndTime
                        ) < 12.5
                          ? 12.5
                          : height(
                              appointment.appointmentStartTime,
                              appointment.appointmentEndTime
                            ) + "px",
                      marginTop:
                        marginTop(appointment.appointmentStartTime) + "px",
                    }}
                    onClick={(e) => {
                      patchValues(
                        e,
                        appointment.id,
                        appointment.appointmentStartTime,
                        appointment.appointmentEndTime,
                        appointment.name,
                        appointment.appointmentContent
                      );
                      value.setValueForPatch(!value.valueForPatch);
                      value.setAppointmenStatus(appointment.appointmentStatus);
                    }}
                    aria-label={`Click to select ${
                      appointment.name
                    } from ${Moment(appointment.appointmentStartTime).format(
                      "h:mm a"
                    )} to ${Moment(appointment.appointmentEndTime).format(
                      "h:mm a"
                    )}`}
                    key={index}
                  >
                    <span
                      className="contentblock--leftcolor-line"
                      style={{ background: appointment.color }}
                    ></span>
                    <div
                      className="contentblock--contenttime"
                      style={{ "--title-color": appointment.color }}
                    >
                      {Moment(appointment.appointmentStartTime).format("a") ==
                      Moment(appointment.appointmentEndTime).format("a") ? (
                        <div>
                          {Moment(appointment.appointmentStartTime).format(
                            "h:mm"
                          )}{" "}
                          -
                          {Moment(appointment.appointmentEndTime).format(
                            "h:mm"
                          )}
                          {Moment(appointment.appointmentStartTime).format("a")}
                        </div>
                      ) : (
                        <div>
                          {Moment(appointment.appointmentStartTime).format(
                            "h:mm a"
                          )}{" "}
                          -
                          {Moment(appointment.appointmentEndTime).format(
                            "h:mm a"
                          )}
                        </div>
                      )}
                      {appointment.location == "" ? (
                        <div></div>
                      ) : (
                        <span>
                          <span>&nbsp;(In&nbsp;</span>
                          {appointment.location}
                          <span>)</span>
                        </span>
                      )}
                    </div>
                    <div className="contentblock--content-title">
                      {appointment.appointmentContent.length < 50
                        ? appointment.appointmentContent
                        : appointment.appointmentContent.slice(0, 47) + "..."}
                    </div>
                    <div className="contentblock--status">
                      {appointment.appointmentStartTime >
                      Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
                        ? "Upcoming"
                        : appointment.appointmentStatus
                        ? "Completed"
                        : "Missed"}
                      {appointment.appointmentStartTime <
                      Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss") ? (
                        <label class="switch">
                          <input
                            type="checkbox"
                            checked={
                              appointment.appointmentStatus ? true : false
                            }
                            onClick={(e) => {
                              value.setAppointmenStatus(false);
                            }}
                            onChange={(e) => {
                              patchValues(
                                e,
                                appointment.id,
                                appointment.appointmentStartTime,
                                appointment.appointmentEndTime,
                                appointment.name,
                                appointment.appointmentContent
                              );
                              value.Postpatch(!appointment.appointmentStatus);
                            }}
                          />
                          <span class="slider round"></span>
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
