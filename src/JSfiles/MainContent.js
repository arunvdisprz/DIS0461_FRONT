import { useEffect, useState, createContext } from "react";
import "../SCSSfiles/LogoWithTabs.scss";
import "../SCSSfiles/MainContent.scss";
import "../SCSSfiles/ContentBlock.scss";
import "../SCSSfiles/ContentBlockMonth.scss";
import "../SCSSfiles/ContentBlockWeek.scss";
import "../SCSSfiles/MettingOverview.scss";
import "./LandingPage/NavigationBlock.scss";
import "../SCSSfiles/Modal.scss";
import "react-notifications/lib/notifications.css";

import LogoWithTabs from "./MainContentBlock/LogoWithTabs";
import MeetingOverview from "./MainContentBlock/MeetingOverview";
import CreateBlock from "./MainContentBlock/CreateBlock";
import ContentBlock from "./MainContentBlock/ContentBlock";
import ContentBlockWeek from "./MainContentBlock/ContentBlockWeek";
import ContentBlockMonth from "./MainContentBlock/ContentBlockMonth";
import AddAppointment from "./MainContentBlock/AddAppointment";
import PatchValue from "./MainContentBlock/PatchValue";
import Modal from "./MainContentBlock/Modal";
import Statisticsview from "./MainContentBlock/Statisticsview" 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Moment from "moment";
import { v4 as uuid } from "uuid";

export const Requiredvalue = createContext();

