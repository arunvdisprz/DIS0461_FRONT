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
import { RWebShare } from "react-web-share";
import convertTime from "convert-time";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function PatchValue() {
  const value = useContext(Requiredvalue);

  //Several functions such as editIconView, deleteIconView, cancelIconView, and saveButton
  // which handle the different actions that can be performed on the appointment.
  const editIconView = () => {
    value.setvalueForPatchEdit(!value.valueForPatchEdit);
    value.setStartTimeValue(value.patchStartTime);
    value.setEndTimeValue(value.patchEndTime);
  };
  const deleteIconView = () => {
    value.setIsOpen(true);
    value.setPatchId(value.patchId);
    value.setValueForPatch(!value.valueForPatch);
  };
  const cancelIconView = () => {
    value.setValueForPatch(false);
    value.setvalueForPatchEdit(false);
  };
  const saveButton = () => {
    value.setValueForPatch(!value.valueForPatch);
    value.setvalueForPatchEdit(false);
    value.Postpatch(value.appointmentStatus);
  };

  const patchTitle = () => {
    return (
      <div
        className="maincontent--right--cancelbar"
        aria-label="Update appointment options"
      >
        <h2>Update appointment</h2>
        <div>
          {!value.valueForPatchEdit && (
            <img
              src={editicon}
              className="maincontent--right--cancelicon"
              onClick={editIconView}
              aria-label="Edit appointment"
            ></img>
          )}
          {!value.valueForPatchEdit && (
            <img
              src={deleteicon}
              className="maincontent--right--cancelicon"
              onClick={deleteIconView}
              title="Delete"
              aria-label="Delete appointment"
            ></img>
          )}
          {/* it uses Moment.js to format the appointment date, and a package called "convert-time" to convert the start and end times of the appointment to a specific format.
            It uses the react-web-share library to allow the user to share the appointment's details on their device. */}
          {!value.valueForPatchEdit && (
            <RWebShare
              className="maincontent--right--cancelicon"
              data={{
                text:
                  "I  have meet on " +
                  Moment(value.appointmentDate).format("Do MMM  YYYY") +
                  " from " +
                  convertTime(value.patchStartTime, "hh:mma") +
                  " to " +
                  convertTime(value.patchEndTime, "hh:mma") +
                  " " +
                  " " +
                  "TITLE:   " +
                  value.patchContent,
                title: "Subject : Share appointment",
              }}
              onClick={() => {
                value.setValueForPatch(!value.valueForPatch);
              }}
              aria-label="Share appointment"
            >
              <img
                src={shareicon}
                className="maincontent--right--cancelicon"
                alt="Share appointment"
              ></img>
            </RWebShare>
          )}
          <img
            src={cancelicon}
            className="maincontent--right--cancelicon"
            onClick={cancelIconView}
            aria-label="Cancel"
          ></img>
        </div>
      </div>
    );
  };
  const patchEditModal = () => {
    return (
      !value.valueForPatchEdit && (
        <div>
          <div className="addappointment--icontext ">
            <img
              src={personicon}
              className="addappointment--icon"
              aria-label="Person icon"
            ></img>
            <div className="addappointment--text ">
              {value.patchName === "null" ? "-" : value.patchName.toUpperCase()}
            </div>
          </div>
          <div className="addappointment--icontext ">
            <img
              src={todayicon}
              className="addappointment--icon"
              aria-label="Today icon"
            ></img>
            <div className="addappointment--text ">
              {Moment(value.appointmentDate).format("Do MMM YYYY")}
            </div>
          </div>
          <div className="addappointment--icontext ">
            <img
              src={titleicon}
              className="addappointment--icon"
              aria-label="Title icon"
            ></img>
            <div className="addappointment--text ">
              {(value.patchContent = "" ? "No title" : value.patchContent)}
            </div>
          </div>
          <div className="addappointment--icontext ">
            <img
              src={scheduleicon}
              className="addappointment--icon"
              aria-label="Schedule icon"
            ></img>
            <div className="addappointment--text ">
              {convertTime(value.patchStartTime)}-{" "}
              {convertTime(value.patchEndTime)}
            </div>
          </div>
        </div>
      )
    );
  };
  const patchEditModalValue = () => {
    return (
      value.valueForPatchEdit && (
        <div>
          <div
            className="maincontent--right--appointmentblock"
            aria-label="Update Appointment Form"
          >
            <div className="maincontent--right--apptheme">
              <input
                value={value.patchContent}
                type="text"
                className="maincontent--right--appthemeinput"
                placeholder="Update Appointments here..."
                onChange={(e) => value.setPatchContent(e.target.value)}
                autoFocus
                required
                aria-label="Appointment Title Input"
              ></input>
              <label>Title</label>
            </div>
          </div>
          <TimePicker aria-label="Appointment Time Picker"></TimePicker>
          <div className="addappointment--icontext ">
            <img
              src={personicon}
              className="addappointment--icon"
              aria-hidden="true"
              alt="person icon"
            ></img>
            <div
              className="addappointment--text "
              aria-label="Appointment Person"
            >
              {value.patchName === "null" ? "-" : value.patchName.toUpperCase()}
            </div>
          </div>
          <div className="addappointment--icontext ">
            <img
              src={todayicon}
              className="addappointment--icon"
              aria-hidden="true"
              alt="today icon"
            ></img>
            <div
              className="addappointment--text "
              aria-label="Appointment Date"
            >
              {Moment(value.appointmentDate).format("Do MMM YYYY")}
            </div>
          </div>
          <div className="addappointment--icontext ">
            <img
              src={paletteicon}
              className="addappointment--icon"
              aria-hidden="true"
              alt="color palette"
            ></img>
            <ColourPicker aria-label="Appointment Color Picker"></ColourPicker>
          </div>
          <div className="maincontent--right--appsavebar">
            <button
              onClick={saveButton}
              className="maincontent--right--appsave "
              aria-label="Save Appointment"
            >
              Save Appointment
            </button>
          </div>
        </div>
      )
    );
  };

  return (
    // It allows a user to update an appointment by providing several options to edit, delete, share or cancel the appointment.
    // It also renders some text and icons that display information about the appointment, such as the name, start and end time, and title.
    <div
      className={`maincontent--right--updatebar ${
        value.contentBlockMonth && "addappointment--content-month"
      }`}
    >
      {patchTitle()}
      {patchEditModal()}
      {patchEditModalValue()}
    </div>
  );
}
