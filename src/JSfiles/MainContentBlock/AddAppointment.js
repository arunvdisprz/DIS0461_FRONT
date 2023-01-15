import React, { useState } from "react";
import Timepicker from "../TimePicker/TimePicker";
import ColourPicker from "../ColourPicker/ColourPicker.js";
import Moment from "moment";
import cancelicon from "../pictures/cancelicon.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import personicon from "../pictures/personicon.png";
import todayicon from "../pictures/todayicon.png";
import paletteicon from "../pictures/paletteicon.png";
import notesicon from "../pictures/notesicon.png";
import addlocationicon from "../pictures/addlocationicon.png";
import Select from "react-select";
import multipleventicon from "../pictures/multipleventicon.png";
import { Form } from "react-router-dom";

export default function AddAppointment() {
  const value = useContext(Requiredvalue);
  var plusonehour = new Date();
  plusonehour.setHours(plusonehour.getHours() + 1);

  const appointmentMode = [
    { value: "Today", label: "Today" },
    { value: "For Week", label: "For Week" },
    { value: "For Month", label: "For Month" },
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
      <div className="appointmentbar--content">
        <div className="calenderbar--right--cancelbar">
          <h2>Add appointment</h2>
          <img
            src={cancelicon}
            className="calenderbar--right--cancelicon"
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
          <div className="calenderbar--right--appointmentblock">
            <div className="calenderbar--right--apptheme">
              <input
                type="text"
                className="calenderbar--right--appthemeinput"
                placeholder=""
                onChange={(e) => value.setappointmentcontent(e.target.value)}
                autoFocus
                required
              ></input>
              <label>Title</label>
            </div>
          </div>
          <Timepicker></Timepicker>
          <div className="Addappointmentbar--icontext ">
            <img
              src={multipleventicon}
              className="Addappointmentbar--icon"
            ></img>
            <div className="Addappointmentbar--text ">
              <Select
                options={appointmentMode}
                placeholder="Today"
                onChange={(e) => setMode(e.value)}
              ></Select>
            </div>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img src={personicon} className="Addappointmentbar--icon"></img>
            <div className="Addappointmentbar--text ">
              {value.name == "null" ? "-" : value.name.toUpperCase()}
            </div>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img src={todayicon} className="Addappointmentbar--icon"></img>
            <div className="Addappointmentbar--text ">
              {Moment(value.appointmentDate).format("Do MMM  YYYY")}
            </div>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img src={notesicon} className="Addappointmentbar--icon"></img>
            <input
              type="text"
              className="appointmentbar--location"
              onChange={(e) => value.setDescription(e.target.value)}
              placeholder=" Add Description"
            ></input>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img
              src={addlocationicon}
              className="Addappointmentbar--icon"
            ></img>
            <input
              type="text"
              className="appointmentbar--location"
              onChange={(e) => value.setLocation(e.target.value)}
              placeholder=" Add Location"
            ></input>
          </div>
          <div className="Addappointmentbar--icontext ">
            <img src={paletteicon} className="Addappointmentbar--icon"></img>
            <ColourPicker></ColourPicker>
          </div>
          <div className="calenderbar--right--appsavebar">
            <button className="calenderbar--right--appsave" type="submit">
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
