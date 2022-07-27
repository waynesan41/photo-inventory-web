import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useApiURLContex } from "../../../App";

import { useLibraryContex } from "../ObjectLibrary";
import OneLocation from "./OneLocation";

const ListLocation = (props) => {
  const { ApiURL } = useApiURLContex();
  const { libType } = useLibraryContex();
  const [locationList, setLocationList] = useState([]);
  //+++++++++++++++++++++++++++++++++++++++++
  // API Call Search Location with Object
  //+++++++++++++++++++++++++++++++++++++++++
  const fetchLocationWithObject = async () => {
    const data = new FormData();
    data.append("libraryID", props.objData.LibraryID);
    data.append("objectID", props.objData.ObjectID);
    data.append("libType", libType);
    const fetchURL = `${ApiURL}/object/findLocation.php`;

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
      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else if (result === "NO LOCATION" || result === "DENY") {
        setLocationList([]);
      } else {
        setLocationList([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchLocationWithObject();
  }, []);

  return (
    <>
      <Box
        style={{
          padding: "5px",
          display: "grid",
          gridGap: "5px",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {locationList.length === 0 && (
          <Box component="h3">This Object is not Place in any Location!</Box>
        )}
        {locationList.map((loc) => (
          <Box key={loc.LocationID}>
            <OneLocation locationData={loc} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ListLocation;
