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
import moment from "moment";
import convertTime from "convert-time";
import Moment from "moment";
import { useContext } from "react";
import arrowrighthorizontalline from "../pictures/arrowrighthorizontalline.png";
import { Requiredvalue } from "../MainContent";

function ContentBlockWeek() {
  const value = useContext(Requiredvalue);
  return (
    <div className="ContentBlockWeek ">
      <div>
        {Array.from({ length: 24 }).map((_, indexmain) => (
          <div>
            {indexmain == 0 ? "" : convertTime(+indexmain + ":00", "hhA")}
          </div>
        ))}
      </div>
      <div>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index}>
            l
            {/* {Array.from({ length: 24 }).map((_, indexmain) => (
              <div
                className="maincontent--right--linebar"
                key={indexmain}
                onClick={() => {
                  value.setAppointmentValue(true);
                  value.setValueForPatch(false);
                  value.setStartTimeValue(indexmain + ":00");
                  value.setEndTimeValue(indexmain + 1 + ":00");
                }}
              >
                <div className="maincontent--right--linebardiv">
                  {moment(new Date()).format("H") == indexmain &&
                    moment(new Date()).format("dd mm yyyy") ==
                      moment(value.appointmentDate).format("dd mm yyyy") && (
                      <div
                        style={{
                          marginTop:
                            ((moment(new Date()).format("mm") - 0) / 6) * 5 +
                            "px",
                          position: "absolute",
                          zIndex: "20",
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
                </div>
              </div>
            ))} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentBlockWeek;
