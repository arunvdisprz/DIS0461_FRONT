import React, { useState } from "react";
import calender from "../pictures/calender.png";
import cancelicon from "../pictures/cancelicon.png";
import { useNavigate } from "react-router-dom";
// import Aos from "aos";

export default function EasyScheduling() {
  const [name, setName] = useState(null);
  const [signIn, setSignIn] = useState(false);
  const navigate = useNavigate();

  // When the form is submitted, the name entered is stored in session storage
  // And the user is navigated to the appointment view page.

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("Feed", name);
    navigate("/appointmentView");
  };

  const SignInForm = ({ handleSubmit, name, setName, setSignIn }) => {
    return (
      <form onSubmit={handleSubmit} aria-label="Sign in form">
        <div className="easyscheduling--signin" aria-label="Sign in section">
          <div className="easyscheduling--signin--block">
            <img
              src={cancelicon}
              className="easyscheduling--signin--cancelicon"
              onClick={() => setSignIn(false)}
              alt="Cancel sign in button"
              aria-label="Cancel sign in button"
            ></img>
            <div
              className="easyscheduling--signin--free"
              aria-label="Sign up for free message"
            >
              Sign up for free
            </div>
            <div
              className="easyscheduling--signin--full"
              aria-label="Full access message"
            >
              Full access. No charges required.
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
                aria-label="Name input field"
              />
              <button
                className="easyscheduling--signin--button"
                type="submit"
                aria-label="Continue button"
              >
                <span>Continue</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const Scheduling = () => {
    return (
      <div className="easyscheduling" aria-label="Easy scheduling section">
        <div className="easyscheduling--one">
          <div className="easyscheduling--one--right">
            <h1
              className="easyscheduling--welcome"
              aria-label=" Easy scheduling ahead"
            >
              Easy
              <br /> scheduling
              <span className="easyscheduling--simpl"> ahead</span>
            </h1>
            <h2
              className="easyscheduling--organized"
              aria-label="Organized life message"
            >
              Organized life equals success.
            </h2>
            <div
              className="easyscheduling--book"
              aria-label="Booking instructions"
            >
              Book your appointment in a few simple steps:<br></br>
              Pick your date and valuable time and fill in appointment details
              thats it.
            </div>
            <a
              href="#"
              className="easyscheduling-side-button"
              aria-label="Get Started button"
              onClick={() => setSignIn(true)}
            >
              <span>Get Started</span>
            </a>
          </div>
        </div>
        <div aria-label="CalendarImage">
          <img
            src={calender}
            className="easyscheduling--image"
            data-aos="fade-up"
            alt="Calendar Image"
          ></img>
        </div>
      </div>
    );
  };

  return (
    <div aria-label="Easy Scheduling Page">
      {signIn && (
        <form onSubmit={handleSubmit} aria-label="Sign in form">
          <div className="easyscheduling--signin" aria-label="Sign in section">
            <div className="easyscheduling--signin--block">
              <img
                src={cancelicon}
                className="easyscheduling--signin--cancelicon"
                onClick={() => setSignIn(false)}
                alt="Cancel sign in button"
                aria-label="Cancel sign in button"
              ></img>
              <div
                className="easyscheduling--signin--free"
                aria-label="Sign up for free message"
              >
                Sign up for free
              </div>
              <div
                className="easyscheduling--signin--full"
                aria-label="Full access message"
              >
                Full access. No charges required.
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
                  aria-label="Name input field"
                />
                <button
                  className="easyscheduling--signin--button"
                  type="submit"
                  aria-label="Continue button"
                >
                  <span>Continue</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      {Scheduling()}
    </div>
  );
}
