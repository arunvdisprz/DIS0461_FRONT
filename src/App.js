import "./App.css";
import "../src/SCSSfiles/AddAppointment.scss";
import Calenderbar from "./JSfiles/MainContent";
import React from "react";
import LandingPage from "./JSfiles/LandingPage";
import "../src/SCSSfiles/CreateBlock.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <LandingPage></LandingPage>
              </div>
            }
          ></Route>
          <Route
            path="/appointmentView"
            element={
              <div>
                <Calenderbar></Calenderbar>
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
