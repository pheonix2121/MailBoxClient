import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Inbox from "./components/Pages/Inbox";
import Sent from "./components/Pages/Sent";
import Draft from "./components/Pages/Draft";
import ShowMail from "./components/ShowMail";
import ShowSentMails from "./components/ShowSentMails";
import { useSelector } from "react-redux";
import "./App.css";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  return (
    <div>
      <Router>
        <Routes>
          {!isLoggedIn && <Route path="/" element={<LoginPage />} />}
          {isLoggedIn && (
            <Route
              path="/*"
              element={
                <div className="container">
                  <div className="container-left">
                    <Home />
                  </div>
                  <div className="container-right">
                    <Routes>
                    <Route path="/" element={<Inbox />} />
                      <Route path="/sent" element={<Sent />} />

                      <Route path="/drafts" element={<Draft />} />
                      <Route path="/emails/:id" element={<ShowMail />} />
                      <Route path="/sent/:id" element={<ShowSentMails />}/>
                    </Routes>
                  </div>
                </div>
              }
            />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;