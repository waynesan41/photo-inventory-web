import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import ObjectPlaceOne from "../--COMPONENTS/ObjectPlaceOne";
import { useApiURLContex } from "../../../../App";

const SearchObjectList = (props) => {
  const { ApiURL } = useApiURLContex();
  const [object, setObject] = useState([]);
  const [noObject, setNoObject] = useState(false);
  const [loadList, setLoadList] = useState(false);

  const fetchSearchObject = async (event) => {
    setLoadList(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("libraryID", props.libraryID);
    data.append("libType", props.libType);
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
        setNoObject(true);
        console.log("No Object");
      } else {
        setNoObject(false);
        setObject([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadList(false);
  };
  const fetchPreSearch = async () => {
    setLoadList(true);

    const data = new FormData();
    data.append("filter", 3);
    data.append("search", "");
    data.append("libraryID", props.libraryID);
    data.append("libType", props.libType);
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
        setNoObject(true);
        console.log("No Object");
      } else {
        setNoObject(false);
        setObject([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadList(false);
  };

  useEffect(() => {
    fetchPreSearch();
  }, []);

  return (
    <Box style={{ padding: "5px" }}>
      <Box component="form" onSubmit={fetchSearchObject}>
        <RadioGroup
          defaultValue="3"
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

      {loadList && (
        <>
          <LinearProgress />
          <Box fontSize={20}>Loading Object......</Box>
        </>
      )}
      {noObject && !loadList && <Box fontSize={20}>No Object Found.</Box>}
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {object.map((obj) => (
          <Box
            sx={{ boxShadow: 5 }}
            key={obj.ObjectID}
            style={{ margin: "4px" }}
          >
            <ObjectPlaceOne objData={obj} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchObjectList;
