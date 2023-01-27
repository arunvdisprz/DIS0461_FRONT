import React from "react";
import TimePicker from "../TimePicker/TimePicker";
import Moment from "moment";
import deleteicon from "../Assets/deleteicon.png";
import cancelicon from "../Assets/cancelicon.png";
import shareicon from "../Assets/shareicon.png";
import editicon from "../Assets/editicon.png";
import personicon from "../Assets/personicon.png";
import todayicon from "../Assets/todayicon.png";
import scheduleicon from "../Assets/scheduleicon.png";
import titleicon from "../Assets/titleicon.png";
import ColourPicker from "../ColourPicker/ColourPicker.js";
import paletteicon from "../Assets/paletteicon.png";
import InBuildCalender from "../CustomCalender/InBuildCalender";
import { RWebShare } from "react-web-share";
import convertTime from "convert-time";
import { useContext, useState } from "react";
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
    value.appointmentPatch(value.appointmentStatus);
  };
  const [changeDate, setChangeDate] = useState(false);

  //The "patchTitle" function is used to create the update appointment options section.
  //It contains icons for editing, deleting, sharing and canceling the appointment.
  //The function uses Moment.js to format the appointment date and convert-time package to convert the start and end times of the appointment to a specific format.
  //React-web-share library is used to allow the user to share the appointment's details on their device.
  //The onClick events are used to handle the action when the icons are clicked.
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

  //The patchEditModal function renders the details of an appointment that is being updated.
  //It displays the name of the person, the date, the title and the start and end times of the appointment.
  //The function only renders when the valueForPatchEdit state is set to false.
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
            <div className="addappointment--text">
              {value.patchDate === "null" ? "-" : value.name.toUpperCase()}
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
            <div className=" addappointment--text ">
              <span>
                {(value.patchContent = "" ? "No title" : value.patchContent)}
              </span>
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

  //The "patchEditModalValue" function is used to display the form for updating an existing appointment.
  //It includes input fields for updating the title, time, and color of the appointment.
  //It also includes a button to confirm and save the changes made to the appointment.
  //The function uses a boolean value "valueForPatchEdit" to determine whether the form should be displayed or not.
  //It also uses a "saveButton" function to save the changes made to the appointment and a "ColourPicker" component for selecting the color of the appointment.
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
              {value.patchDate === "null" ? "-" : value.name.toUpperCase()}
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
            {!value.contentBlockDate && (
              <button
                className={`toggle--btn`}
                id="toggle--btn-3"
                aria-label="Change date toggle button"
                onClick={(e) => {
                  e.preventDefault();
                  setChangeDate(!changeDate);
                }}
              >
                Change&nbsp;date
              </button>
            )}
          </div>
          {changeDate && (
            <div className="chartForYear--inbulidcalender addappointment--content-month">
              <img
                src={cancelicon}
                className="chartForYear--inbulidcalender--cancelicon"
                aria-label="Cancel date selection button"
                onClick={(e) => {
                  e.preventDefault();
                  setChangeDate(false);
                }}
              ></img>
              <InBuildCalender
                setAppointmentDate={value.setAppointmentDate}
                appointmentDate={value.appointmentDate}
                aria-label="Custom calender component for selecting date of appointment"
              ></InBuildCalender>
              <button
                className="maincontent--right--appsave chartForYear--inbulidcalender--button"
                aria-label="Confirm date selection button"
                onClick={(e) => {
                  e.preventDefault();
                  setChangeDate(false);
                }}
              >
                Confirm
              </button>
            </div>
          )}
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

    <div className="appointmentblock" aria-label="Add Appointment Form">
      <div
        className={`addappointment--content ${
          !value.contentBlockDate && "addappointment--content-month"
        }`}
        aria-label="Update Appointment Content"
      >
        {patchTitle()}
        {patchEditModal()}
        {patchEditModalValue()}
      </div>
    </div>
  );
}
