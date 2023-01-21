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
    },
    backgroundColor: "var(--background-color)",
  },
};

export default function ChartForYear() {
  const value = useContext(Requiredvalue);
  var selectedDateStart = Moment(value.appointmentDate).format(
    "yyyy" + "-01-01T00:00:00"
  );
  var selectedDateEnd = Moment(value.appointmentDate).format(
    "yyyy" + "-01-31T00:00:00"
  );
  //The component then initializes an array called "noOfMeetingYear" with default values of 0.
  var noOfMeetingYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //The component then maps over the 12 months of the year and filters through the list of all appointments to find the appointments that match that month.
  // For each matching appointment, it increments the value at the corresponding index of the "noOfMeetingYear" array.
  {
    Array.from({ length: 12 }).map((_, index) => {
      value.allAppointment
        .filter(
          (appointment) =>
            Moment(appointment.appointmentDate).format("yyyy-MM-DDT") >=
              Moment(selectedDateStart)
                .add(index, "months")
                .format("yyyy-MM-DDT") &&
            Moment(appointment.appointmentDate).format("yyyy-MM-DDT") <=
              Moment(selectedDateEnd).add(index, "months").format("yyyy-MM-DDT")
        )
        .map((appointment1) => {
          noOfMeetingYear[index]++;
        });
    });
  }

  const dataNumber = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "No of Meeting ",
        data: noOfMeetingYear,
        backgroundColor: "#1fcf94",
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={dataNumber}
      aria-label="Bar chart showing the number of meetings per month in a given year"
      className="ChartForYear--chart "
    />
  );
}
