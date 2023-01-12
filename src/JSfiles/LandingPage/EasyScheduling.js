import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import calender from "../pictures/calender.png";
import Aos from "aos";

export default function EasyScheduling() {
  const [name, setName] = useState(null);

  const SetNameForPage = () => {
    sessionStorage.setItem("Feed", name);
  };
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="easyscheduling">
      <div className="easyscheduling--one">
        <div className="easyscheduling--one--right">
          <h1 aria-expanded="false" className="easyscheduling--welcome">
            Easy
            <br /> scheduling
            <span className="easyscheduling--simpl"> ahead</span>
          </h1>
          <h2 className="easyscheduling--Organized">
            Organized life equals success.
          </h2>
          <div className="easyscheduling--Book">
            Book your appointment in a few simple steps:<br></br>
            Pick your date and valuable time and fill in appointment details
            thats it.
          </div>
          <form>
            <div class="form--group field">
              <input
                type="input"
                class="form--field"
                placeholder="Name"
                value={name}
                id="name"
                name="name"
                required
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <label for="name" class="form--label">
                Name
              </label>
            </div>
            <Link to="/appointmentView">
              <a href="#" class="double-side-button">
                <span onClick={SetNameForPage()}>Get Started</span>
              </a>
            </Link>
          </form>
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
  );
}
