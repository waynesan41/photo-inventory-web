import React from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ObjectLocation from "./Pages/ObjectLocation";
import MainLocation from "./Pages/MainLocation";
import Profile from "./Pages/Profile";
import Library from "./Pages/Library";
import ErrorPage from "./Pages/ErrorPage";
import LogInPage from "./Pages/LogInPage";
import NavBar from "./Pages/NavBar";
import Connection from "./Pages/Connection";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Login" element={<LogInPage />} />
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<ObjectLocation />} />
            <Route path="/ObjectLocation" element={<ObjectLocation />} />
            <Route path="/MainLocation" element={<MainLocation />} />
            <Route path="/Library" element={<Library />} />
            <Route path="/Connection" element={<Connection />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
