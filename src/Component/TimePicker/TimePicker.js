import React, { useState, useEffect } from "react";
import "./TimePicker.scss";
import Moment from "moment";
import convertTime from "convert-time";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import scheduleicon from "../Assets/scheduleicon.png";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import {optionForTime} from "../Datafile"
import {meridiemOptions} from "../Datafile"
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
              options={optionForTime}
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
              options={meridiemOptions}
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
              options={optionForTime}
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
              options={meridiemOptions}
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
