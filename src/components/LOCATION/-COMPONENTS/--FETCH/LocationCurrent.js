import React, { useState } from "react";

import { Box, Button, Card, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";

const LocationCurrent = () => {
  let { mainID, locationID } = useParams();
  const [locationInfo, setLocationInfo] = useState({});

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
          <CardMedia
            component="img"
            height="250"
            image={`http://localhost/PhotoInventory/Backend/api/readImageLocation.php?id1=${mainID}&id2=${locationID}`}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {locationInfo && (
            <>
              <Box>Location Name: {locationInfo.Name} </Box>
              <Box>Description: {locationInfo.Description} </Box>
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

export default LocationCurrent;
