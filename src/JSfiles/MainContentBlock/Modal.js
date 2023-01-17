import React from "react";
import { useContext } from "react";
import { Requiredvalue } from "../MainContent";
import cancelicon from "../pictures/cancelicon.png";

function Modal() {
  const value = useContext(Requiredvalue);
  return (
    <div className="maincontentblock--delete--block ">
      <div className="modal--dialog modal--confirm">
        <div className="modal--content">
          <div className="modal--header flex--column">
            <div className="icon--box">
              <img src={cancelicon} className="modal--cancelicon"></img>
            </div>
            <h4 className="modal--title w--100">Are you sure?</h4>
            <button
              type="button"
              className="close"
              data--dismiss="modal"
              aria--hidden="true"
              onClick={() => {
                value.setIsOpen(false);
              }}
            >
              <img src={cancelicon} className="modal--cancelicond"></img>
            </button>
          </div>
          <div className="modal--body">
            <p>
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
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => {
                value.setIsOpen(false);
                value.Postdelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
