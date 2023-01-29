import React, { useState } from "react";
import PatchValue from "./PatchValue";

import todayicon from "../Assets/todayicon.png";
import allappointmenticon from "../Assets/allappointmenticon.png";
import appointmentweekicon from "../Assets/appointmentweekicon.png";
import appointmentmonthicon from "../Assets/appointmentmonthicon.png";
import appointmentdaterangeicon from "../Assets/appointmentdaterangeicon.png";
import Moment from "moment";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import noresult from "../Assets/noresult.jpg";
import Countdown from "react-countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import scheduleicon from "../Assets/scheduleicon.png";
import { Navigation } from "swiper";

export default function MeetingOverview() {
  const value = useContext(Requiredvalue);

  const [reschedule, setReschedule] = useState(false);
  // initializing several variables that will be used to calculate the number of appointments for various time periods.
  // These include: "selectedDate", which is the currently selected date in the calendar "weeklyDay",
  // which is the day of the week for the selected date; "monthlyNumberDay" and "monthlyDay",
  let selectedDate = value.appointmentDate;
  let weeklyDay = Moment(selectedDate).day();
  let monthlyNumberDay = Moment(selectedDate).daysInMonth() - 1;
  let monthlyDay = Moment(selectedDate).format("DD") - 1;
  let yearlyDay = Moment(selectedDate).format("DDD") - 1;

  // which are used to calculate the number of appointments for the current month; and "yearlyDay" and "yearlyAppointments"
  // which are used to calculate the number of appointments for the current year.
  let weeklyAppointments = 0;
  let monthlyAppointments = 0;
  let yearlyAppointments = 0;
  let pendingAppointment = 0;
  let upcomingAppointment = 0;

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

  //function "patchValues" that is passed as a click event handler to each appointment element.
  //When an appointment element is clicked, this function updates the "Requiredvalue" context with data for the selected appointment,
  //such as the id, start time, end time, name, and content of the appointment.
  const patchValues = (
    e,
    id,
    appointmentStartTime,
    appointmentEndTime,
    appointmentContent
  ) => {
    e.stopPropagation();
    value.setPatchId(id);
    value.setPatchStartTime(Moment(appointmentStartTime).format("HH:mm"));
    value.setPatchEndTime(Moment(appointmentEndTime).format("HH:mm"));
    value.setPatchContent(appointmentContent);
    value.setPatchDate(value.appointmentDate);
    value.setAppointmentValue(false);
    value.setvalueForPatchEdit(false);
  };
  //Displays a section for appointment statistics, including counts for all appointments, today's appointments, weekly appointments, monthly appointments and yearly appointments.
  //Each count is displayed in a card with a corresponding icon and title.
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
          <div className="meetingoverview--allappointmentsdate">
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
            <div className="meetingoverview--status--title  ">
              {Moment(value.appointmentDate).format("YYYY, DD MMM")}
            </div>
          </div>

          <div
            className="meetingoverview--status--title"
            aria-label="Today's appointments title"
          >
            Appointments
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
          <div className="meetingoverview--allappointmentsdate">
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
            <div className="meetingoverview--status--title  ">
              {Moment(value.appointmentDate).format("YYYY, DD MMM")}
            </div>
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
          <div className="meetingoverview--allappointmentsdate">
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
            <div className="meetingoverview--status--title  ">
              {Moment(value.appointmentDate).format("YYYY,MMM")}
            </div>
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
          <div className="meetingoverview--allappointmentsdate">
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
            <div className="meetingoverview--status--title  ">
              {Moment(value.appointmentDate).format("YYYY")}
            </div>
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

  //The upcomingAppointmentBlock function renders a section for upcoming appointments, displaying the title, count and a swiper containing a list of upcoming appointments.
  // The swiper is configured to show 4 slides per view, with a space of 15px between them and 5 slides per group, with pagination and navigation enabled.
  // If there are no upcoming appointments, a "No Results" image is displayed. The function takes the data from the value context and filters the appointments that are upcoming.
  //It then maps over the appointments and passes them to the meetingCard function to display the details of each appointment.
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
                <SwiperSlide>
                  {meetingCard(appointment, "upcoming")}
                </SwiperSlide>
              ))}
          </div>
        </Swiper>
      </div>
    );
  };
  //The missedAppointmentBlock component renders a section for missed appointments.
  //It displays the number of missed appointments and uses a Swiper component to display them in a slideable format.
  //The component filters all appointments with status "false" and start time before the current time.
  //Each appointment is passed to the meetingCard component for display
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
                <SwiperSlide>{meetingCard(appointment, "missed")}</SwiperSlide>
              ))}
          </div>
        </Swiper>
      </div>
    );
  };

  //The meetingCard component is used to render an individual appointment card in the "Meeting Overview" section.
  //It displays the appointment's content, date, start and end time, location, and description.
  //It also includes a "Reschedule" button for missed appointments. The card's border color is determined by the appointment's color property.
  // It accepts the appointment object and type of appointment(upcoming/missed) as props.
  const meetingCard = (appointment, type) => {
    return (
      <div
        className="meetingoverview--card createblock--upcoming--content"
        style={{ borderLeftColor: appointment.color }}
      >
        <div className="meetingoverview--card--starts ">
          {type == "upcoming" && (
            <>
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
            </>
          )}
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
        {type == "missed" && (
          <>
            <button
              className="createblock--plusbartext reschedule--button"
              onClick={(e) => {
                patchValues(
                  e,
                  appointment.id,
                  appointment.appointmentStartTime,
                  appointment.appointmentEndTime,
                  appointment.name,
                  appointment.appointmentContent
                );
                value.setValueForPatch(!value.valueForPatch);
                value.setAppointmenStatus(appointment.appointmentStatus);
              }}
            >
              Reschedule
            </button>
          </>
        )}
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
      <div aria-label="Content Block Month" style={{ position: "absolute" }}>
        {value.valueForPatch && (
          <PatchValue aria-label="Patch value"></PatchValue>
        )}
      </div>
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
