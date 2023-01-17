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

function ChartForMonthDuration() {
  const value = useContext(Requiredvalue);
  var selectedDateStart = Moment(value.appointmentDate).format(
    "yyyy-MM" + "-01T00:00:00"
  );

  var labelForMonth = [];
  var durationOfMonth = [];
  {
    Array.from({ length: Moment(value.appointmentDate).daysInMonth() }).map(
      (_, index) => {
        labelForMonth.push(index + 1);
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
              Moment(appointment.appointmentDate).format("yyyy-MM-DDT") ==
              Moment(selectedDateStart).add(index, "days").format("yyyy-MM-DDT")
          )
          .map((appointment) => {
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

  const durationData = {
    labels: labelForMonth,
    datasets: [
      {
        label: "Duration of meeting in hours",
        data: durationOfMonth,
        backgroundColor: "#6b72ee",
        color: "#6b72ee",
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

export default ChartForMonthDuration;
