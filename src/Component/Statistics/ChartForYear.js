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
import { options } from "../Datafile";

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

export default function ChartForYear() {
  const value = useContext(Requiredvalue);
  let selectedDateStart = Moment(value.appointmentDate).format(
    "yyyy" + "-01-01T00:00:00"
  );
  let selectedDateEnd = Moment(value.appointmentDate).format(
    "yyyy" + "-01-31T00:00:00"
  );
  //The component then initializes an array called "noOfMeetingYear" with default values of 0.
  let noOfMeetingYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let durationOfYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
          durationOfYear[index] =
            durationOfYear[index] +
            Moment(appointment1.appointmentEndTime).diff(
              appointment1.appointmentStartTime,
              "hours"
            );
        });
    });
  }
  let label = [
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
  ];
  const numberData = {
    labels: label,
    datasets: [
      {
        label: "No of Meeting(count) ",
        data: noOfMeetingYear,
        backgroundColor: "rgb(167,162,255)",
        borderWidth: 1,
        fill: {
          target: "origin",
          above: "rgb(167,162,255,0.5)", // Area will be red above the origin
          below: "#625ED7", // And blue below the origin
        },
      },
    ],
  };
  let width, height, gradient;

  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0, "rgb(255,255,255,0.5)");
      gradient.addColorStop(0.5, "rgb(211,230,255,0.5)");
      gradient.addColorStop(1, "rgb(206,227,255,0.5)");
    }

    return {
      target: "origin",
      above: gradient, // Area will be red above the origin
      below: "",
    };
  }
  const durationData = {
    labels: label,
    datasets: [
      {
        label: "Duration of meeting(hours) ",
        data: durationOfYear,
        backgroundColor: "white",
        borderColor: "#39b4f3",
        lineTension: 0.3,
        fill: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },

        borderWidth: 1.2,
      },
    ],
  };

  return (
    <div className="chartForYear--twograph">
      <div>
        <Bar
          options={options}
          data={numberData}
          aria-label="Bar chart showing the number of meetings per day in a given month"
          className="chartForYear--chart "
        />
      </div>
      <div>
        <Line
          options={options}
          data={durationData}
          aria-label="Line chart showing the durarion of meetings per day in a given month"
          className="chartForYear--chart "
        />
      </div>
    </div>
  );
}