function MainContent() {
  const name = sessionStorage.getItem("Feed");
  const [allAppointment, setAllAppointment] = useState([]);
  const [allAppointmentFilter, setAllAppointmentFilter] = useState([]);

  const [data, setData] = useState([]); //! HERE WE GET A DATA FROM A API

  const [appointmentValue, setAppointmentValue] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [appointmentContent, setAppointmentContent] = useState("");

  const [valueForPatch, setValueForPatch] = useState(false); //! IF the variable turns true , update component will display
  const [patchName, setPatchName] = useState();
  const [patchId, setPatchId] = useState(); //! Declare a varible that can store current index id
  const [patchStartTime, setPatchStartTime] = useState();
  const [patchEndTime, setPatchEndTime] = useState();
  const [patchContent, setPatchContent] = useState();
  const [valueForPatchEdit, setvalueForPatchEdit] = useState(false);

  const [appointmentDate, setAppointmentDate] = useState(new Date()); //!assign a varible for getting value from the child className

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [appointmentView, setAppointmentView] = useState(true);
  const [Meetingoverview, setMeetingOverview] = useState(false);
  const [statisticsview, setStatisticsview] = useState(false);

  const [startTimeValue, setStartTimeValue] = useState();
  const [endTimeValue, setEndTimeValue] = useState();

  const [appointmentStatus, setAppointmenStatus] = useState(false);

  const [color, setColor] = useState("#8247f5");
  const [count, setCount] = useState(0);

  const [contentBlockDate, setContentBlockDate] = useState(true);
  const [contentBlockMonth, setContentBlockMonth] = useState(false);
  const [contentBlockWeak, setContentBlockWeek] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const NotifyCreated = () => toast.success("Appointment Created!");
  const NotifyNotCreated = () => toast.error("Appointment Not Created!");
  const NotifyUpdated = () => toast.success("Appointment Updated!");
  const NotifyNotUpdated = () => toast.error("Appointment Not Updated!");
  const NotifyDeleted = () => toast.success("Appointment Deleted!");
  const NotifyNotDeleted = () => toast.warning("Appointment Not Deleted!");

  const url = "http://localhost:5169/appointment";
  useEffect(() => {
    fetch(url + "/" + Moment(appointmentDate).format("yyyy-MM-DDTHH:mm:ss"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  useEffect(() => {
    fetch(url + "/" + Moment(appointmentDate).format("yyyy-MM-DDTHH:mm:ss"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, [appointmentDate, count]);

  useEffect(() => {
    fetch(url + "/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAllAppointment(res);
      });
  }, [count]);

  const Postpost = async (date) => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        id: uuid(),
        appointmentDate:
          (date || Moment(appointmentDate).format("yyyy-MM-DDT")) +
          startTime +
          ":00",
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
      }),
    }).then((res) => {
      if (res.status == 201) {
        setCount(count + 1);
        NotifyCreated();
      } else {
        NotifyNotCreated();
      }
    });
    setAppointmentValue(!appointmentValue);
    setAppointmentContent(" ");
  };

  const Postpatch = (status) => {
    fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patchName: name,
        patchId: patchId,
        patchAppointmentDate: Moment(appointmentDate).format(
          "yyyy-MM-DDTHH:mm:ssZ"
        ),
        patchAppointmentStartTime:
          Moment(appointmentDate).format("yyyy-MM-DDT") +
          patchStartTime +
          ":00",
        patchAppointmentEndTime:
          Moment(appointmentDate).format("yyyy-MM-DDT") + patchEndTime + ":00",
        patchAppointmentContent: patchContent,
        patchColor: color,
        patchappointmentStatus: status,
      }),
    }).then((res) => {
      if (res.status == 201) {
        setAppointmenStatus(false);
        setCount(count + 1);
        NotifyUpdated();
      } else {
        NotifyNotUpdated();
      }
    });
  };

  const Postdelete = async (uid) => {
    await fetch(url + "/" + patchId, {
      method: "DELETE",
      headers: {
        authToken: "token",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        setCount(count + 1);
        NotifyDeleted();
      } else {
        NotifyNotDeleted();
      }
    });
  };
  return (
    <Requiredvalue.Provider
      value={{
        allAppointment,
        allAppointmentFilter,
        appointmentDate,
        appointmentStatus,
        appointmentValue,
        appointmentView,
        color,
        contentBlockDate,
        contentBlockMonth,
        contentBlockWeak,
        data,
        description,
        endTimeValue,
        isOpen,
        location,
        Meetingoverview,
        name,
        patchContent,
        patchEndTime,
        patchId,
        patchStartTime,
        statisticsview,
        setStatisticsview,
        Postdelete,
        Postpatch,
        Postpost,
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
        setContentBlockWeek,
        setDescription,
        setEndTime,
        setEndTimeValue,
        setIsOpen,
        setLocation,
        setMeetingOverview,
        setPatchContent,
        setPatchEndTime,
        setPatchId,
        setPatchName,
        setPatchStartTime,
        setStartTime,
        setStartTimeValue,
        setValueForPatch,
        setvalueForPatchEdit,
        startTimeValue,
        valueForPatch,
        valueForPatchEdit,
        patchName,
      }}
    >
      <div className="maincontent">
        <div className="maincontent--appointmentlist">
          {isOpen && <Modal></Modal>}
          <ToastContainer position="top-center" autoClose="1500" />
          <LogoWithTabs></LogoWithTabs>
          {Meetingoverview && <MeetingOverview></MeetingOverview>}
          {appointmentView && (
            <div className="maincontent--datewithcontent">
              {contentBlockDate && (
                <div className="maincontent--datewithcontent">
                  <CreateBlock></CreateBlock>
                  <div>
                    <ContentBlock></ContentBlock>
                    {valueForPatch && <PatchValue></PatchValue>}
                    {appointmentValue && <AddAppointment></AddAppointment>}
                  </div>
                </div>
              )}
              {contentBlockWeak && (
                <div className="maincontent--datewithcontent">
                  <CreateBlock></CreateBlock>
                  <div>
                    <ContentBlockWeek></ContentBlockWeek>
                    {valueForPatch && <PatchValue></PatchValue>}
                    {appointmentValue && <AddAppointment></AddAppointment>}
                  </div>{" "}
                </div>
              )}
              {contentBlockMonth && (
                <div>
                  <ContentBlockMonth></ContentBlockMonth>
                  {valueForPatch && <PatchValue></PatchValue>}
                  {appointmentValue && <AddAppointment></AddAppointment>}
                </div>
              )}
            </div>
          )}
          {  statisticsview&& <Statisticsview></Statisticsview>}
        </div>
      </div>
    </Requiredvalue.Provider>
  );
}
export default MainContent;
