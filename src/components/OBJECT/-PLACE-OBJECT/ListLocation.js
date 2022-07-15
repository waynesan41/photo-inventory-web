import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import LocationList from "../../LOCATION/-COMPONENTS/--FETCH/LocationList";
import LocationOne from "../../LOCATION/-COMPONENTS/--FETCH/LocationOne";
import { useLibraryContex } from "../ObjectLibrary";
import OneLocation from "./OneLocation";

const ListLocation = (props) => {
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

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Object/findLocation.php",
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
      <Box>
        {locationList.length === 0 && (
          <Box>This Item is not Found in Any Location</Box>
        )}
        {locationList.map((loc) => (
          <Box key={loc.LocationID}>
            <OneLocation locationData={loc} />
          </Box>
        ))}
        <>something</>
      </Box>
    </>
  );
};

export default ListLocation;
