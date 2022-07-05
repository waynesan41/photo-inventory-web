import React, { useState } from "react";

import { Box, Button, Card, CardMedia, Dialog } from "@mui/material";
import { useParams } from "react-router-dom";
import EditLocationForm from "../--FORM/EditLocationForm";
import PlaceLocationForm from "../--FORM/PlaceLocationForm";

const LocationCurrent = () => {
  let { mainID, locationID } = useParams();
  const [locationInfo, setLocationInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [formType, setSetFormType] = useState(0);

  const openHandler = (type) => {
    setSetFormType(type);
    setOpen(true);
  };
  const closeHandler = () => {
    setSetFormType(0);
    setOpen(false);
  };

  const fetchLocationInfo = async () => {
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
      if (result === "0") {
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
  }, []);
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
              onClick={() => {
                openHandler(1);
              }}
            >
              Edit Location
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                openHandler(2);
              }}
            >
              Place Object
            </Button>
          </Box>
        </Box>
      </Card>
      <Dialog open={open} onClose={closeHandler}>
        {formType == 1 && <EditLocationForm locData={locationInfo} />}
        {formType == 2 && <PlaceLocationForm />}
      </Dialog>
    </>
  );
};

export default LocationCurrent;
