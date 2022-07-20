import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

import { useMainLocationContex } from "../LocationPage";
import PlacedObjectOne from "./--COMPONENTS/PlacedObjectOne";
import { useCurrentLocationData } from "../-COMPONENTS/--FETCH/LocationCurrent";

const PlaceObjectList = () => {
  let { mainID, locationID } = useParams();
  const { mainType } = useMainLocationContex();

  const [placeObjList, setPlaceObjList] = useState([]);

  const fetchSearchLocation = () => {
    console.log("Search Location");
  };

  const fetchPlaceObject = async () => {
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("locID", locationID);
    data.append("type", mainType);
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/objectLocation/getObjLoc.php",
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
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPlaceObject();
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
      {!placeObjList.length && <>There NO placeObjList Found</>}
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {placeObjList.map((obj) => (
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