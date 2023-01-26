//The colors constant is an array of 8 hex color codes that are used as options for the user to select from.
export const colors = [
  "#ff0055",
  "#ff758e",
  "#e55cff",
  "#8247f5",
  "#0099ff",
  "#0ae8f0",
  "#17e885",
  "#ccf000",
];
export const appointmentMode = [
  {
    value: "Create an appointment only for this day",
    label: "Create an appointment only for this day",
  },
  {
    value: "Create appointments for the following days in the week",
    label: "Create appointments for the following days in the week",
  },
];
export const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      offset: true,
      grid: {
        drawOnChartArea: !1,
        tickWidth: 0,
      },
    },
    y: {
      grid: {
        tickWidth: 0,
      },
    },
  },
  layout: {
    padding: {
      top: 30,
      left: 15,
      right: 15,
      bottom: 15,
    },
  },
};
export const optionForTime = [
  { value: "12:00", label: "12:00" },
  { value: "12:15", label: "12:15" },
  { value: "12:30", label: "12:30" },
  { value: "12:45", label: "12:45" },
  { value: "1:00 ", label: "1:00" },
  { value: "1:15 ", label: "1:15" },
  { value: "1:30 ", label: "1:30 " },
  { value: "1:45 ", label: "1:45 " },
  { value: "2:00 ", label: "2:00 " },
  { value: "2:15 ", label: "2:15 " },
  { value: "2:30 ", label: "2:30 " },
  { value: "2:45 ", label: "2:45 " },
  { value: "3:00 ", label: "3:00 " },
  { value: "3:15 ", label: "3:15 " },
  { value: "3:30 ", label: "3:30 " },
  { value: "3:45 ", label: "3:45 " },
  { value: "4:00 ", label: "4:00 " },
  { value: "4:15 ", label: "4:15 " },
  { value: "4:30 ", label: "4:30 " },
  { value: "4:45 ", label: "4:45 " },
  { value: "5:00 ", label: "5:00 " },
  { value: "5:15 ", label: "5:15 " },
  { value: "5:30 ", label: "5:30 " },
  { value: "5:45 ", label: "5:45 " },
  { value: "6:00 ", label: "6:00 " },
  { value: "6:15 ", label: "6:15 " },
  { value: "6:30 ", label: "6:30 " },
  { value: "6:45 ", label: "6:45 " },
  { value: "7:00 ", label: "7:00 " },
  { value: "7:15 ", label: "7:15 " },
  { value: "7:30 ", label: "7:30 " },
  { value: "7:45 ", label: "7:45 " },
  { value: "8:00 ", label: "8:00 " },
  { value: "8:15 ", label: "8:15 " },
  { value: "8:30 ", label: "8:30 " },
  { value: "8:45 ", label: "8:45 " },
  { value: "9:00 ", label: "9:00 " },
  { value: "9:15 ", label: "9:15 " },
  { value: "9:30 ", label: "9:30 " },
  { value: "9:45 ", label: "9:45 " },
  { value: "10:00", label: "10:00 " },
  { value: "10:15", label: "10:15 " },
  { value: "10:30", label: "10:30 " },
  { value: "10:45", label: "10:45 " },
  { value: "11:00", label: "11:00 " },
  { value: "11:15", label: "11:15 " },
  { value: "11:30", label: "11:30 " },
  { value: "11:45", label: "11:45 " },
];
export const meridiemOptions = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];
