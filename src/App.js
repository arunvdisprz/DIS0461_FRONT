import React from "react";
import "./App.css";
import LandingPage from "./Component/LandingPage";
import MainContent from "./Component/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      {/* React Router to handle routing and navigation between the pages. */}
      <BrowserRouter>
        <Routes>
          {/* /: This route renders the LandingPage component */}
          <Route
            path="/"
            element={
              <div aria-label="Landing Page">
                <LandingPage></LandingPage>
              </div>
            }
          ></Route>
          {/* /appointmentView: This route renders the MainContent component */}
          <Route
            path="/appointmentView"
            element={
              <div aria-label="Main Content">
                <MainContent></MainContent>
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
