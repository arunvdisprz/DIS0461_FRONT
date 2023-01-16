import React, { useEffect, useState } from "react";
import calender from "../pictures/calender.png";
import cancelicon from "../pictures/cancelicon.png";
import { useNavigate } from "react-router-dom";
import Aos from "aos";

export default function EasyScheduling() {
  const [name, setName] = useState(null);
  const [signIn, setSignIn] = useState(false);
  const navigate = useNavigate();

  const SetUserName = () => {
    sessionStorage.setItem("Feed", name);
  };
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div>
      {signIn && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SetUserName();
            navigate("/appointmentView");
          }}
        >
          <div className="easyscheduling--signin">
            <div className="easyscheduling--signin--block">
              <img
                src={cancelicon}
                className="easyscheduling--signin--cancelicon"
                onClick={(e) => setSignIn(false)}
              ></img>
              <div className="easyscheduling--signin--free">
                Sign up for free
              </div>
              <div className="easyscheduling--signin--full">
                Full access. No credit card needed.
              </div>
              <div>
                <input
                  type="input"
                  className="easyscheduling--signin--input"
                  placeholder="Enter your name"
                  value={name}
                  id="name"
                  name="name"
                  required
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  className="easyscheduling--signin--button"
                  type="submit"
                >
                  <span>Continue</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <div className="easyscheduling">
        <div className="easyscheduling--one">
          <div className="easyscheduling--one--right">
            <h1 aria-expanded="false" className="easyscheduling--welcome">
              Easy
              <br /> scheduling
              <span className="easyscheduling--simpl"> ahead</span>
            </h1>
            <h2 className="easyscheduling--organized">
              Organized life equals success.
            </h2>
            <div className="easyscheduling--book">
              Book your appointment in a few simple steps:<br></br>
              Pick your date and valuable time and fill in appointment details
              thats it.
            </div>
            <a className="easyscheduling-side-button">
              <span onClick={(e) => setSignIn(true)}>Get Started</span>
            </a>
          </div>
        </div>
        <div>
          <img
            src={calender}
            className="easyscheduling--image"
            data-aos="fade-up"
          ></img>
        </div>
      </div>
    </div>
  );
}
