import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

import { useMainLocationContex } from "../../LocationPage";
import LocationOne from "./LocationOne";

const LocationList = () => {
  let { mainID, locationID } = useParams();
  const { mainType } = useMainLocationContex();
  const [locationList, setLocationList] = useState([]);

  const fetchSearchLocation = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("mainID", mainID);
    data.append("locType", mainType);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/location/searchLocation.php",
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
      } else if (result === "NO LOCATION") {
        setLocationList([]);
        console.log("NO LOCATION FOUND");
      } else {
        setLocationList([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchGetLocation = async () => {
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("locType", mainType);
    data.append("topID", locationID);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/location/getLocation.php",
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
      } else if (result === "DENY" || result == "FAIL" || result == "INVALID") {
        setLocationList([]);
        console.log("No Access or No Location Here");
      } else {
        setLocationList([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchGetLocation();
  }, []);
  return (
    <Box>
      <Box
        style={{
          margin: "9px 5px 0px 5px",
          display: "grid",
          gridGap: "5px",
          gridTemplateColumns: "7fr 1fr",
        }}
        component="form"
        onSubmit={fetchSearchLocation}
      >
        <TextField name="search" label="Search Location" required></TextField>
        <Button variant="outlined" type="submit">
          Search
        </Button>
      </Box>
      {!locationList.length && <>There NO locationList Found</>}
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {locationList.map((obj) => (
          <Box
            sx={{ boxShadow: 5 }}
            key={obj.LocationID}
            style={{
              margin: "4px",
              border: "3px solid green",
              borderRadius: "5px",
            }}
          >
            <LocationOne locationData={obj} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LocationList;
