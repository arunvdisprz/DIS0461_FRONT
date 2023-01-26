import { useEffect, useState, createContext } from "react";

import "../SCSSfiles/AddAppointment.scss";
import "../SCSSfiles/ContentBlock.scss";
import "../SCSSfiles/ContentBlockMonth.scss";
import "../SCSSfiles/CreateBlock.scss";
import "../SCSSfiles/LogoWithTabs.scss";
import "../SCSSfiles/MainContent.scss";
import "../SCSSfiles/MettingOverview.scss";
import "../SCSSfiles/Modal.scss";
import "./LandingPage/NavigationBlock.scss";
import "react-notifications/lib/notifications.css";
import "react-toastify/dist/ReactToastify.css";

import AddAppointment from "./MainContentBlock/AddAppointment";
import ContentBlock from "./MainContentBlock/ContentBlock";
import ContentBlockMonth from "./MainContentBlock/ContentBlockMonth";
import CreateBlock from "./MainContentBlock/CreateBlock";
import LogoWithTabs from "./MainContentBlock/LogoWithTabs";
import MeetingOverview from "./MainContentBlock/MeetingOverview";
import Modal from "./MainContentBlock/Modal";
import PatchValue from "./MainContentBlock/PatchValue";
import Statisticsview from "./MainContentBlock/Statisticsview";
import { ToastContainer, toast } from "react-toastify";
import Moment from "moment";
import { v4 as uuid } from "uuid";

export const Requiredvalue = createContext();

