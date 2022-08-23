import { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useMainLocationContex } from "../../LocationPage";
import { useParams } from "react-router-dom";
import SearchObjectList from "./SearchObjectList";
import { useApiURLContex } from "../../../../App";

const PlaceObjectForm = () => {
  const { ApiURL } = useApiURLContex();
  const { mainID } = useParams();
  const { mainType } = useMainLocationContex();
  const [libraryList, setLibraryList] = useState([]);
  const [selectedLibID, setSelectLibID] = useState("");
  const [loadLibrary, setLoadLibrary] = useState(false);

  const handleChange = (event) => {
    setSelectLibID(event.target.value);
  };

  //+++++++++++++++++++++++++++++++++++++++++
  //++++++++++ Fetch API ++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++
  const fetchAccessLibrary = async () => {
    setLoadLibrary(true);
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("type", mainType);
    const fetchURL = `${ApiURL}/objectLocation/getAccessLibrary.php`;

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

      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else if (result === "INVALID" || result === "NO LIBRARY") {
        setLibraryList([]);
      } else {
        setLibraryList([...result]);
        setSelectLibID(result[0].LibraryID);
      }
      console.log(result);
      console.log(libraryList);
    } catch (error) {
      console.log(error.message);
    }
    setLoadLibrary(false);
  };

  //+++++++++++++++++++++++++
  // USE EFFECT
  //+++++++++++++++++++++++++
  useEffect(() => {
    fetchAccessLibrary();
  }, []);
  return (
    <Box style={{ padding: "10px" }}>
      <Typography variant="h5" marginBottom="5px">
        Library List
      </Typography>
      <br />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Library</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedLibID}
          label="Select Library"
          onChange={handleChange}
        >
          {libraryList.length > 0 &&
            libraryList.map((obj) => (
              <MenuItem key={obj.LibraryID} value={obj.LibraryID}>
                {obj.Name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {libraryList.length == 0 && !loadLibrary && (
        <Box fontSize={20}>No Library Found.</Box>
      )}
      {loadLibrary && (
        <>
          <Box fontSize={20}>Loading Library List....</Box>
          <LinearProgress />
        </>
      )}
      {selectedLibID !== "" && (
        <SearchObjectList libType={mainType} libraryID={selectedLibID} />
      )}
    </Box>
  );
};

export default PlaceObjectForm;
