import React from "react";
import todayapp from "../pictures/today.png";
import allapp from "../pictures/allapp.png";
import rescheduled from "../pictures/rescheduled.png";
import schedule from "../pictures/schedule.png";
import cancelled from "../pictures/cancelled.png";
import Moment from "moment";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function MeetingOverview() {
  const value = useContext(Requiredvalue);
  return (
    <div className="meetingoverview--block">
      <div className="meetingoverview--right--calendertitle">
        Meeting overview
      </div>
      <div className="meetingoverview--status">
        <div className="meetingoverview--status--card">
          <img
            src={todayapp}
            className="meetingoverview--status--iconsize"
          ></img>
          <div>Appointments</div>
          <div className="meetingoverview--status--number">
            {value.data.length}
          </div>
        </div>
        <div className="meetingoverview--status--card">
          <img src={allapp} className="meetingoverview--status--iconsize"></img>
          <div> All appointments</div>
          <div className="meetingoverview--status--number">
            {value. allAppointment.length}
          </div>
        </div>
        <div className="meetingoverview--status--card">
          <img
            src={rescheduled}
            className="meetingoverview--status--iconsize"
          ></img>
          <div> Rescheduled</div>
          <div className="meetingoverview--status--number">1</div>
        </div>
        <div className="meetingoverview--status--card">
          <img
            src={schedule}
            className="meetingoverview--status--iconsize"
          ></img>
          <div> Attened</div>
          <div className="meetingoverview--status--number">7</div>
        </div>
        <div className="meetingoverview--status--card">
          <img
            src={cancelled}
            className="meetingoverview--status--iconsize"
          ></img>
          <div> cancelled</div>
          <div className="meetingoverview--status--number">0</div>
        </div>
      </div>
      <div className="meetingoverview--right--calendertitle">
        Upcoming appointments
      </div>
      <div className="meetingoverview--upcoming--block">
        <div className="meetingoverview--upcoming">
          {value. allAppointment
            .filter(
              (person) =>
                person.appointmentStartTime >
                Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
            )
            .map((appointment) => (
              <div className="meetingoverview--card">
                <div
                  className="createblock--upcoming--content--color"
                  style={{ backgroundColor: appointment.color }}
                ></div>
                <div>
                  <div className="createblock--upcoming--content--date">
                    {Moment(appointment.appointmentDate).format("ddd, MMM DD")}
                  </div>
                  <div className="createblock--upcoming--content--title">
                    {appointment.appointmentContent
                      ? appointment.appointmentContent
                      : "no title"}
                  </div>
                  <div className="createblock--upcoming--content--time">
                    {Moment(appointment.appointmentStartTime).format("h:mmA")}-
                    {Moment(appointment.appointmentEndTime).format("h:mmA")}
                  </div>
                </div>

                {/* <div>{appointment.appointmentStartTime.getDay()}</div> */}
              </div>
            ))}
        </div>
      </div>

      <div className="meetingoverview--right--calendertitle">Tasks</div>
      <div className="meetingoverview--right--task">
        <div>No Tasks</div>
      </div>
    </div>
  );
}


