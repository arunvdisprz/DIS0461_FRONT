import React, { useState, useEffect } from "react";
import "./TimePicker.scss";
import Moment from "moment";
import convertTime from "convert-time";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import scheduleicon from "../pictures/scheduleicon.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function Timepicker() {
  const value = useContext(Requiredvalue);

  // The component then uses the "useState" hook to initialize and update the state of
  // "starthour", "startmeridiem", "endhour", and "endmeridiem" based on the "value" object passed in through the context.
  const [starthour, setstarthour] = useState(
    Moment(value.startTimeValue, "hh:mm").format("h:mm")
  );
  const [startmeridiem, setstartmeridiem] = useState(
    convertTime(value.startTimeValue, "A")
  );
  const [endhour, setendhour] = useState(
    Moment(value.endTimeValue, "hh:mm").format("h:mm")
  );
  const [endmeridiem, setendmeridiem] = useState(
    convertTime(value.endTimeValue, "A")
  );

  // The component also uses the "useEffect" hook to update the "startTime" and "endTime" properties of the "value" object,
  //As well as the "patchStartTime" and "patchEndTime" properties, whenever the state of "starthour", "startmeridiem", "endhour", and "endmeridiem" changes.
  useEffect(() => {
    value.setStartTime(
      Moment(starthour + " " + startmeridiem, "hh:mm A").format("HH:mm")
    );
    value.setEndTime(
      Moment(endhour + " " + endmeridiem, "hh:mm A").format("HH:mm")
    );
    value.setPatchStartTime(
      Moment(starthour + " " + startmeridiem, "hh:mm A").format("HH:mm")
    );
    value.setPatchEndTime(
      Moment(endhour + " " + endmeridiem, "hh:mm A").format("HH:mm")
    );
  }, [starthour, startmeridiem, endhour, endmeridiem]);

  const options = [
    { value: "12:00", label: "12:00" },
    { value: "12:15", label: "12:15" },
    { value: "12:30", label: "12:30" },
    { value: "12:45", label: "12:45" },
    { value: "1:00 ", label: "1:00" },
    { value: "1:15 ", label: "1:15" },
    { value: "1:30 ", label: "1:30 " },
    { value: "1:45 ", label: "1:45 " },
    { value: "2:00 ", label: "2:00 " },
    { value: "2:15 ", label: "2:15 " },
    { value: "2:30 ", label: "2:30 " },
    { value: "2:45 ", label: "2:45 " },
    { value: "3:00 ", label: "3:00 " },
    { value: "3:15 ", label: "3:15 " },
    { value: "3:30 ", label: "3:30 " },
    { value: "3:45 ", label: "3:45 " },
    { value: "4:00 ", label: "4:00 " },
    { value: "4:15 ", label: "4:15 " },
    { value: "4:30 ", label: "4:30 " },
    { value: "4:45 ", label: "4:45 " },
    { value: "5:00 ", label: "5:00 " },
    { value: "5:15 ", label: "5:15 " },
    { value: "5:30 ", label: "5:30 " },
    { value: "5:45 ", label: "5:45 " },
    { value: "6:00 ", label: "6:00 " },
    { value: "6:15 ", label: "6:15 " },
    { value: "6:30 ", label: "6:30 " },
    { value: "6:45 ", label: "6:45 " },
    { value: "7:00 ", label: "7:00 " },
    { value: "7:15 ", label: "7:15 " },
    { value: "7:30 ", label: "7:30 " },
    { value: "7:45 ", label: "7:45 " },
    { value: "8:00 ", label: "8:00 " },
    { value: "8:15 ", label: "8:15 " },
    { value: "8:30 ", label: "8:30 " },
    { value: "8:45 ", label: "8:45 " },
    { value: "9:00 ", label: "9:00 " },
    { value: "9:15 ", label: "9:15 " },
    { value: "9:30 ", label: "9:30 " },
    { value: "9:45 ", label: "9:45 " },
    { value: "10:00", label: "10:00 " },
    { value: "10:15", label: "10:15 " },
    { value: "10:30", label: "10:30 " },
    { value: "10:45", label: "10:45 " },
    { value: "11:00", label: "11:00 " },
    { value: "11:15", label: "11:15 " },
    { value: "11:30", label: "11:30 " },
    { value: "11:45", label: "11:45 " },
  ];
  const meridiemoptions = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];
  return (
    <div className="timepickerbarblock " aria-label="Time picker">
      {/* This component allows users to select a start and end time using two dropdown lists - one for the hour and one for the meridiem.
         The selected values are then used to update the corresponding properties of the "value" object passed in through the context. */}
      <div className="timepicker--grid--icon" aria-label="Schedule icon">
        <img
          src={scheduleicon}
          className="timepicker--icon"
          alt="Schedule icon"
        ></img>
      </div>
      <div style={{display:"flex"}}>
        <div className="timepickerbar--inside" aria-label="Start time">
          <div className="timepicker--hoursbar" aria-label="Start time hour">
            <CreatableSelect
              options={options}
              value={{ value: starthour, label: starthour }}
              onChange={(e) => setstarthour(e.value)}
              aria-label="Start time hour"
            />
          </div>
          <div
            className="timepicker--meridiembar"
            aria-label="Start time meridiem"
          >
            <Select
              options={meridiemoptions}
              value={{ value: startmeridiem, label: startmeridiem }}
              onChange={(e) => setstartmeridiem(e.value)}
              aria-label="Start time meridiem"
            />
          </div>
        </div>
        <div className="timepicker--grid--hypen" aria-label="Schedule icon">
          -
        </div>
        <div className="timepickerbar--inside" aria-label="End time">
          <div className="timepicker--hoursbar" aria-label="End time hour">
            <CreatableSelect
              options={options}
              value={{ value: endhour, label: endhour }}
              onChange={(e) => setendhour(e.value)}
              aria-label="End time hour"
            />
          </div>
          <div
            className="timepicker--meridiembar "
            aria-label="End time meridiem"
          >
            <Select
              options={meridiemoptions}
              value={{ value: endmeridiem, label: endmeridiem }}
              onChange={(e) => setendmeridiem(e.value)}
              aria-label="End time meridiem"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
