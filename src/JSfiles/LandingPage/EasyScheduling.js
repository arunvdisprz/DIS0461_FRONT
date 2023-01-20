import React, { useEffect, useState } from "react";
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
  return (
    <div aria-label="Easy Scheduling Page">
      {/* The sign-in section is only displayed when the signIn state is set to true.
       Users can enter their name and continue to the next step by clicking the 'Continue' button.*/}
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
              className="easyscheduling-side-button"
              aria-label="Get Started button"
            >
              {/* Users can get started by clicking the 'Get Started' button,
             which sets the signIn state to true and displays the sign-in section. */}
              <span onClick={(e) => setSignIn(true)}>Get Started</span>
            </a>
          </div>
        </div>
        <div aria-label="Calendar Image">
          <img
            src={calender}
            className="easyscheduling--image"
            data-aos="fade-up"
            alt="Calendar Image"
          ></img>
        </div>
      </div>
    </div>
  );
}
