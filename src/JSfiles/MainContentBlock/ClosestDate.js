import React from "react";
import Moment from "moment";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

function ClosestDate() {
  const value = useContext(Requiredvalue);
  return (
    <div>
      {value.allAppointment == null ? "No Appointments" : ""}
      {value.allAppointment
        .filter(
          (person) =>
            person.appointmentStartTime >
            Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
        )
        .map((appointment) => (
          <div
            className="createblock--upcoming--content"
            style={{ borderColor: appointment.color }}
          >
            <div>
              <div>
                <div className="createblock--upcoming--content--time">
                  <span>
                    {Moment(appointment.appointmentDate).format("ddd, MMM DD ")}
                  </span>
                  {Moment(appointment.appointmentStartTime).format("h:mmA")}-
                  {Moment(appointment.appointmentEndTime).format("h:mmA")}
                </div>
                <div className="createblock--upcoming--content--title">
                  {appointment.appointmentContent || "No title"}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ClosestDate;
