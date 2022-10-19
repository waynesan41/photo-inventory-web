import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Box, TextField } from "@mui/material";

import { useMainLocationContex } from "../LocationPage";
import PlacedObjectOne from "./--COMPONENTS/PlacedObjectOne";
import { useApiURLContex } from "../../../App";
import LinearProgress from "@mui/material/LinearProgress";

const PlaceObjectList = () => {
  const { ApiURL } = useApiURLContex();
  let { mainID, locationID } = useParams();
  const { mainType } = useMainLocationContex();
  const [loadList, setLoadList] = useState(false);

  const [placeObjList, setPlaceObjList] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchSearchLocation = () => {
    console.log("Search Location");
  };
  const fetchPlaceObject = async () => {
    setLoadList(true);
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("locID", locationID);
    data.append("type", mainType);
    const fetchURL = `${ApiURL}/objectLocation/getObjLoc.php`;

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
      } else if (
        result === "DENY" ||
        result === "FAIL" ||
        result === "INVALID" ||
        result === "NO OBJECT"
      ) {
        setPlaceObjList([]);
      } else {
        setPlaceObjList([...result]);
      }
      // console.log(result);
    } catch (error) {
      console.log(error.message);
    }
    setLoadList(false);
  };

  const objectFilterHandler = (event) => {
    setFilter(event.currentTarget.value.toLowerCase());
  };
  useEffect(() => {
    if (locationID !== "0") {
      fetchPlaceObject();
    }
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
      ></Box>

      <Box
        style={{
          margin: "9px 5px 0px 5px",
          display: "grid",
          gridGap: "5px",
        }}
      >
        <TextField
          name="search"
          label="Filter Object"
          onChange={objectFilterHandler}
        ></TextField>
      </Box>

      <Box marginLeft={1}>
        {loadList && locationID !== "0" && (
          <>
            <LinearProgress />
            <Box fontSize={20}>Loading Object......</Box>
          </>
        )}
        {!placeObjList.length && locationID !== "0" && !loadList && (
          <Box fontSize={20}>There No Object Placed in this Location!</Box>
        )}
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: "1px",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "1fr 1fr 1fr 1fr" },
          gridTemplateRows: "masonry",
        }}
      >
        {placeObjList
          .filter((placeObjList) =>
            placeObjList.Name.toLowerCase().includes(filter)
          )
          .map((obj) => (
            <Box
              sx={{ boxShadow: 5 }}
              key={obj.ObjectID}
              style={{
                margin: "4px",
                border: "3px solid orange",
                borderRadius: "5px",
              }}
            >
              <PlacedObjectOne objData={obj} />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default PlaceObjectList;
