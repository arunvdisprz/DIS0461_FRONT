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
    backgroundColor: "#ffffff",
  },
};

function ChartForYear() {
  const value = useContext(Requiredvalue);
  var selectedDateStart = Moment(value.appointmentDate).format(
    "yyyy" + "-01-01T00:00:00"
  );
  var selectedDateEnd = Moment(value.appointmentDate).format(
    "yyyy" + "-01-31T00:00:00"
  );

  var noOfMeetingYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

  return <Bar options={options} data={dataNumber} />;
}

export default ChartForYear;
