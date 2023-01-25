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
import { Line } from "react-chartjs-2";
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
  },
};

export default function ChartForWeekDuration() {
  const value = useContext(Requiredvalue);
  var weeklyDay = Moment(value.appointmentDate).day();
  var selectedDateStart = Moment(value.appointmentDate).subtract(
    weeklyDay,
    "days"
  );

  //The component then initializes an array called "label" with the days of the week
  //And an array called "durationOfWeek" with default values of 0.
  var label = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var durationOfWeek = [0, 0, 0, 0, 0, 0, 0];

  //The component then maps over the 7 days of the week and filters through the list of all appointments to find the appointments that match that day.
  //For each matching appointment, it adds the duration of that appointment to the value at the corresponding index of the "durationOfWeek" array.
  {
    Array.from({ length: 7 }).map((_, index) => {
      value.allAppointment
        .filter(
          (appointment) =>
            Moment(appointment.appointmentDate).format("yyyy-MM-DDT") ===
            Moment(selectedDateStart).add(index, "days").format("yyyy-MM-DDT")
        )
        .map((appointment1) => {
          durationOfWeek[index] =
            durationOfWeek[index] +
            Moment(appointment1.appointmentEndTime).diff(
              appointment1.appointmentStartTime,
              "hours"
            );
        });
    });
  }

  const durationData = {
    labels: label,
    datasets: [
      {
        label: "Duration of meeting in hours ",
        data: durationOfWeek,
        backgroundColor: "#54bff8",
      },
    ],
  };
  return (
    <Line
      options={options}
      data={durationData}
      aria-label="Line chart showing the duration of meeting per day in a given week"
      className="ChartForYear--chart "
    />
  );
}
