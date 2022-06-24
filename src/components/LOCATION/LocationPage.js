import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationBread from "./-COMPONENTS/--FETCH/LocationBread";
import LocationCurrent from "./-COMPONENTS/--FETCH/LocationCurrent";
import LocationList from "./-COMPONENTS/--FETCH/LocationList";
import OwnMainMenu from "./-MENU/OwnMainMenu";
import ShareMainMenu from "./-MENU/ShareMainMenu";

const MainLocationContex = React.createContext();
export const useMainLocationContex = () => {
  return useContext(MainLocationContex);
};

const LocationPage = () => {
  let { mainID, locationID } = useParams(); // Value from URL
  const [mainType, setMainType] = useState();
  const [accessLvl, setAccessLvl] = useState();

  const fetchMainAccessInfo = async () => {
    const data = new FormData();
    data.append("mainID", mainID);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Location/checkAccess.php",
        {
          method: "POST",
          credentials: "include",
          body: data,
        }
      );
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
  };

  useEffect(() => {
    fetchMainAccessInfo();
  }, []);
  return (
    <>
      {/* <h2>Main ID: {mainID}</h2>
      <h2>Location ID: {locationID}</h2> */}
      <MainLocationContex.Provider value={{ mainID, mainType, accessLvl }}>
        {mainType == 0 && <h3>Sorry You don't have Access to the Library</h3>}
        {mainType == 1 && <OwnMainMenu mainID={mainID} />}
        {mainType == 2 && <ShareMainMenu />}
        {mainType != 0 && <LocationBread />}
        {mainType != 0 && locationID != 0 && <LocationCurrent />}
        {/* {(mainType == 1 || mainType == 2) && <LocationList />} */}
        {(mainType == 1 || mainType == 2) && <LocationList />}
      </MainLocationContex.Provider>
    </>
  );
};
export default LocationPage;
