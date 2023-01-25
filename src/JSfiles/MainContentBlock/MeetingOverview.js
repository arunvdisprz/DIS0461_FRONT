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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import scheduleicon from "../pictures/scheduleicon.png";
import { Navigation } from "swiper";

export default function MeetingOverview() {
  const value = useContext(Requiredvalue);

  // initializing several variables that will be used to calculate the number of appointments for various time periods.
  // These include: "selectedDate", which is the currently selected date in the calendar "weeklyDay",
  // which is the day of the week for the selected date; "monthlyNumberDay" and "monthlyDay",
  var selectedDate = value.appointmentDate;
  var weeklyDay = Moment(selectedDate).day();
  var monthlyNumberDay = Moment(selectedDate).daysInMonth() - 1;
  var monthlyDay = Moment(selectedDate).format("DD") - 1;
  var yearlyDay = Moment(selectedDate).format("DDD") - 1;

  // which are used to calculate the number of appointments for the current month; and "yearlyDay" and "yearlyAppointments"
  // which are used to calculate the number of appointments for the current year.
  var weeklyAppointments = 0;
  var monthlyAppointments = 0;
  var yearlyAppointments = 0;
  var pendingAppointment = 0;
  var upcomingAppointment = 0;

  // "filter" method to filter the "allAppointment" array from the "Requiredvalue" context object and count the number of appointments that fall within each time period.
  //These counts are stored in variables such as "weeklyAppointments", "monthlyAppointments", and "yearlyAppointments".
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
        person.appointmentStatus === false &&
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

  // const { height, width } = useWindowDimensions();

  console.log(window.innerWidth);

  const appointmentOverview = () => {
    return (
      <div
        className="meetingoverview--status"
        aria-label="Meeting statistics section"
      >
        <div
          className="meetingoverview--status--card blueb"
          aria-label="All appointments count"
        >
          <div
            className="meetingoverview--status--iconsize--div blue"
            aria-label="All appointments icon"
          >
            <img
              src={allappointmenticon}
              className="meetingoverview--status--iconsize"
              alt="All appointments icon"
            ></img>
          </div>
          <div
            className="meetingoverview--status--title"
            aria-label="All appointments title"
          >
            {" "}
            All appointments
          </div>
          <div
            className="meetingoverview--status--number"
            aria-label="All appointments number"
          >
            {value.allAppointment.length}
          </div>
        </div>
        <div
          className="meetingoverview--status--card darkblueb"
          aria-label="Today'sappointments count"
        >
          <div
            className="meetingoverview--status--iconsize--div darkblue"
            aria-label="Today's appointments icon"
          >
            <img
              src={todayicon}
              className="meetingoverview--status--iconsize"
              alt="Today's appointments icon"
            ></img>
          </div>
          <div
            className="meetingoverview--status--title"
            aria-label="Today's appointments title"
          >
            {" "}
            {Moment(value.appointmentDate).format("ddd,MMM DD")} Appointments
          </div>
          <div
            className="meetingoverview--status--number"
            aria-label="Today's appointments number"
          >
            {value.data.length}
          </div>
        </div>
        <div
          className="meetingoverview--status--card redb"
          aria-label="Weekly appointments count"
        >
          <div
            className="meetingoverview--status--iconsize--div red"
            aria-label="Weekly appointments icon"
          >
            <img
              src={appointmentweekicon}
              className="meetingoverview--status--iconsize"
              alt="Weekly appointments icon"
            ></img>
          </div>
          <div
            className="meetingoverview--status--title"
            aria-label="Weekly appointments title"
          >
            Weekly appointments
          </div>
          <div
            className="meetingoverview--status--number"
            aria-label="Weekly appointments number"
          >
            {weeklyAppointments}
          </div>
        </div>
        <div
          className="meetingoverview--status--card orangeb"
          aria-label="Monthly appointments count"
        >
          <div
            className="meetingoverview--status--iconsize--div orange"
            aria-label="Monthly appointments icon"
          >
            <img
              src={appointmentmonthicon}
              className="meetingoverview--status--iconsize"
              alt="Monthly appointments icon"
            ></img>
          </div>
          <div
            className="meetingoverview--status--title"
            aria-label="Monthly appointments title"
          >
            Monthly appointments
          </div>
          <div
            className="meetingoverview--status--number"
            aria-label="Monthly appointments number"
          >
            {monthlyAppointments}
          </div>
        </div>
        <div
          className="meetingoverview--status--card greenb"
          aria-label="Yearly appointments count"
        >
          <div
            className="meetingoverview--status--iconsize--div green"
            aria-label="Yearly appointments icon"
          >
            <img
              src={appointmentdaterangeicon}
              className="meetingoverview--status--iconsize"
              alt="Yearly appointments icon"
            ></img>
          </div>
          <div
            className="meetingoverview--status--title"
            aria-label="Yearly appointments title"
          >
            Yearly appointments
          </div>
          <div
            className="meetingoverview--status--number"
            aria-label="Yearly appointments number"
          >
            {yearlyAppointments}
          </div>
        </div>
      </div>
    );
  };
  const upcomingAppointmentBlock = () => {
    return (
      <div aria-label="Upcoming appointments section">
        <div
          className="meetingoverview--right--calendertitle"
          aria-label="Upcoming appointments title"
        >
          Upcoming appointments{" "}
          <div
            className="createblock--upcoming--number"
            aria-label="Upcoming appointments count"
          >
            {upcomingAppointment}
          </div>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          slidesPerGroup={5}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          aria-label="Upcoming appointments swiper"
        >
          <div
            className="meetingoverview--upcoming"
            aria-label="List of upcoming appoimtment"
          >
            {upcomingAppointment === 0 && (
              <img
                src={noresult}
                className="createblock--upcoming--image meetingoverview--upcoming--image"
                aria-label="No missed appointments"
              ></img>
            )}
            {value.allAppointment
              .filter(
                (person) =>
                  person.appointmentStartTime >
                  Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
              )
              .map((appointment) => (
                <SwiperSlide>{meetingCard(appointment)}</SwiperSlide>
              ))}
          </div>
        </Swiper>
      </div>
    );
  };
  const missedAppointmentBlock = () => {
    return (
      <div>
        <div
          className="meetingoverview--right--calendertitle"
          aria-label="Missed Appointments"
        >
          Missed appointments{" "}
          <div
            className="createblock--upcoming--number"
            aria-label="Number of Missed Appointments"
          >
            {pendingAppointment}
          </div>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          slidesPerGroup={5}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          aria-label="Missed appointments swiper"
        >
          <div
            className="meetingoverview--upcoming"
            aria-label="List of missed appointments"
          >
            {pendingAppointment === 0 && (
              <img
                src={noresult}
                className="createblock--upcoming--image meetingoverview--upcoming--image"
                aria-label="No missed appointments"
              ></img>
            )}

            {value.allAppointment
              .filter(
                (person) =>
                  person.appointmentStatus === false &&
                  person.appointmentStartTime <
                    Moment(new Date()).format("yyyy-MM-DDTHH:mm:ss")
              )
              .map((appointment) => (
                <SwiperSlide>{meetingCard(appointment)}</SwiperSlide>
              ))}
          </div>
        </Swiper>
      </div>
    );
  };

  const meetingCard = (appointment) => {
    return (
      <div
        className="meetingoverview--card createblock--upcoming--content"
        style={{ borderLeftColor: appointment.color }}
      >
        <div className="meetingoverview--card--starts ">
          Starts In&nbsp;&nbsp;
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
        <div className="meetingoverview--card--starts ">
          <span style={{ color: appointment.color }}>
            {appointment.appointmentContent}
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
            {Moment(appointment.appointmentDate).format("ddd, MMM DD")}
            {"   "}
          </span>
          <span
            className="createblock--upcoming--content--time"
            aria-label="Appointment start and end time"
          >
            {Moment(appointment.appointmentStartTime).format("h:mmA")} -
            {Moment(appointment.appointmentEndTime).format("h:mmA")}
          </span>
        </div>
        <div
          className="meetingoverview--upcoming--content--title"
          aria-label="Appointment title"
        >
          {"Location : " + (appointment.location || "nil")}
          <div style={{ marginTop: "5px" }}>
            {"Description : " + (appointment.description || "nil")}
          </div>
        </div>
      </div>
    );
  };
  // The component then uses the filter method again to count the number of pending and upcoming appointments,
  // which are stored in the "pendingAppointment" and "upcomingAppointment" variables, respectively.
  return (
    <div
      className="meetingoverview--block"
      aria-label="Meeting overview section"
    >
      <div
        className="meetingoverview--right--calendertitle"
        aria-label="Meeting overview title"
      >
        Appointments overview
      </div>
      {appointmentOverview()}
      {upcomingAppointmentBlock()}
      {missedAppointmentBlock()}
    </div>
  );
}
