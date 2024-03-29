import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiURLContex } from "../../App";

import LinearProgress from "@mui/material/LinearProgress";

import LocationBread from "./-COMPONENTS/--FETCH/LocationBread";
import LocationCurrent from "./-COMPONENTS/--FETCH/LocationCurrent";
import LocationList from "./-COMPONENTS/--FETCH/LocationList";
import OwnMainMenu from "./-MENU/OwnMainMenu";
import ShareMainMenu from "./-MENU/ShareMainMenu";
import PlaceObjectList from "./-OBJECT-LOCATION/PlaceObjectList";

const CurrentLocationDataContex = React.createContext();
export const useCurrentLocationData = () => {
  return useContext(CurrentLocationDataContex);
};

const MainLocationContex = React.createContext();
export const useMainLocationContex = () => {
  return useContext(MainLocationContex);
};

const LocationPage = () => {
  const { ApiURL } = useApiURLContex();
  let { mainID, locationID } = useParams(); // Value from URL
  const [mainType, setMainType] = useState();
  const [accessLvl, setAccessLvl] = useState();
  const [locationInfo, setLocationInfo] = useState({});
  const [loadCheck, setLoadCheck] = useState(false);

  const fetchLocationInfo = async () => {
    setLoadCheck(true);
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("locationID", locationID);

    const fetchURL = `${ApiURL}/location/getLocationInfo.php`;
    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      // console.log(result);
      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else if (result == "DENY") {
        console.log("Access Deny");
        console.log(result);
        setLocationInfo({});
      } else {
        setLocationInfo(result);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadCheck(false);
  };
  const fetchMainAccessInfo = async () => {
    setLoadCheck(true);
    const data = new FormData();
    data.append("mainID", mainID);
    const fetchURL = `${ApiURL}/location/checkAccess.php`;

    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === 5) {
        setMainType(0);
      } else if (result === 4) {
        setMainType(1);
      } else if (result > 0 && result < 4) {
        setMainType(2);
        setAccessLvl(result);
      } else {
        console.log(result);
        console.log("fail to fetch");
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadCheck(false);
  };

  useEffect(() => {
    if (locationID !== "0") {
      fetchLocationInfo();
    }
    fetchMainAccessInfo();
  }, []);
  return (
    <>
      {loadCheck && <LinearProgress />}
      <MainLocationContex.Provider value={{ mainID, mainType, accessLvl }}>
        {mainType == 0 && <h3>Sorry You don't have Access to the Location</h3>}
        {mainType == 1 && <OwnMainMenu mainID={mainID} />}
        {mainType == 2 && <ShareMainMenu mainID={mainID} />}
        {mainType != 0 && <LocationBread />}

        <CurrentLocationDataContex.Provider value={{ locationInfo }}>
          {mainType != 0 && locationID != 0 && <LocationCurrent />}
          {/* {(mainType == 1 || mainType == 2) && <LocationList />} */}
          {(mainType == 1 || mainType == 2) && <LocationList />}
          {(mainType == 1 || mainType == 2) && <PlaceObjectList />}
        </CurrentLocationDataContex.Provider>
      </MainLocationContex.Provider>
    </>
  );
};
export default LocationPage;
