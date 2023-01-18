import React, { useState } from "react";
import Timepicker from "../TimePicker/TimePicker";
import ColourPicker from "../ColourPicker/ColourPicker.js";
import Moment from "moment";
import cancelicon from "../pictures/cancelicon.png";
import personicon from "../pictures/personicon.png";
import todayicon from "../pictures/todayicon.png";
import paletteicon from "../pictures/paletteicon.png";
import notesicon from "../pictures/notesicon.png";
import addlocationicon from "../pictures/addlocationicon.png";
import Select from "react-select";
import multipleventicon from "../pictures/multipleventicon.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function AddAppointment() {
  const value = useContext(Requiredvalue);
  var plusonehour = new Date();
  plusonehour.setHours(plusonehour.getHours() + 1);

  const appointmentMode = [
    { value: "Today", label: "Create an appointment only for this day" },
    { value: "For Week", label: "Create appointments for the following days in the week" },
    { value: "For Month", label: "Create appointments for the following days in the month" },
  ];

  var selectedDate = value.appointmentDate;

  const [mode, setMode] = useState("Today");

  const appointmentLoop = (val) => {
    {
      mode == "Today" && value.Postpost();
    }
    {
      mode == "For Week" &&
        Array.from({ length: 7 - val }).map((_, index) => {
          value.Postpost(
            Moment(selectedDate, "yyyy-MM-DDT")
              .add(index, "days")
              .format("yyyy-MM-DDT")
          );
        });
    }
    {
      mode == "For Month" &&
        Array.from({
          length:
            Moment(selectedDate, "YYYY-MM").daysInMonth() -
            Moment(selectedDate).format("D") +
            1,
        }).map((_, index) => {
          value.Postpost(
            Moment(selectedDate, "yyyy-MM-DDT")
              .add(index, "days")
              .format("yyyy-MM-DDT")
          );
        });
    }
  };

  return (
    <div className="appointmentblock">
      <div
        className={`addappointment--content ${
          value.contentBlockMonth && "addappointment--content-month"
        }`}
      >
        <div className="maincontent--right--cancelbar">
          <h2>Add appointment</h2>
          <img
            src={cancelicon}
            className="maincontent--right--cancelicon"
            onClick={() => value.setAppointmentValue(!value.appointmentValue)}
          ></img>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            appointmentLoop(Moment(selectedDate).day());
            value.setLocation("");
            value.setDescription("");
          }}
        >
          <div className="maincontent--right--appointmentblock">
            <div className="maincontent--right--apptheme">
              <input
                type="text"
                className="maincontent--right--appthemeinput"
                placeholder=""
                onChange={(e) => value.setAppointmentContent(e.target.value)}
                autoFocus
                required
              ></input>
              <label>Title</label>
            </div>
          </div>
          <Timepicker></Timepicker>
          <div className="addappointment--icontext ">
            <img src={multipleventicon} className="addappointment--icon"></img>
            <div className="addappointment--text ">
              <Select
                options={appointmentMode}
                placeholder="Create an appointment only for this day"
                styles={{ minHeight: "-30px" }}
                onChange={(e) => setMode(e.value)}
              ></Select>
            </div>
          </div>
          <div className="addappointment--icontext ">
            <img src={todayicon} className="addappointment--icon"></img>
            <div className="addappointment--text ">
              {Moment(value.appointmentDate).format("Do MMM  YYYY")}
            </div>
          </div>
          <div className="addappointment--icontext ">
            <img src={notesicon} className="addappointment--icon"></img>
            <input
              type="text"
              className="addappointment--location"
              onChange={(e) => value.setDescription(e.target.value)}
              placeholder=" Add Description"
            ></input>
          </div>
          <div className="addappointment--icontext ">
            <img src={addlocationicon} className="addappointment--icon"></img>
            <input
              type="text"
              className="addappointment--location"
              onChange={(e) => value.setLocation(e.target.value)}
              placeholder=" Add Location"
            ></input>
          </div>
          <div className="addappointment--icontext ">
            <img src={paletteicon} className="addappointment--icon"></img>
            <ColourPicker></ColourPicker>
          </div>
          <div className="maincontent--right--appsavebar">
            <button className="maincontent--right--appsave" type="submit">
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
