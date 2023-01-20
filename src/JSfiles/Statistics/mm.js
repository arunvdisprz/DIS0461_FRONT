import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import Moment from "moment";
import { Requiredvalue } from "../MainContent";

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
  const selectedDateStart = Moment(value.appointmentDate).startOf("month").format("yyyy-MM-DDT00:00:00");
  const daysInMonth = Moment(value.appointmentDate).daysInMonth();
  const labelForMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const noOfMeetingMonth = Array.from({ length: daysInMonth }, () => 0);

  value.allAppointment.forEach(appointment => {
    const index = Moment(appointment.appointmentDate).diff(selectedDateStart, 'days');
    if (index >= 0 && index < daysInMonth) {
      noOfMeetingMonth[index]++;
    }
  });

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

  return <Bar options={options} data={numberData} className="ChartForYear--chart" />;
}

export default ChartForMonth;
