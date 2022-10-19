import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useMainLocationContex } from "../../../LocationPage";
import { useParams } from "react-router-dom";
import OneLocationMoveTo from "./OneLocationMoveTo";
import { useApiURLContex } from "../../../../../App";

const MoveLocationSearch = (props) => {
  const { ApiURL } = useApiURLContex();
  let { mainID } = useParams();
  const { mainType } = useMainLocationContex();
  const [locationList, setLocationList] = useState([]);
  const [loadList, setLoadList] = useState(false);
  const baseLocation = {
    LocationID: 0,
    MainLocationID: mainID,
    Name: "Base Location",
  };

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
    setLoadList(false);
  };
  return (
    <Box
      style={{
        margin: "15px 0px 5px 0px",
        display: "grid",
        padding: "10px",
        gridGap: "5px",
      }}
    >
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
      {loadList && <LinearProgress />}
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: " 1fr 1fr 1fr 1fr" },
        }}
      >
        <OneLocationMoveTo locationData={baseLocation} />
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
            <OneLocationMoveTo locationData={obj} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MoveLocationSearch;
