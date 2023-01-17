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
function ChartForMonth() {
  const value = useContext(Requiredvalue);
  var selectedDateStart = Moment(value.appointmentDate).format(
    "yyyy-MM" + "-01T00:00:00"
  );

  var labelForMonth = [];
  var noOfMeetingMonth = [];

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
    <Bar options={options} data={numberData} className="ChartForYear--chart " />
  );
}

export default ChartForMonth;
