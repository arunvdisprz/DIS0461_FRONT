import React from "react";
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

export default function AddAppointment() {
  const value = useContext(Requiredvalue);
  var plusonehour = new Date();
  plusonehour.setHours(plusonehour.getHours() + 1);
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
          <img src={addlocationicon} className="Addappointmentbar--icon"></img>
          <input
            type="text"
            className="appointmentbar--location"
            onChange={(e) => value.setDescription(e.target.value)}
            placeholder=" Add Description"
            required
          ></input>
        </div>
        <div className="Addappointmentbar--icontext ">
          <img src={notesicon} className="Addappointmentbar--icon"></img>
          <input
            type="text"
            className="appointmentbar--location"
            onChange={(e) => value.setLocation(e.target.value)}
            placeholder=" Add Location"
            required
          ></input>
        </div>
        <div className="Addappointmentbar--icontext ">
          <img src={paletteicon} className="Addappointmentbar--icon"></img>
          <ColourPicker></ColourPicker>
        </div>
        <div className="calenderbar--right--appsavebar">
          <button
            onClick={() => {
              value.Postpost();
            }}
            className="calenderbar--right--appsave"
          >
            Save Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
