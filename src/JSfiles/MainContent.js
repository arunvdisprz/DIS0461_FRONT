import Ratebareact, { useEffect, useState, createContext } from "react";

import "../SCSSfiles/MainContent.scss";
import "../SCSSfiles/ContentBlock.scss";
import "./LandingPage/NavigationBlock.scss";
import "../SCSSfiles/MettingOverview.scss";
import "../SCSSfiles/ContentBlockMonth.scss";
import "../SCSSfiles/LogoWithTabs.scss";
import "react-notifications/lib/notifications.css";

import LogoWithTabs from "./MainContentBlock/LogoWithTabs";
import MeetingOverview from "./MainContentBlock/MeetingOverview";
import CreateBlock from "./MainContentBlock/CreateBlock";
import ContentBlock from "./MainContentBlock/ContentBlock";
import ContentBlockWeek from "./MainContentBlock/ContentBlockWeek";
import ContentBlockMonth from "./MainContentBlock/ContentBlockMonth";
import AddAppointment from "./MainContentBlock/AddAppointment";
import PatchValue from "./MainContentBlock/PatchValue";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Moment from "moment";
import { v4 as uuid } from "uuid";
import _12fromto24hours from "12fromto24hours";

export const Requiredvalue = createContext();

function Calenderbar() {
  const [allAppointment, setAllAppointment] = useState([]);
  const [allAppointmentFilter, setAllAppointmentFilter] = useState([]);
  const [name, setName] = useState(sessionStorage.getItem("Feed"));

  const [data, setData] = useState([]); //! HERE WE GET A DATA FROM A API

  const [appointmentValue, setAppointmentValue] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [appointmentcontent, setappointmentcontent] = useState("");

  const [valueForPatch, setValueForPatch] = useState(false); //! IF the variable turns true , update component will display
  const [patchName, setPatchName] = useState();
  const [patchId, setPatchId] = useState(); //! Declare a varible that can store current index id
  const [patchStartTime, setPatchStartTime] = useState();
  const [patchEndTime, setPatchEndTime] = useState();

  const [patchContent, setPatchContent] = useState();
  const [valueForPatchEdit, setvalueForPatchEdit] = useState(false);

  const [appointmentDate, setAppointmentDate] = useState(new Date()); //!assign a varible for getting value from the child class

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const url = "http://localhost:5169/appointment";

  const [appointmentView, setAppointmentView] = useState(true);
  const [Meetingoverview, setMeetingOverview] = useState(false);

  const [startTimeValue, setStartTimeValue] = useState();
  const [endTimeValue, setEndTimeValue] = useState();

  const [appointmentStatus, setAppointmenStatus] = useState("");

  const [color, setColor] = useState("#8247f5");

  const [count, setCount] = useState(0);

  const [contentBlockDate, setContentBlockDate] = useState(true);
  const [contentBlockMonth, setContentBlockMonth] = useState(false);
  const [contentBlockWeak, setContentBlockWeek] = useState(false);

  const NotifyCreated = () => toast("Appointment Created!");
  const NotifyNotCreated = () => toast("Appointment Not Created!");
  const NotifyUpdated = () => toast("Appointment Updated!");
  const NotifyNotUpdated = () => toast("Appointment Not Updated!");

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

  const Postpost = async () => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        id: uuid(),
        appointmentDate: Moment(appointmentDate).format("yyyy-MM-DDTHH:mm:ss"),
        appointmentStartTime:
          Moment(appointmentDate).format("yyyy-MM-DDT") + startTime + ":00",
        appointmentEndTime:
          Moment(appointmentDate).format("yyyy-MM-DDT") + endTime + ":00",
        appointmentContent: appointmentcontent,
        location: location,
        description: description,
        color: color,
        appointmentStatus: appointmentStatus,
      }),
    })
      .then((res) => {
        if (res.status == 201) {
          setCount(count + 1);
          return res.json();
        } else {
          return res.status;
        }
      })
      .then((res) => {
        res == 409 ? NotifyNotCreated() : NotifyCreated();
      });
    setAppointmentValue(!appointmentValue);
    setappointmentcontent(" ");
  };

  const Postpatch = (Addid) => {
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
        patchappointmentStatus: appointmentStatus,
      }),
    })
      .then((res) => {
        if (res.status == 201) {
          setCount(count + 1);
          return res.json();
        } else {
          return res.status;
        }
      })
      .then((res) => {
        res == 409 ? NotifyNotUpdated() : NotifyUpdated();
      });
  };

  const Postdelete = async (uid) => {
    if (window.confirm("Do you want delete this event?")) {
      await fetch(url + "/" + uid, {
        method: "DELETE",
        headers: {
          authToken: "token",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          res.json();
          setCount(count + 1);
        })
        .then((res) => {});
    }
  };
  return (
    <Requiredvalue.Provider
      value={{
        patchName,
        setPatchName,
        description,
        setDescription,
        location,
        setLocation,
        allAppointment,
        setAllAppointment,
        allAppointmentFilter,
        setAllAppointmentFilter,
        appointmentDate,
        Meetingoverview,
        Postdelete,
        Postpatch,
        Postpost,
        appointmentValue,
        data,
        name,
        patchContent,
        patchEndTime,
        patchId,
        patchStartTime,
        setAppointmentDate,
        setMeetingOverview,
        setappointmentcontent,
        setAppointmentValue,
        setEndTime,
        setPatchContent,
        setPatchEndTime,
        setPatchId,
        setPatchStartTime,
        setStartTime,
        setValueForPatch,
        setvalueForPatchEdit,
        valueForPatch,
        valueForPatchEdit,
        appointmentView,
        setAppointmentView,
        startTimeValue,
        setStartTimeValue,
        endTimeValue,
        setEndTimeValue,
        appointmentStatus,
        setAppointmenStatus,
        color,
        setColor,
        contentBlockDate,
        setContentBlockDate,
        contentBlockWeak,
        setContentBlockWeek,
        contentBlockMonth,
        setContentBlockMonth,
      }}
    >
      <div className="calenderbar">
        <div className="calenderbar--appointmentlist">
          <ToastContainer />
          <LogoWithTabs></LogoWithTabs>
          {Meetingoverview && <MeetingOverview></MeetingOverview>}
          {appointmentView && (
            <div className="calenderbar--datewithcontent">
              {contentBlockDate && (
                <div className="calenderbar--datewithcontent">
                  <CreateBlock></CreateBlock>
                  <div>
                    <ContentBlock></ContentBlock>
                    {valueForPatch && <PatchValue></PatchValue>}
                    {appointmentValue && <AddAppointment></AddAppointment>}
                  </div>
                </div>
              )}
              {contentBlockWeak && (
                <div className="calenderbar--datewithcontent">
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
        </div>
      </div>
    </Requiredvalue.Provider>
  );
}
export default Calenderbar;
