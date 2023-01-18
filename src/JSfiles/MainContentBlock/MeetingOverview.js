import React from "react";

import todayicon from "../pictures/todayicon.png";
import allappointmenticon from "../pictures/allappointmenticon.png";
import appointmentweekicon from "../pictures/appointmentweekicon.png";
import appointmentmonthicon from "../pictures/appointmentmonthicon.png";
import appointmentdaterangeicon from "../pictures/appointmentdaterangeicon.png";
import Moment from "moment";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import noresult from "../pictures/noresult.jpg";
import nocollection from "../pictures/nocollection.jpg";
import Countdown from "react-countdown";

export default function MeetingOverview() {
  // var myDiv = document.querySelector("div#my-div");
  // var leftButton = document.querySelector("button#left-button");
  // var rightButton = document.querySelector("button#right-button");
  // leftButton.addEventListener("click", scrollLeft);
  // rightButton.addEventListener("click", scrollRight);
  // function scrollLeft() {
  //   myDiv.scrollLeft -= 50;
  // }

  // function scrollRight() {
  //   myDiv.scrollLeft += 50;
  // }
  const value = useContext(Requiredvalue);

  var selectedDate = value.appointmentDate;
  var weeklyDay = Moment(selectedDate).day();
  var monthlyNumberDay = Moment(selectedDate).daysInMonth() - 1;
  var monthlyDay = Moment(selectedDate).format("DD") - 1;
  var yearlyDay = Moment(selectedDate).format("DDD") - 1;

  var weeklyAppointments = 0;
  var monthlyAppointments = 0;
  var yearlyAppointments = 0;
  var pendingAppointment = 0;
  var upcomingAppointment = 0;

  value.allAppointment
    .filter(
      (appointment) =>
        Moment(appointment.appointmentDate).format("yyyy-MM-DDT") >=
          Moment(selectedDate)
            .subtract(weeklyDay, "days")
            .format("yyyy-MM-DDT") &&
        Moment(appointment.appointmentDate).format("yyyy-MM-DDT") <=
          Moment(selectedDate)
            .add(6 - weeklyDay, "days")
            .format("yyyy-MM-DDT")
    )
    .map(() => weeklyAppointments++);

  value.allAppointment
    .filter(
      (appointment) =>
        Moment(appointment.appointmentDate).format("yyyy-MM-DDT") >=
          Moment(selectedDate)
            .subtract(monthlyDay, "days")
            .format("yyyy-MM-DDT") &&
        Moment(appointment.appointmentDate).format("yyyy-MM-DDT") <=
          Moment(selectedDate)
            .add(monthlyNumberDay - monthlyDay, "days")
            .format("yyyy-MM-DDT")
    )
    .map(() => monthlyAppointments++);

  value.allAppointment
    .filter(
      (appointment) =>
        Moment(appointment.appointmentDate).format("yyyy-MM-DDT") >=
          Moment(selectedDate)
            .subtract(yearlyDay, "days")
            .format("yyyy-MM-DDT") &&
        Moment(appointment.appointmentDate).format("yyyy-MM-DDT") <=
          Moment(selectedDate)
            .add(364 - yearlyDay, "days")
            .format("yyyy-MM-DDT")
    )
    .map(() => yearlyAppointments++);

  value.allAppointment
    .filter(
      (person) =>
        person.appointmentStatus == false &&
        person.appointmentStartTime <
          Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
    )
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
          <div className="meetingoverview--status--title">
            {" "}
            All appointments
          </div>
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
          <div className="meetingoverview--status--title">
            {" "}
            {Moment(value.appointmentDate).format("ddd,MMM DD")} Appointments
          </div>
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
          <div className="meetingoverview--status--title">
            Weekly appointments
          </div>
          <div className="meetingoverview--status--number">
            {weeklyAppointments}
          </div>
        </div>
        <div className="meetingoverview--status--card orangeb">
          <div className="meetingoverview--status--iconsize--div orange">
            <img
              src={appointmentmonthicon}
              className="meetingoverview--status--iconsize"
            ></img>
          </div>
          <div className="meetingoverview--status--title">
            Monthly appointments
          </div>
          <div className="meetingoverview--status--number">
            {monthlyAppointments}
          </div>
        </div>
        <div className="meetingoverview--status--card greenb">
          <div className="meetingoverview--status--iconsize--div green">
            <img
              src={appointmentdaterangeicon}
              className="meetingoverview--status--iconsize"
            ></img>
          </div>
          <div className="meetingoverview--status--title">
            Yearly appointments
          </div>
          <div className="meetingoverview--status--number">
            {yearlyAppointments}
          </div>
        </div>
      </div>
      <div>
        <div className="meetingoverview--right--calendertitle">
          Upcoming appointments{" "}
          <div className="createblock--upcoming--number">
            {upcomingAppointment}
          </div>
        </div>
        {/* <div id="my-div">
          <button id="left-button">Left</button>
          <button id="right-button">Right</button>
        </div> */}
        <div  className="meetingoverview--upcoming">
          {upcomingAppointment == 0 && (
            <img
              src={nocollection}
              className="createblock--upcoming--image meetingoverview--upcoming--image "
            ></img>
          )}
          {value.allAppointment
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
                <div className="meetingoverview--card--starts ">
                  Starts In&nbsp;&nbsp;&nbsp;
                  <span className="meetingoverview--card--count">
                    <Countdown
                      date={
                        Date.now() +
                        Moment(appointment.appointmentStartTime).diff(
                          new Date(),
                          "milliseconds"
                        )
                      }
                    />
                  </span>
                </div>
                <div>
                  <div className="meetingoverview--upcoming--content--date">
                    {Moment(appointment.appointmentDate).format("ddd, MMM DD")}
                  </div>
                  <div className="createblock--upcoming--content--time">
                    {Moment(appointment.appointmentStartTime).format("h:mmA")}-
                    {Moment(appointment.appointmentEndTime).format("h:mmA")}
                  </div>
                  <div className="meetingoverview--upcoming--content--title">
                    {appointment.appointmentContent.length < 25
                      ? appointment.appointmentContent
                      : appointment.appointmentContent.slice(0, 22) + "..."}
                  </div>
                  {appointment.location && "(In " + appointment.location + ")"}
                  <div>{appointment.description}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="meetingoverview--right--calendertitle">
          Missed appointments{" "}
          <div className="createblock--upcoming--number">
            {pendingAppointment}
          </div>
        </div>
        <div className="meetingoverview--upcoming--block">
          <div className="meetingoverview--upcoming">
            {pendingAppointment == 0 && (
              <img
                src={noresult}
                className="createblock--upcoming--image meetingoverview--upcoming--image"
              ></img>
            )}
            {value.allAppointment
              .filter(
                (person) =>
                  person.appointmentStatus == false &&
                  person.appointmentStartTime <
                    Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
              )
              .map((appointment) => (
                <div className="meetingoverview--card">
                  <div
                    className="createblock--upcoming--content--color"
                    style={{ backgroundColor: appointment.color }}
                  ></div>
                  <div>
                    <div className="meetingoverview--upcoming--content--date missed">
                      {Moment(appointment.appointmentDate).format(
                        "ddd, MMM DD"
                      )}
                    </div>
                    <div className="createblock--upcoming--content--time">
                      {Moment(appointment.appointmentStartTime).format("h:mmA")}
                      -{Moment(appointment.appointmentEndTime).format("h:mmA")}
                    </div>
                    <div className="meetingoverview--upcoming--content--title">
                      {appointment.appointmentContent.length < 25
                        ? appointment.appointmentContent
                        : appointment.appointmentContent.slice(0, 22) + "..."}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
