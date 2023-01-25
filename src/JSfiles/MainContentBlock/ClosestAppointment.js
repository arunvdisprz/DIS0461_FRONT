import React from "react";
import Moment from "moment";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import Countdown from "react-countdown";
import scheduleicon from "../pictures/scheduleicon.png";

export default function ClosestDate() {
  const value = useContext(Requiredvalue);
  const nextAppointment = value.allAppointment.filter(
    (person) =>
      person.appointmentStartTime >
      Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
  );

  return (
    <div aria-label="Upcoming Appointments">
      {/* div with the text "No Appointments" if the allAppointment array is null or empty, and otherwise maps over the array of appointments */}
      {value.allAppointment === null ? "No Appointments" : ""}
      {/* Each appointment div has a class of "createblock--upcoming--content" and an inline style setting its border color to the color of the appointment.
       The div also has an aria-label attribute containing information about the appointment, including the day, start and end time, and the title of the appointment. */}
      {nextAppointment.length !== 0 && (
        <div
          className="meetingoverview--card createblock--upcoming--content"
          style={{ borderLeftColor: nextAppointment[0].color }}
        >
          <div className="meetingoverview--card--starts ">
            <span style={{ color: nextAppointment[0].color }}>
              {nextAppointment[0].appointmentContent}
            </span>
            <span className="meetingoverview--card--count">
              <Countdown
                date={
                  Date.now() +
                  Moment(nextAppointment[0].appointmentStartTime).diff(
                    new Date(),
                    "milliseconds"
                  )
                }
              />
            </span>
          </div>
          <div className="closestappointment">
            <img
              src={scheduleicon}
              className="closestappointment--icon"
              alt="Schedule icon"
            ></img>
            <span
              className="meetingoverview--upcoming--content--date"
              aria-label="Appointment date"
            >
              {Moment(nextAppointment[0].appointmentDate).format("ddd, MMM DD")}
              {"   "}
            </span>
            <span
              className="createblock--upcoming--content--time"
              aria-label="Appointment start and end time"
            >
              {Moment(nextAppointment[0].appointmentStartTime).format("h:mmA")}{" "}
              -{Moment(nextAppointment[0].appointmentEndTime).format("h:mmA")}
            </span>
          </div>
          <div
            className="meetingoverview--upcoming--content--title"
            aria-label="Appointment title"
          >
            {"Location : " + nextAppointment[0].location || "Not Mentioned"}
          </div>
        </div>
      )}
    </div>
  );
}
