import React, { useState } from "react";

import { Button, Image, Box, Dialog } from "@mui/material";
import { useParams } from "react-router-dom";
import EditLocationForm from "../--FORM/EditLocationForm";
import PlaceObjectForm from "../../-OBJECT-LOCATION/--FORM/PlaceObjectForm";
import {
  useCurrentLocationData,
  useMainLocationContex,
} from "../../LocationPage";
import MoveLocationSearch from "../--FORM/---MOVE-LOCATION/MoveLocationSearch";
import { useApiURLContex } from "../../../../App";
import LocationDetail from "./LocationDetail";

/* const CurrentLocationDataContex = React.createContext();
export const useCurrentLocationData = () => {
  return useContext(CurrentLocationDataContex);
}; */

const LocationCurrent = () => {
  const { ApiURL } = useApiURLContex();
  let { mainID, locationID } = useParams();
  // const [locationInfo, setLocationInfo] = useState({});
  const { accessLvl } = useMainLocationContex();
  const { locationInfo } = useCurrentLocationData();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [openDetailState, setOpenDetailState] = useState(false);

  const openEdit = () => {
    setOpen(true);
  };
  const closeEdit = () => {
    setOpen(false);
  };
  const openPlace = () => {
    setOpen2(true);
  };
  const closePlace = () => {
    setOpen2(false);
  };
  const openMove = () => {
    setOpen3(true);
  };
  const closeMove = () => {
    setOpen3(false);
  };
  const openDetail = () => {
    setOpenDetailState(true);
  };
  const closeDetail = () => {
    setOpenDetailState(false);
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
      <Box
        fullWidth
        style={{
          padding: "10px 10px 10px 0px",
          margin: "5px",
          borderRadius: "5px",
          backgroundColor: "#b3d8f8",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box>
          {locationInfo.Photo != 0 && (
            <Box
              marginLeft="10px"
              component="img"
              fullWidth
              maxHeight="300px"
              maxWidth="300px"
              src={`${ApiURL}/image/readImageLocation.php?id1=${mainID}&id2=${locationID}`}
              onClick={openDetail}
            />
          )}
        </Box>
        <Box marginLeft="10px">
          {locationInfo && (
            <Box>
              <Box fontSize={18}>
                Location: <b>{locationInfo.Name}</b>
              </Box>
              <Box marginTop="10px">
                Description:
                {locationInfo.Description}
              </Box>
            </Box>
          )}
          <Box marginTop="10px">
            <Button
              variant="contained"
              onClick={openEdit}
              disabled={accessLvl < 3}
            >
              Edit Location
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={openPlace}
              disabled={accessLvl < 2}
            >
              Place Object
            </Button>
            <Button
              variant="contained"
              onClick={openMove}
              disabled={accessLvl < 3}
            >
              Move Location
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={open} onClose={closeEdit}>
        <EditLocationForm locData={locationInfo} closeEdit={closeEdit} />
      </Dialog>

      <Dialog open={open2} onClose={closePlace} fullWidth maxWidth="70%">
        {/* <CurrentLocationDataContex.Provider value={{ locationInfo }}> */}
        <PlaceObjectForm />
        {/* </CurrentLocationDataContex.Provider> */}
      </Dialog>
      <Dialog open={open3} onClose={closeMove} fullWidth maxWidth="70%">
        <MoveLocationSearch />
      </Dialog>
      <Dialog open={openDetailState} onClose={closeDetail} maxWidth="80%">
        <LocationDetail locData={locationInfo} />
      </Dialog>
    </>
  );
};

export default LocationCurrent;
