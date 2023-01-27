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
  Filler,
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
  Legend,
  Filler
);

// This component creates a bar chart that displays the number of meetings per day in a given month.
export default function ChartForMonth() {
  const value = useContext(Requiredvalue);
  let selectedDateStart = Moment(value.appointmentDate).format(
    "yyyy-MM" + "-01T00:00:00"
  );

  let labelForMonth = [];
  let noOfMeetingMonth = [];
  let durationOfMonth = [];
  //The component then filters through the list of all appointments and for each day of the month,
  // it finds the appointments that match that day and adds the number of those appointments to the corresponding index of then oOfMeetingMonth  array.
  {
    Array.from({ length: Moment(value.appointmentDate).daysInMonth() }).map(
      (_, index) => {
        labelForMonth.push(index + 1);
        noOfMeetingMonth.push(0);
        durationOfMonth.push(0);
      }
    );
  }

  {
    Array.from({ length: Moment(value.appointmentDate).daysInMonth() }).map(
      (_, index) => {
        value.allAppointment
          .filter(
            (appointment) =>
              Moment(appointment.appointmentDate).format("yyyy-MM-DDT") ===
              Moment(selectedDateStart).add(index, "days").format("yyyy-MM-DDT")
          )
          .map((appointment) => {
            noOfMeetingMonth[index]++;
            durationOfMonth[index] =
              durationOfMonth[index] +
              Moment(appointment.appointmentEndTime).diff(
                appointment.appointmentStartTime,
                "hours"
              );
          });
      }
    );
  }

  const numberData = {
    labels: labelForMonth,
    datasets: [
      {
        label: "No of Meeting(count) ",
        data: noOfMeetingMonth,
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
    labels: labelForMonth,
    datasets: [
      {
        label: "Duration of meeting(hours)",
        data: durationOfMonth,
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
