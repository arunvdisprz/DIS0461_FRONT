import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import Moment from "moment";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  layout: {
    padding: {
      top: 5,
      left: 15,
      right: 15,
      bottom: 15,
      backgroundColor: "var(--background-color)",
    },
    customCanvasBackgroundColor: {
      color: "lightGreen",
    },
  },
};

export default function ChartForWeek() {
  const value = useContext(Requiredvalue);
  var weeklyDay = Moment(value.appointmentDate).day();
  var selectedDateStart = Moment(value.appointmentDate).subtract(
    weeklyDay,
    "days"
  );

  //The component then initializes an array called "label" with the days of the week and
  //An array called "noOfMeetingWeek" with default values of 0.
  var label = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var noOfMeetingWeek = [0, 0, 0, 0, 0, 0, 0];

  //The component then maps over the 7 days of the week and filters through the list of all appointments to find the appointments that match that day.
  //For each matching appointment, it increments the value at the corresponding index of the "noOfMeetingWeek" array.
  {
    Array.from({ length: 7 }).map((_, index) => {
      value.allAppointment
        .filter(
          (appointment) =>
            Moment(appointment.appointmentDate).format("yyyy-MM-DDT") ==
            Moment(selectedDateStart).add(index, "days").format("yyyy-MM-DDT")
        )
        .map((appointment1) => {
          noOfMeetingWeek[index]++;
        });
    });
  }
  const dataNumber = {
    labels: label,
    datasets: [
      {
        label: "No of Meeting ",
        data: noOfMeetingWeek,
        backgroundColor: "#54bff8",
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={dataNumber}
      aria-label="Bar chart showing the number of meetings per day in a given week"
      className="ChartForYear--chart "
    />
  );
}
