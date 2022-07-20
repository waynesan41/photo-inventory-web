import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useMainLocationContex } from "../../../LocationPage";
import { useParams } from "react-router-dom";
import OneLocationMoveTo from "./OneLocationMoveTo";

const MoveLocationSearch = (props) => {
  let { mainID, locationID } = useParams();
  const { mainType } = useMainLocationContex();
  const [locationList, setLocationList] = useState([]);
  const baseLocation = {
    LocationID: 0,
    MainLocationID: mainID,
    Name: "Base Location",
  };

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
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
