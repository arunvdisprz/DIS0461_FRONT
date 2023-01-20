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

export default function ChartForYearDuration() {
  const value = useContext(Requiredvalue);
  var selectedDateStart = Moment(value.appointmentDate).format(
    "yyyy" + "-01-01T00:00:00"
  );
  var selectedDateEnd = Moment(value.appointmentDate).format(
    "yyyy" + "-01-31T00:00:00"
  );

  //The component then initializes an array called "durationOfYear" with default values of 0.
  var durationOfYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //The code first gets the start and end date of the year, and then filters all the appointments that fall within that range.
  // It then calculates the total duration of meetings for each month and stores it in an array.
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
          durationOfYear[index] =
            durationOfYear[index] +
            Moment(appointment1.appointmentEndTime).diff(
              appointment1.appointmentStartTime,
              "hours"
            );
        });
    });
  }

  const durationData = {
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
        label: "Duration of meeting in hours ",
        data: durationOfYear,
        backgroundColor: "#1fcf94",
        color: "#ffffff",
      },
    ],
  };

  return (
    <Line
      options={options}
      data={durationData}
      aria-label="Line chart showing the durarion of meetings per month in a given year"
      className="ChartForYear--chart "
    />
  );
}
