import { Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLibraryContex } from "../ObjectLibrary";
import ObjectOne from "./ObjectOne";

const ObjectList = () => {
  const { libraryID, libType, accessLvl } = useLibraryContex();
  const [object, setObject] = useState([]);

  const fetchSearchObject = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("libraryID", libraryID);
    data.append("libType", libType);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/object/searchObject.php",
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

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/object/getObject.php",
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
    <Box>
      <Box
        style={{
          margin: "9px 5px 0px 5px",
          display: "grid",
          gridGap: "5px",
          gridTemplateColumns: "7fr 1fr",
        }}
        component="form"
        onSubmit={fetchSearchObject}
      >
        <TextField name="search" label="SearchObject" required></TextField>
        <Button variant="outlined" type="submit">
          Search
        </Button>
      </Box>
      {!object.length && <>There NO Object Found</>}
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
            <ObjectOne objData={obj} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ObjectList;
