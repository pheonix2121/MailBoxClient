import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Inbox from "./components/Pages/Inbox";
import Sent from "./components/Pages/Sent";
import Draft from "./components/Pages/Draft";

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

        </Routes>
      </Router>
    </div>
  );
};

export default App;