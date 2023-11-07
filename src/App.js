import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Inbox from "./components/Pages/Inbox";
import Sent from "./components/Pages/Sent";
import Draft from "./components/Pages/Draft";
import ShowMail from "./components/ShowMail";
import ShowSentMails from "./components/ShowSentMails";
const App = () => {


  return (
    <div >
      <Router>
      <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/inbox" element={<Inbox />} />
          <Route exact path="/sent" element={<Sent />} />
          <Route exact path="/drafts" element={<Draft />} />
          <Route exact path="/emails/:id" element={<ShowMail />} />
          <Route path="/sent/:id" element={<ShowSentMails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;