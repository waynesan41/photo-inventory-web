import React, { useContext, useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLocation from "./Pages/MainLocation";
import Profile from "./Pages/Profile";
import Library from "./Pages/Library";
import ErrorPage from "./Pages/ErrorPage";
import LogInPage from "./Pages/LogInPage";
import NavBar from "./Pages/NavBar";
import Connection from "./Pages/Connection";

import BlockedUserList from "./components/connection/block/BlockedUserList";
import RequestFromList from "./components/connection/requestFrom/RequestFromList";
import ConnectedUser from "./components/connection/connect/ConnectedUserList";
import RequestToList from "./components/connection/requestTo/RequestToList";
import SearchUserList from "./components/connection/search/SearchUserList";

import ObjectLibrary from "./components/OBJECT/ObjectLibrary";
import LocationPage from "./components/LOCATION/LocationPage";

const ApiURLContex = React.createContext();
export const useApiURLContex = () => {
  return useContext(ApiURLContex);
};

function App() {
  const ApiURL = "http://localhost/PhotoInventory/Backend/api";

  /* const [ApiURL, setApiURL] = useState(
    window.location.origin + "/PhotoInventory/Backend/api"
  ); */
  const yourHandler = () => {
    console.log("Router Change is Called!");
  };
  return (
    <>
      <ApiURLContex.Provider value={{ ApiURL }}>
        <Router onChange={yourHandler}>
          <Routes>
            <Route path="/Login" element={<LogInPage />} />
            <Route path="/" element={<NavBar />}>
              <Route path="/" element={<MainLocation />} />
              <Route path="/MainLocation/" element={<MainLocation />} />
              <Route path="/MainLocation/:mainID" element={<LocationPage />} />
              <Route
                path="/MainLocation/:mainID/:locationID"
                element={<LocationPage />}
              />

              <Route path="/Library" element={<Library />} />
              <Route path="/Library/:libraryID" element={<ObjectLibrary />} />

              <Route path="/Connection" element={<Connection />}>
                <Route path="/Connection/" element={<ConnectedUser />} />
                <Route path="/Connection/Search" element={<SearchUserList />} />
                <Route path="/Connection/Connect" element={<ConnectedUser />} />
                <Route
                  path="/Connection/RequestTo"
                  element={<RequestToList />}
                />
                <Route
                  path="/Connection/RequestFrom"
                  element={<RequestFromList />}
                />
                <Route path="/Connection/Block" element={<BlockedUserList />} />
              </Route>
              <Route path="/Profile" element={<Profile />} />
              <Route path="/*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </Router>
      </ApiURLContex.Provider>
    </>
  );
}

export default App;
