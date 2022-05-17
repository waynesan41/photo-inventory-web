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

import BlockedUserList from "./components/connection/block/BlockedUserList";
import RequestFrom from "./components/connection/requestFrom/RequestFrom";
import ConnectedUser from "./components/connection/connect/ConnectedUser";
import SearchUser from "./components/connection/search/SearchUser";
import RequestToList from "./components/connection/requestTo/RequestToList";

function App() {
  const yourHandler = () => {
    console.log("Router Change is Called!");
  };
  return (
    <div>
      <Router onChange={yourHandler}>
        <Routes>
          <Route path="/Login" element={<LogInPage />} />
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<ObjectLocation />} />
            <Route path="/ObjectLocation" element={<ObjectLocation />} />
            <Route path="/MainLocation" element={<MainLocation />} />
            <Route path="/Library" element={<Library />} />
            <Route path="/Connection" element={<Connection />}>
              <Route path="/Connection/" element={<ConnectedUser />} />
              <Route path="/Connection/Search" element={<SearchUser />} />
              <Route path="/Connection/Connect" element={<ConnectedUser />} />
              <Route path="/Connection/RequestTo" element={<RequestToList />} />
              <Route path="/Connection/RequestFrom" element={<RequestFrom />} />
              <Route path="/Connection/Block" element={<BlockedUserList />} />
            </Route>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
