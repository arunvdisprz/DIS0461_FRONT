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
  },
};
// This component creates a bar chart that displays the number of meetings per day in a given month.
export default function ChartForMonth() {
  const value = useContext(Requiredvalue);
  var selectedDateStart = Moment(value.appointmentDate).format(
    "yyyy-MM" + "-01T00:00:00"
  );

  var labelForMonth = [];
  var noOfMeetingMonth = [];
  //The component then filters through the list of all appointments and for each day of the month,
  // it finds the appointments that match that day and adds the number of those appointments to the corresponding index of then oOfMeetingMonth  array.
  {
    Array.from({ length: Moment(value.appointmentDate).daysInMonth() }).map(
      (_, index) => {
        labelForMonth.push(index + 1);
        noOfMeetingMonth.push(0);
      }
    );
  }

  {
    Array.from({ length: Moment(value.appointmentDate).daysInMonth() }).map(
      (_, index) => {
        value.allAppointment
          .filter(
            (appointment) =>
              Moment(appointment.appointmentDate).format("yyyy-MM-DDT") ==
              Moment(selectedDateStart).add(index, "days").format("yyyy-MM-DDT")
          )
          .map(() => {
            noOfMeetingMonth[index]++;
          });
      }
    );
  }

  const numberData = {
    labels: labelForMonth,
    datasets: [
      {
        label: "No of meeting ",
        data: noOfMeetingMonth,
        backgroundColor: "#6b72ee",
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={numberData}
      aria-label="Bar chart showing the number of meetings per day in a given month"
      className="ChartForYear--chart "
    />
  );
}
