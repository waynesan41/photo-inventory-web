import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ObjectPlaceOne from "../--COMPONENTS/ObjectPlaceOne";
import { useApiURLContex } from "../../../../App";

const SearchObjectList = (props) => {
  const { ApiURL } = useApiURLContex();
  const [object, setObject] = useState([]);
  const [noObject, setNoObject] = useState(false);

  const fetchSearchObject = async (event) => {
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
  };
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
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {noObject && <Box>No Object Found.</Box>}
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
