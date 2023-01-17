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

function ChartForWeekDuration() {
  const value = useContext(Requiredvalue);
  var weeklyDay = Moment(value.appointmentDate).day();
  var selectedDateStart = Moment(value.appointmentDate).subtract(
    weeklyDay,
    "days"
  );
  var label = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var durationOfWeek = [0, 0, 0, 0, 0, 0, 0];

  {
    Array.from({ length: 7 }).map((_, index) => {
      value.allAppointment
        .filter(
          (appointment) =>
            Moment(appointment.appointmentDate).format("yyyy-MM-DDT") ==
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
        label: "duration of meeting",
        data: durationOfWeek,
        backgroundColor: "#fe505a",
      },
    ],
  };
  return (
    <Line
      options={options}
      data={durationData}
      className="ChartForYear--chart "
    />
  );
}

export default ChartForWeekDuration;
