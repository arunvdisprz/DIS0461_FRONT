import React from "react";
import TimePicker from "../TimePicker/TimePicker";
import Moment from "moment";
import deleteicon from "../pictures/deleteicon.png";
import cancelicon from "../pictures/cancelicon.png";
import shareicon from "../pictures/shareicon.png";
import editicon from "../pictures/editicon.png";
import personicon from "../pictures/personicon.png";
import todayicon from "../pictures/todayicon.png";
import scheduleicon from "../pictures/scheduleicon.png";
import titleicon from "../pictures/titleicon.png";
import ColourPicker from "../ColourPicker/ColourPicker.js";
import paletteicon from "../pictures/paletteicon.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCalendarDays,
  faTimes,
  faUser,
  faShare,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";
import { RWebShare } from "react-web-share";
import convertTime from "convert-time";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
export default function PatchValue() {
  const value = useContext(Requiredvalue);
  return (
    <div className="calenderbar--right--updatebar">
      <div className="calenderbar--right--cancelbar">
        <h2>Update appointment</h2>
        <div>
          {!value.valueForPatchEdit && (
            <img
              src={editicon}
              className="calenderbar--right--cancelicon"
              onClick={() => {
                value.setvalueForPatchEdit(!value.valueForPatchEdit);
                value.setStartTimeValue(value.patchStartTime);
                value.setEndTimeValue(value.patchEndTime);
              }}
            ></img>
          )}
          {!value.valueForPatchEdit && (
            <img
              src={deleteicon}
              className="calenderbar--right--cancelicon"
              onClick={() => {
                value.Postdelete(value.patchId);
                value.setValueForPatch(!value.valueForPatch);
              }}
              title="Delete"
            ></img>
          )}
          {!value.valueForPatchEdit && (
            <RWebShare
              className="calenderbar--right--cancelicon"
              data={{
                text:
                  value.patchName +
                  " have meet at " +
                  Moment(value.appointmentDate).format("Do MMM  YYYY") +
                  " " +
                  convertTime(value.patchStartTime) +
                  " to " +
                  convertTime(value.patchEndTime),
                title: "GfG",
              }}
              onClick={() => {
                value.setValueForPatch(!value.valueForPatch);
              }}
            >
              <img
                src={shareicon}
                className="calenderbar--right--cancelicon"
              ></img>
            </RWebShare>
          )}
          <img
            src={cancelicon}
            className="calenderbar--right--cancelicon"
            onClick={() => {
              value.setValueForPatch(false);
              value.setvalueForPatchEdit(false);
            }}
          ></img>
        </div>
      </div>
      {!value.valueForPatchEdit && (
        <div>
          <div className="Addappointmentbar--icontext ">
            <img src={personicon} className="Addappointmentbar--icon"></img>
            <div className="Addappointmentbar--text ">
              {value.patchName == "null" ? "-" : value.patchName.toUpperCase()}
            </div>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img src={todayicon} className="Addappointmentbar--icon"></img>
            <div className="Addappointmentbar--text ">
              {Moment(value.appointmentDate).format("Do MMM  YYYY")}
            </div>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img src={titleicon} className="Addappointmentbar--icon"></img>
            <div className="Addappointmentbar--text ">
              {(value.patchContent = "" ? "No title" : value.patchContent)}
            </div>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img src={scheduleicon} className="Addappointmentbar--icon"></img>
            <div className="Addappointmentbar--text ">
              {convertTime(value.patchStartTime)}-{" "}
              {convertTime(value.patchEndTime)}
            </div>
          </div>
        </div>
      )}
      {value.valueForPatchEdit && (
        <div>
          <div className="calenderbar--right--appointmentblock">
            <div className="calenderbar--right--apptheme">
              <input
                value={value.patchContent}
                type="text"
                className="calenderbar--right--appthemeinput"
                placeholder="Update Appointments here..."
                onChange={(e) => value.setPatchContent(e.target.value)}
                autoFocus
                required
              ></input>
              <label>Title</label>
            </div>
          </div>
          <TimePicker></TimePicker>
          <div className="Addappointmentbar--icontext ">
            <img src={personicon} className="Addappointmentbar--icon"></img>
            <div className="Addappointmentbar--text ">
              {value.patchName == "null" ? "-" : value.patchName.toUpperCase()}
            </div>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img src={todayicon} className="Addappointmentbar--icon"></img>
            <div className="Addappointmentbar--text ">
              {Moment(value.appointmentDate).format("Do MMM  YYYY")}
            </div>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img src={paletteicon} className="Addappointmentbar--icon"></img>
            <ColourPicker></ColourPicker>
          </div>
          <div className="calenderbar--right--appsavebar">
            <button
              onClick={() => {
                value.setValueForPatch(!value.valueForPatch);
                value.setvalueForPatchEdit(false);
                value.Postpatch(value.patchId);
              }}
              className="calenderbar--right--appsave "
            >
              Save Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
