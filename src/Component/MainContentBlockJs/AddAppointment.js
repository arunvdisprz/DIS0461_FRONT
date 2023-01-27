import React, { useState } from "react";
import Timepicker from "../TimePicker/TimePicker";
import ColourPicker from "../ColourPicker/ColourPicker.js";
import Moment from "moment";
import cancelicon from "../Assets/cancelicon.png";
import todayicon from "../Assets/todayicon.png";
import paletteicon from "../Assets/paletteicon.png";
import notesicon from "../Assets/notesicon.png";
import addlocationicon from "../Assets/addlocationicon.png";
import Select from "react-select";
import multipleventicon from "../Assets/multipleventicon.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import { appointmentMode } from "../Datafile";

export default function AddAppointment() {
  //It also uses the useContext hook to access the context object 'Requiredvalue' which is being used to store the appointment date, location, and description.
  const value = useContext(Requiredvalue);
  let plusonehour = new Date();
  plusonehour.setHours(plusonehour.getHours() + 1);

  let selectedDate = value.appointmentDate;

  const [mode, setMode] = useState("Create an appointment only for this day");

  //It has a form that allows the user to input details for the appointment, such as the title, location, and description.
  //It also uses the "appointmentLoop" function, which depending
  //On the mode selected by the user, creates an appointment for that day, for the following days in the week, or for the following days in the month.
  const appointmentLoop = (val) => {
    {
      mode === "Create an appointment only for this day" &&
        value.appointmentPost();
    }
    {
      mode === "Create appointments for the following days in the week" &&
        Array.from({ length: 7 - val }).map((_, index) => {
          value.appointmentPost(
            Moment(selectedDate, "yyyy-MM-DDT")
              .add(index, "days")
              .format("yyyy-MM-DDT")
          );
        });
    }
  };

  // function setDateForAppointment which is called when the user submits the form to create the appointment.
  // It prevents the default behavior of the form, calls the appointmentLoop function and sets the location and description to an empty string.
  const setDateForAppointment = (e) => {
    e.preventDefault();
    appointmentLoop(Moment(selectedDate).day());
    value.setAppointmentValue(!value.appointmentValue);
    value.setAppointmentContent(" ");
  };

  //The component uses the onClick event to call the "setAppointmentValue" function from the value context and pass the opposite of the current value of the "appointmentValue" state as an argument.
  //This function will toggle the visibility of the "Add Appointment" section.
  //The component is using the aria-label "Cancel Appointment" to provide accessibility information for the cancel icon.
  const AddAppointmentTitle = () => {
    return (
      <div
        className="maincontent--right--cancelbar"
        aria-label="Cancel Appointment"
      >
        <h2>Add appointment</h2>
        <img
          src={cancelicon}
          className="maincontent--right--cancelicon"
          onClick={() => value.setAppointmentValue(!value.appointmentValue)}
          aria-label="Cancel Appointment"
        ></img>
      </div>
    );
  };

  // The component includes an input field for the appointment title that is required, has an autoFocus attribute and calls a function from a value context when the value changes.
  //The component also includes a timepicker component, a select component to select the appointment mode, an input field for the location and description, and a color picker component.
  //The component includes an image of a palette icon that is used to represent the color picker.
  //The component also includes a save button that allows the user to submit the form.
  const AddAppointmentForm = () => {
    return (
      <form
        onSubmit={(e) => setDateForAppointment(e)}
        aria-label="Appointment Form"
      >
        <div
          className="maincontent--right--appointmentblock"
          aria-label="Appointment Title"
        >
          <div className="maincontent--right--apptheme">
            <input
              type="text"
              className="maincontent--right--appthemeinput"
              placeholder=""
              onChange={(e) => value.setAppointmentContent(e.target.value)}
              autoFocus
              required
              aria-label="Appointment Title Input"
            ></input>
            <label aria-label="Appointment Title Label">Title</label>
          </div>
        </div>
        <Timepicker aria-label="Time Picker"></Timepicker>
        <div className="addappointment--icontext ">
          <img
            src={multipleventicon}
            className="addappointment--icon"
            aria-label="Multiple Event Icon"
          ></img>
          <div className="addappointment--text ">
            <Select
              options={appointmentMode}
              value={{
                value: mode,
                label: mode,
              }}
              styles={{ minHeight: "-30px" }}
              onChange={(e) => setMode(e.value)}
              aria-label="Appointment Mode Select"
            ></Select>
          </div>
        </div>
        <div className="addappointment--icontext ">
          <img
            src={todayicon}
            className="addappointment--icon"
            aria-label="Today Icon"
          ></img>
          <div className="addappointment--text ">
            {Moment(value.appointmentDate).format("Do MMM YYYY")}
          </div>
        </div>
        <div className="addappointment--icontext ">
          <img
            src={notesicon}
            className="addappointment--icon"
            aria-label="Notes Icon"
          ></img>
          <input
            type="text"
            className="addappointment--location"
            onChange={(e) => value.setDescription(e.target.value)}
            placeholder=" Add Description"
            aria-label="Appointment Description Input"
          ></input>
        </div>
        <div className="addappointment--icontext ">
          <img
            src={addlocationicon}
            className="addappointment--icon"
            aria-label="Location Icon"
          ></img>
          <input
            type="text"
            className="addappointment--location"
            onChange={(e) => value.setLocation(e.target.value)}
            placeholder=" Add Location"
            aria-label="Appointment Location Input"
          ></input>
        </div>
        <div className="addappointment--icontext ">
          <img
            src={paletteicon}
            className="addappointment--icon"
            aria-label="Palette Icon"
          ></img>
          <ColourPicker
            aria-label="Appointment Color Picker"
            key={"statiss"}
          ></ColourPicker>
        </div>
        <div className="maincontent--right--appsavebar">
          <button
            className="maincontent--right--appsave"
            type="submit"
            aria-label="Save Appointment"
          >
            Save Appointment
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="appointmentblock" aria-label="Add Appointment Form">
      <div
        className={`addappointment--content ${
          !value.contentBlockDate && "addappointment--content-month"
        }`}
        aria-label="Add Appointment Content"
      >
        {AddAppointmentTitle()}
        {AddAppointmentForm()}
      </div>
    </div>
  );
}
