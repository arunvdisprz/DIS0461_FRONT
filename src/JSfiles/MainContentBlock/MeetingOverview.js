import React, { useState } from "react";
import todayicon from "../pictures/todayicon.png";
import allappointmenticon from "../pictures/allappointmenticon.png";
import appointmentweekicon from "../pictures/appointmentweekicon.png";
import appointmentmonthicon from "../pictures/appointmentmonthicon.png";
import appointmentdaterangeicon from "../pictures/appointmentdaterangeicon.png";
import Moment from "moment";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";

export default function MeetingOverview() {
  const value = useContext(Requiredvalue);
  var pendingAppointment = 0;
  var upcomingAppointment = 0;
  value.allAppointment
    .filter((person) => person.appointmentStatus == false)
    .map(() => pendingAppointment++);

  value.allAppointment
    .filter(
      (person) =>
        person.appointmentStartTime >
        Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
    )
    .map(() => upcomingAppointment++);

  return (
    <div className="meetingoverview--block">
      <div className="meetingoverview--right--calendertitle">
        Meeting overview
      </div>
      <div className="meetingoverview--status">
        <div className="meetingoverview--status--card blueb">
          <div className="meetingoverview--status--iconsize--div blue">
            <img
              src={allappointmenticon}
              className="meetingoverview--status--iconsize"
            ></img>
          </div>
          <div> All appointments</div>
          <div className="meetingoverview--status--number">
            {value.allAppointment.length}
          </div>
        </div>
        <div className="meetingoverview--status--card darkblueb">
          <div className="meetingoverview--status--iconsize--div darkblue">
            <img
              src={todayicon}
              className="meetingoverview--status--iconsize"
            ></img>
          </div>
          {Moment(value.appointmentDate).format("DD-MM-yyyy")}
          <div>Appointments</div>
          <div className="meetingoverview--status--number">
            {value.data.length}
          </div>
        </div>
        <div className="meetingoverview--status--card redb">
          <div className="meetingoverview--status--iconsize--div red">
            <img
              src={appointmentweekicon}
              className="meetingoverview--status--iconsize"
            ></img>
          </div>
          <div> week</div>
          <div className="meetingoverview--status--number">1</div>
        </div>
        <div className="meetingoverview--status--card orangeb">
          <div className="meetingoverview--status--iconsize--div orange">
            <img
              src={appointmentmonthicon}
              className="meetingoverview--status--iconsize"
            ></img>
          </div>
          <div> Month</div>
          <div className="meetingoverview--status--number">7</div>
        </div>
        <div className="meetingoverview--status--card greenb">
          <div className="meetingoverview--status--iconsize--div green">
            <img
              src={appointmentdaterangeicon}
              className="meetingoverview--status--iconsize"
            ></img>
          </div>
          <div>date range</div>
          <div className="meetingoverview--status--number">0</div>
        </div>
      </div>
      <div className="meetingoverview--upcoming--block">
        <div>
          <div className="meetingoverview--right--calendertitle">
            Upcoming appointments {upcomingAppointment}
          </div>
          <div className="meetingoverview--upcoming">
            {value.allAppointment
              .filter(
                (person) =>
                  person.appointmentStartTime >
                  Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
              )
              .map((appointment) => (
                <div className="meetingoverview--card">
                  starts in
                  <div
                    className="createblock--upcoming--content--color"
                    style={{ backgroundColor: appointment.color }}
                  ></div>
                  <div>
                    <div className="createblock--upcoming--content--date">
                      {Moment(appointment.appointmentDate).format(
                        "ddd, MMM DD"
                      )}
                    </div>
                    <div className="meetingoverview--upcoming--content--title">
                      {appointment.appointmentContent
                        ? appointment.appointmentContent
                        : "no title"}
                    </div>

                    <div className="createblock--upcoming--content--time">
                      {Moment(appointment.appointmentStartTime).format("h:mmA")}
                      -{Moment(appointment.appointmentEndTime).format("h:mmA")}
                    </div>
                  </div>
                  {/* <div>{appointment.appointmentStartTime.getDay()}</div> */}
                </div>
              ))}
          </div>
        </div>
        <div>
          <div className="meetingoverview--right--calendertitle">
            Missed appointments {pendingAppointment}
          </div>
          <div className="meetingoverview--upcoming--block">
            <div className="meetingoverview--upcoming">
              {value.allAppointment
                .filter((person) => person.appointmentStatus == false)
                .map((appointment) => (
                  <div className="meetingoverview--card">
                    starts in
                    <div
                      className="createblock--upcoming--content--color"
                      style={{ backgroundColor: appointment.color }}
                    ></div>
                    <div>
                      <div className="createblock--upcoming--content--date">
                        {Moment(appointment.appointmentDate).format(
                          "ddd, MMM DD"
                        )}
                      </div>
                      <div className="createblock--upcoming--content--title">
                        {appointment.appointmentContent
                          ? appointment.appointmentContent
                          : "no title"}
                      </div>

                      <div className="meetingoverview--upcoming--content--title">
                        {Moment(appointment.appointmentStartTime).format(
                          "h:mmA"
                        )}
                        -
                        {Moment(appointment.appointmentEndTime).format("h:mmA")}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="meetingoverview--right--calendertitle">
            Statistics
          </div>
        </div>
      </div>
    </div>
  );
}
