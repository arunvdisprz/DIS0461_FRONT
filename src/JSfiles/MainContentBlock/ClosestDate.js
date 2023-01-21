import React from "react";
import Moment from "moment";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function ClosestDate() {
  const value = useContext(Requiredvalue);
  return (
    <div aria-label="Upcoming Appointments">
      {/* div with the text "No Appointments" if the allAppointment array is null or empty, and otherwise maps over the array of appointments */}
      {value.allAppointment == null ? "No Appointments" : ""}
      {/* Each appointment div has a class of "createblock--upcoming--content" and an inline style setting its border color to the color of the appointment.
       The div also has an aria-label attribute containing information about the appointment, including the day, start and end time, and the title of the appointment. */}
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
            aria-label={`Appointment with ${
              appointment.appointmentContent
            } on ${Moment(appointment.appointmentDate).format(
              "ddd, MMM DD "
            )} from ${Moment(appointment.appointmentStartTime).format(
              "h:mmA"
            )} to ${Moment(appointment.appointmentEndTime).format("h:mmA")}`}
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
                  {/* displays the title of the appointment. The title is truncated to 40 characters with "..." if it is longer than 40 characters. */}
                  {appointment.appointmentContent.length < 40
                    ? appointment.appointmentContent
                    : appointment.appointmentContent.slice(0, 37) + "..."}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
