import React, { useContext, useState } from "react";

import { Box, Button, Card, CardMedia, Dialog } from "@mui/material";
import { useParams } from "react-router-dom";
import EditLocationForm from "../--FORM/EditLocationForm";
import PlaceObjectForm from "../../-OBJECT-LOCATION/--FORM/PlaceObjectForm";
import {
  useCurrentLocationData,
  useMainLocationContex,
} from "../../LocationPage";
import MoveLocationSearch from "../--FORM/---MOVE-LOCATION/MoveLocationSearch";

/* const CurrentLocationDataContex = React.createContext();
export const useCurrentLocationData = () => {
  return useContext(CurrentLocationDataContex);
}; */

const LocationCurrent = () => {
  let { mainID, locationID } = useParams();
  // const [locationInfo, setLocationInfo] = useState({});
  const { accessLvl } = useMainLocationContex();
  const { locationInfo } = useCurrentLocationData();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  const openHandler2 = () => {
    setOpen2(true);
  };
  const closeHandler2 = () => {
    setOpen2(false);
  };
  const openHandler3 = () => {
    setOpen3(true);
  };
  const closeHandler3 = () => {
    setOpen3(false);
  };

  /* const fetchLocationInfo = async () => {
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("locationID", locationID);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Location/getLocationInfo.php",
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

      console.log(result);
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
  };

  useState(() => {
    fetchLocationInfo();
  }, []); */
  return (
    <>
      <Card
        style={{
          display: "flex",
          padding: "4px",
          margin: "5px",
          backgroundColor: "#b3d8f8",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {locationInfo.Photo != 0 && (
            <CardMedia
              component="img"
              height="250"
              image={`http://localhost/PhotoInventory/Backend/api/readImageLocation.php?id1=${mainID}&id2=${locationID}`}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", margin: "3px" }}>
          {locationInfo && (
            <>
              <Box>
                <i>Location Name: </i> <b>{locationInfo.Name}</b>
              </Box>
              <Box>
                <i>Description: </i>
                {locationInfo.Description}
              </Box>
            </>
          )}
          <Box>
            <Button
              variant="contained"
              onClick={openHandler}
              disabled={accessLvl < 3}
            >
              Edit Location
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={openHandler2}
              disabled={accessLvl < 2}
            >
              Place Object
            </Button>
            <Button
              variant="contained"
              onClick={openHandler3}
              disabled={accessLvl < 3}
            >
              Move Location
            </Button>
          </Box>
        </Box>
      </Card>
      <Dialog open={open} onClose={closeHandler}>
        <EditLocationForm locData={locationInfo} closeHandler={closeHandler} />
      </Dialog>

      <Dialog open={open2} onClose={closeHandler2} fullWidth maxWidth="70%">
        {/* <CurrentLocationDataContex.Provider value={{ locationInfo }}> */}
        <PlaceObjectForm />
        {/* </CurrentLocationDataContex.Provider> */}
      </Dialog>
      <Dialog open={open3} onClose={closeHandler3} fullWidth maxWidth="70%">
        <MoveLocationSearch />
      </Dialog>
    </>
  );
};

export default LocationCurrent;
