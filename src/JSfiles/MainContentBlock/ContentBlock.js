import React, { useState } from "react";
import Moment from "moment";
import convertTime from "convert-time";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import moment from "moment";
import arrowrighthorizontalline from "../pictures/arrowrighthorizontalline.png";
import wavinghandicon from "../pictures/wavinghandicon.png";

//value.
export default function ContentBlock() {
  const value = useContext(Requiredvalue);
  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <div>
      <div className="contentblock">
        <div className="calenderbar--right--contentblock">
          <div className="contentblock--dateday">
            <div className="contentblock--dateday--textnum">
              <div className="contentblock--dateday--text ">
                {day[value.appointmentDate.getDay()]}
              </div>
              <div className="contentblock--dateday--num ">
                {value.appointmentDate.getDate()}
              </div>
            </div>
            <div>
              <span className="contentblock--good">
                <img
                  src={wavinghandicon}
                  className="contentblock--waveicon"
                ></img>
                {moment(new Date()).format("HH") < 12.0
                  ? "Good Morning"
                  : moment(new Date()).format("HH") < 18.0
                  ? "Good Afternoon "
                  : "Good Evening"}
                {value.name == "null" ? "" : " " + value.name.toUpperCase()}
              </span>
            </div>
            <div></div>
          </div>
          {Array.from({ length: 24 }).map((_, indexmain) => (
            <div
              className="calenderbar--right--linebar"
              key={indexmain}
              onClick={() => {
                value.setAppointmentValue(true);
                value.setValueForPatch(false);
                value.setStartTimeValue(indexmain + ":00");
                value.setEndTimeValue(indexmain + 1 + ":00");
              }}
            >
              <div className="calenderbar--right--linebarnumber">
                {indexmain == 0 ? "" : convertTime(+indexmain + ":00", "hhA")}
              </div>
              <div className="calenderbar--right--linebardiv">
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
                {value.data.map((con, index) =>
                  Moment(con.appointmentStartTime).format("H") - 0 >=
                    indexmain &&
                  Moment(con.appointmentStartTime).format("H") - 0 <
                    indexmain + 1 ? (
                    <div
                      className="contentblock--content "
                      style={{
                        "--title-color": con.color,
                        height:
                          (((Moment(con.appointmentEndTime).format("H") -
                            Moment(con.appointmentStartTime).format("H")) *
                            60 +
                            (Moment(con.appointmentEndTime).format("mm") -
                              Moment(con.appointmentStartTime).format("mm"))) /
                            6.1) *
                            5 +
                          "px",
                        marginTop:
                          ((Moment(con.appointmentStartTime).format("mm") - 0) /
                            6) *
                            5 <
                          12.5
                            ? "12.5px"
                            : (((Moment(con.appointmentEndTime).format("H") -
                                Moment(con.appointmentStartTime).format("H")) *
                                60 +
                                (Moment(con.appointmentEndTime).format("mm") -
                                  Moment(con.appointmentStartTime).format(
                                    "mm"
                                  ))) /
                                6.1) *
                                5 +
                              "px",
                        marginTop:
                          ((Moment(con.appointmentStartTime).format("mm") - 0) /
                            6) *
                            5 +
                          "px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        value.setPatchId(con.id);
                        value.setPatchStartTime(
                          Moment(con.appointmentStartTime).format("HH:mm")
                        );
                        value.setPatchEndTime(
                          Moment(con.appointmentEndTime).format("HH:mm")
                        );
                        value.setPatchName(con.name);
                        value.setPatchContent(con.appointmentContent);
                        value.setValueForPatch(!value.valueForPatch);
                        value.setAppointmenStatus(con.appointmentStatus);
                        value.setAppointmentValue(false);
                        value.setvalueForPatchEdit(false);
                      }}
                      key={index}
                    >
                      <span
                        className="contentblock--leftcolor-line"
                        style={{ background: con.color }}
                      ></span>
                      <div
                        className="contentblock--contenttime"
                        style={{ "--title-color": con.color }}
                      >
                        {Moment(con.appointmentStartTime).format("a") ==
                        Moment(con.appointmentEndTime).format("a") ? (
                          <div>
                            {Moment(con.appointmentStartTime).format("h:mm")} -
                            {Moment(con.appointmentEndTime).format("h:mm")}
                            {Moment(con.appointmentStartTime).format("a")}
                          </div>
                        ) : (
                          <div>
                            {Moment(con.appointmentStartTime).format("h:mm a")}{" "}
                            -{Moment(con.appointmentEndTime).format("h:mm a")}
                          </div>
                        )}
                        {con.location == "" ? (
                          <div></div>
                        ) : (
                          <div>
                            <span>(In&nbsp;</span>
                            {con.location}
                            <span>)</span>
                          </div>
                        )}
                      </div>
                      <div className="contentblock--content-title">
                        {con.appointmentContent || "No title"}
                      </div>
                      <div className="contentblock--status">
                        {con.appointmentStartTime >
                        Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
                          ? "Upcoming"
                          : con.appointmentStatus
                          ? "Completed"
                          : "Missed"}
                        {con.appointmentStartTime <
                        Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss") ? (
                          <label class="switch">
                            <input
                              type="checkbox"
                              checked={con.appointmentStatus ? true : false}
                              onClick={(e) => {
                                value.setAppointmenStatus(false);
                              }}
                              onChange={(e) => {
                                e.stopPropagation();
                                value.setPatchId(con.id);
                                value.setPatchStartTime(
                                  Moment(con.appointmentStartTime).format(
                                    "HH:mm"
                                  )
                                );
                                value.setPatchEndTime(
                                  Moment(con.appointmentEndTime).format("HH:mm")
                                );
                                value.setAppointmentValue(false);
                                value.setvalueForPatchEdit(false);
                                value.setPatchName(con.name);
                                value.setPatchContent(con.appointmentContent);
                                value.Postpatch(!con.appointmentStatus);

                                // value.setAppointmenStatus(!con.appointmentStatus);
                              }}
                            />
                            <span class="slider round"></span>
                          </label>
                        ) : (
                          ""
                        )}
                        {/* <input
                          {...(con.appointmentStatus == "Completed" && checked)}
                          value="Pending"
                          type="checkbox"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onChange={(e) => {
                            e.stopPropagation();
                            value.setPatchId(con.id);
                            value.setPatchStartTime(
                              Moment(con.appointmentStartTime).format("HH:mm")
                            );
                            value.setPatchEndTime(
                              Moment(con.appointmentEndTime).format("HH:mm")
                            );
                            value.setPatchName(con.name);
                            value.setPatchContent(con.appointmentContent);
                            value.setAppointmenStatus(e.target.value);
                          }}
                        /> */}
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
    </div>
  );
}
