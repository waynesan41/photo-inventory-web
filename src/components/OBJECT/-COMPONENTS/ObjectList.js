import {
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useApiURLContex } from "../../../App";
import { useLibraryContex } from "../ObjectLibrary";

import ObjectOne from "./ObjectOne";

const ObjectList = () => {
  const { ApiURL } = useApiURLContex();
  const { libraryID, libType, accessLvl } = useLibraryContex();
  const [object, setObject] = useState([]);

  const fetchSearchObject = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /* if (data.get("search").length === 0) {
      window.location.reload();
    } */
    data.append("libraryID", libraryID);
    data.append("libType", libType);

    /*  for (var pair of data.entries()) {
      console.log(pair[0], pair[1]);
    } */
    const fetchURL = `${ApiURL}/object/searchObject.php`;

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
      } else if (result === "NO OBJECT") {
        setObject([]);
        console.log("No Object");
      } else {
        setObject([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchObject = async () => {
    const data = new FormData();
    data.append("libraryID", libraryID);
    data.append("libType", libType);

    const fetchURL = `${ApiURL}/object/getObject.php`;
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
      } else if (result === "ACCESS DENY" || result == "FAIL") {
        setObject([]);
        console.log("No Access");
      } else {
        setObject([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchObject();
  }, []);

  return (
    <Box style={{ padding: "5px" }}>
      <Box component="form" onSubmit={fetchSearchObject}>
        <RadioGroup
          defaultValue="1"
          name="filter"
          required
          style={{ display: "inline" }}
        >
          <FormControlLabel value="1" control={<Radio />} label="All" />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Placed Object"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="Unplace Object"
          />
        </RadioGroup>
        <Box
          style={{
            margin: "10px 0px 5px 0px",
            display: "grid",
            gridGap: "5px",
            gridTemplateColumns: "7fr 1fr",
          }}
        >
          <TextField name="search" label="SearchObject"></TextField>
          <Button variant="outlined" type="submit">
            Search
          </Button>
        </Box>
      </Box>
      {!object.length && <>There NO Object Found</>}
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridGap: "10px",
        }}
      >
        {object.map((obj) => (
          <Box
            sx={{ boxShadow: 5 }}
            key={obj.ObjectID}
            style={{ border: "3px solid orange", borderRadius: "5px" }}
          >
            <ObjectOne objData={obj} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ObjectList;
