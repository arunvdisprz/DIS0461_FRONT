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
import { Bar, Line } from "react-chartjs-2";
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
};

const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "blue",
  "purple",
];

function ChartForWeek() {
  const value = useContext(Requiredvalue);
  var weeklyDay = Moment(value.appointmentDate).day();
  var selectedDateStart = Moment(value.appointmentDate).subtract(
    weeklyDay,
    "days"
  );
  var label = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var noOfMeetingWeek = [0, 0, 0, 0, 0, 0, 0];

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
        label: "No of Meeting",
        data: noOfMeetingWeek,
        backgroundColor: "#fe505a",
      },
    ],
  };

  return (
    <Bar options={options} data={dataNumber} className="ChartForYear--chart " />
  );
}

export default ChartForWeek;
