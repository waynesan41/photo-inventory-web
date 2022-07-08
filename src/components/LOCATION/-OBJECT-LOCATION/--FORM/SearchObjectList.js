import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import ObjectOne from "../../../OBJECT/-COMPONENTS/ObjectOne";
import ObjectPlaceOne from "../--COMPONENTS/ObjectPlaceOne";
const SearchObjectList = (props) => {
  const [object, setObject] = useState([]);

  const fetchSearchObject = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("libraryID", props.libraryID);
    data.append("libType", props.libType);

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
  return (
    <Box
      style={{
        margin: "15px 0px 5px 0px",
        display: "grid",
        gridGap: "5px",
        gridTemplateColumns: "7fr 1fr",
      }}
      component="form"
      onSubmit={fetchSearchObject}
    >
      <TextField name="search" label="Search Object" required></TextField>
      <Button variant="outlined" type="submit">
        Search
      </Button>
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
