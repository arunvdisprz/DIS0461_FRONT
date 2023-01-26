import React from "react";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import cancelIcon from "../pictures/cancelicon.png";

export default function Modal() {
  const value = useContext(Requiredvalue);
  // The body contains a message asking the user to confirm the deletion of the appointment.
  // The footer contains two buttons, one for canceling the deletion and another for confirming the deletion.
  return (
    <div
      className="maincontentblock--delete--block"
      aria-label="Delete appointment modal"
    >
      <div
        className="modal--dialog modal--confirm"
        aria-label="Confirmation dialog"
      >
        <div className="modal--content">
          <div className="modal--header flex--column">
            <div className="icon--box">
              <img
                src={cancelIcon}
                className="modal--cancelicon"
                alt="Cancel icon"
              ></img>
            </div>
            <h4 className="modal--title w--100">Are you sure?</h4>
            <button
              type="button"
              className="close"
              data--dismiss="modal"
              aria-hidden="true"
              onClick={() => {
                value.setIsOpen(false);
              }}
              aria-label="Close modal"
            >
              <img
                src={cancelIcon}
                className="modal--cancelicond"
                alt="Close icon"
              ></img>
            </button>
          </div>
          <div className="modal--body">
            <p aria-label="Delete appointment confirmation message">
              Do you really want to delete these appointment? This process
              cannot be undone.
            </p>
          </div>
          <div className="modal--footer justify--content--center">
            <button
              type="button"
              className="btn btn--secondary"
              data--dismiss="modal"
              onClick={() => {
                value.setIsOpen(false);
              }}
              aria-label="Cancel delete appointment"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => {
                value.setIsOpen(false);
                value.appointmentDelete();
              }}
              aria-label="Delete appointment"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
