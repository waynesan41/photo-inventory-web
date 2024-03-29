import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useMainLocationContex } from "../../LocationPage";
import LocationOne from "./LocationOne";
import { useApiURLContex } from "../../../../App";

const LocationList = () => {
  const { ApiURL } = useApiURLContex();
  let { mainID, locationID } = useParams();
  const { mainType } = useMainLocationContex();
  const [locationList, setLocationList] = useState([]);
  const [loadList, setLoadList] = useState(false);

  const fetchSearchLocation = async (event) => {
    setLoadList(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("mainID", mainID);
    data.append("locType", mainType);
    const fetchURL = `${ApiURL}/location/searchLocation.php`;

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
    setLoadList(false);
  };

  const fetchGetLocation = async () => {
    setLoadList(true);
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("locType", mainType);
    data.append("topID", locationID);
    const fetchURL = `${ApiURL}/location/getLocation.php`;

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
      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "DENY" || result == "FAIL" || result == "INVALID") {
        setLocationList([]);
        // console.log("NO ACCESS OR NO LOCATION FOUND.");
      } else {
        setLocationList([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadList(false);
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
      <Box marginLeft={1}>
        {loadList && <LinearProgress />}
        {loadList && <Box fontSize={20}>Loading Locations....</Box>}
        {!locationList.length && !loadList && (
          <Box fontSize={20}>There NO locationList Found!</Box>
        )}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
        }}
      >
        {locationList.map((obj) => (
          <Box
            sx={{ boxShadow: 5 }}
            key={obj.LocationID}
            style={{
              margin: "4px",
              border: "3px solid #3867d6",
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
