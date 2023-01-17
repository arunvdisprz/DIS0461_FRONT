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
          .map((appointment) => {
            noOfMeetingMonth[index]++;
          });
      }
    );
  }

  const numberData = {
    labels: labelForMonth,
    datasets: [
      {
        label: "number of meeting",
        data: noOfMeetingMonth,
        backgroundColor: "#fa7f58",
      },
    ],
  };

  return (
    <Bar options={options} data={numberData} className="ChartForYear--chart " />
  );
}

export default ChartForMonth;