export default function MainContent() {
  //The component uses React hooks, such as useState and useEffect, to manage the state and functionality of the component.
  //There are multiple state variables defined using the useState hook, such as allAppointment, appointmentContent, appointmentDate, ...
  //which are used to store data related to appointments, such as date, time, location, and status.
  const [allAppointment, setAllAppointment] = useState([]);
  const [allAppointmentFilter, setAllAppointmentFilter] = useState([]);
  const [appointmentContent, setAppointmentContent] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentStatus, setAppointmenStatus] = useState(false);
  const [appointmentValue, setAppointmentValue] = useState(false);
  const [appointmentView, setAppointmentView] = useState(true);
  const [color, setColor] = useState("#8247f5");
  const [contentBlockDate, setContentBlockDate] = useState(true);
  const [contentBlockMonth, setContentBlockMonth] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endTimeValue, setEndTimeValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [meetingoverview, setMeetingOverview] = useState(false);
  const [patchContent, setPatchContent] = useState();
  const [patchEndTime, setPatchEndTime] = useState();
  const [patchId, setPatchId] = useState();
  const [patchDate, setPatchDate] = useState();
  const [patchStartTime, setPatchStartTime] = useState();
  const [startTime, setStartTime] = useState("");
  const [startTimeValue, setStartTimeValue] = useState();
  const [statisticsview, setStatisticsview] = useState(false);
  const [valueForPatch, setValueForPatch] = useState(false);
  const [valueForPatchEdit, setvalueForPatchEdit] = useState(false);
  const name = sessionStorage.getItem("Feed");
  const url = "http://localhost:5169/appointment";

  // functions like NotifyCreated, NotifyDeleted, NotifyNotCreated, NotifyNotDeleted, NotifyNotUpdated and NotifyUpdated
  //which are used to show notifications with react-toastify library.

  const NotifyCreated = (responseJson) => {
    toast.success(responseJson);
    toast.clearWaitingQueue();
  };
  const NotifyDeleted = (responseJson) => toast.success(responseJson);
  const NotifyNotCreated = (responseJson) => {
    toast.error(responseJson);
    toast.clearWaitingQueue();
  };
  const NotifyNotDeleted = (responseJson) => toast.warning(responseJson);
  const NotifyNotUpdated = (responseJson) => toast.error(responseJson);
  const NotifyUpdated = (responseJson) => toast.success(responseJson);
 

  // When the appointmentDate state variable changes, the second useEffect hook makes another GET request to the API, again using the appointmentDate state variable, as well as the count state variable,
  //which is used as a way to update the data when it changes.
  useEffect(() => {
    fetch(url + "/" + Moment(appointmentDate).format("yyyy-MM-DDTHH:mm:ss"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return res.status;
      })
      .then((res) => {
        res !== 404 ? setData(res) : setData([]);
      });
  }, [appointmentDate, count]);

  //the useEffect hook to fetch all the appointments from the API when the component is initially rendered and when the count state variable changes.
  useEffect(() => {
    fetch(url + "/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return res.status;
      })
      .then((res) => {
        res !== 404 ? setAllAppointment(res) : setAllAppointment([]);
      });
  }, [count]);

  // The appointmentPost function is used to create new appointments by making a POST request to the API, passing in data such as the name, id, date, time, content, location, and color of the appointment.
  //If the request is successful, it will increase the count state variable and call the NotifyCreated function, which shows a notification that the appointment has been created.
  const appointmentPost = (date) => {
    const data = {
      name: name,
      id: uuid(),
      appointmentDate:
        (date || Moment(appointmentDate).format("yyyy-MM-DDT")) + "00:00:00",
      appointmentStartTime:
        (date || Moment(appointmentDate).format("yyyy-MM-DDT")) +
        startTime +
        ":00",
      appointmentEndTime:
        (date || Moment(appointmentDate).format("yyyy-MM-DDT")) +
        endTime +
        ":00",
      appointmentContent: appointmentContent,
      location: location,
      description: description,
      color: color,
      appointmentStatus: true,
    };

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.text();
      })
      .then((responseJson) => {
        if (JSON.parse(responseJson) == "Appointment created successfully") {
          setCount(count + 1);
          NotifyCreated(responseJson);
        } else NotifyNotCreated(responseJson);
      });
  };

  //The appointmentPatch function is used to update existing appointments by making a PATCH request to the API, passing in the updated data such as the name, id, date, time, and status of the appointment.
  //If the request is successful, it will increase the count state variable and call the NotifyUpdated function, which shows a notification that the appointment has been updated.
  const appointmentPatch = (status) => {
    const data = {
      patchDate: name,
      patchId: patchId,
      patchAppointmentDate: Moment(appointmentDate).format(
        "yyyy-MM-DDTHH:mm:ssZ"
      ),
      patchAppointmentStartTime:
        Moment(appointmentDate).format("yyyy-MM-DDT") + patchStartTime + ":00",
      patchAppointmentEndTime:
        Moment(appointmentDate).format("yyyy-MM-DDT") + patchEndTime + ":00",
      patchAppointmentContent: patchContent,
      patchColor: color,
      patchappointmentStatus: status,
    };

    fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.text();
      })
      .then((responseJson) => {
        if (JSON.parse(responseJson) == "Appointment updated successfully") {
          setCount(count + 1);
          NotifyUpdated(responseJson);
        } else NotifyNotUpdated(responseJson);
      });
  };

  //The appointmentDelete function is used to delete an existing appointment by making a DELETE request to the API.
  //The request is made to the API endpoint that includes the id of the appointment to be deleted, which is passed in as the patchId state variable.
  //If the request is successful, the function will increase the count state variable and call the NotifyDeleted function,
  //which shows a notification that the appointment has been deleted. If the request is not successful,
  //the function will call the NotifyNotDeleted function, which shows a notification that the appointment could not be deleted.
  const appointmentDelete = () => {
    fetch(url + "/" + patchId, {
      method: "DELETE",
      headers: {
        authToken: "token",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((responseJson) => {
        if (responseJson == "Appointment deleted successfully") {
          setCount(count + 1);
          NotifyDeleted(responseJson);
        } else NotifyNotDeleted(responseJson);
      });
  };

  let providerValue = {
    allAppointment,
    allAppointmentFilter,
    appointmentDate,
    appointmentStatus,
    appointmentValue,
    appointmentView,
    color,
    contentBlockDate,
    contentBlockMonth,
    data,
    description,
    endTimeValue,
    isOpen,
    location,
    meetingoverview,
    name,
    patchContent,
    patchEndTime,
    patchId,
    patchStartTime,
    statisticsview,
    startTimeValue,
    valueForPatch,
    valueForPatchEdit,
    patchDate,
    setStatisticsview,
    appointmentDelete,
    appointmentPatch,
    appointmentPost,
    setAllAppointment,
    setAllAppointmentFilter,
    setAppointmenStatus,
    setAppointmentContent,
    setAppointmentDate,
    setAppointmentValue,
    setAppointmentView,
    setColor,
    setContentBlockDate,
    setContentBlockMonth,
    setDescription,
    setEndTime,
    setEndTimeValue,
    setIsOpen,
    setLocation,
    setMeetingOverview,
    setPatchContent,
    setPatchEndTime,
    setPatchId,
    setPatchDate,
    setPatchStartTime,
    setStartTime,
    setStartTimeValue,
    setValueForPatch,
    setvalueForPatchEdit,
  };

  //The code is creating a calendar application where the user can create, view, edit and delete appointments.
  //It also uses different libraries like react-toastify and moment.js for notifications and date manipulation respectively.
  return (
    <Requiredvalue.Provider value={providerValue}>
      <div className="maincontent" aria-label="Main Content">
        <div
          className="maincontent--appointmentlist"
          aria-label="Main page contain Appointment List and option to create new appointments"
        >
          {isOpen && <Modal></Modal>}
          <ToastContainer position="top-center" autoClose="800" limit={1} width="1000px" />
          <LogoWithTabs></LogoWithTabs>
          {meetingoverview && (
            <div aria-label="MeetingOverview">
              <MeetingOverview></MeetingOverview>
            </div>
          )}
          {appointmentView && (
            <div
              className="maincontent--datewithcontent"
              aria-label="Appointment View"
            >
              {contentBlockDate && (
                <div
                  className="maincontent--datewithcontent"
                  aria-label="Date with content"
                >
                  <CreateBlock aria-label="Create block"></CreateBlock>
                  <div aria-label="Content Block day">
                    <ContentBlock></ContentBlock>
                    {valueForPatch && (
                      <PatchValue aria-label="Patch value"></PatchValue>
                    )}
                    {appointmentValue && (
                      <AddAppointment aria-label="Add appointment"></AddAppointment>
                    )}
                  </div>
                </div>
              )}
              {contentBlockMonth && (
                <div aria-label="Content Block Month">
                  <ContentBlockMonth></ContentBlockMonth>
                  {valueForPatch && (
                    <PatchValue aria-label="Patch value"></PatchValue>
                  )}
                  {appointmentValue && (
                    <AddAppointment aria-label="Add appointment"></AddAppointment>
                  )}
                </div>
              )}
            </div>
          )}
          {statisticsview && <Statisticsview></Statisticsview>}
        </div>
      </div>
    </Requiredvalue.Provider>
  );
}
