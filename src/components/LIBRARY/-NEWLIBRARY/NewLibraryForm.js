import React from "react";

import { TextField, Box, Button } from "@mui/material";
import { useApiURLContex } from "../../../App";

const style = {
  padding: 10,
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const NewLibraryForm = () => {
  const { ApiURL } = useApiURLContex();
  const fetchAddNewLibrary = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fetchURL = `${ApiURL}/Library/addLibrary.php`;
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
      } else if (result === "ADD") {
        window.location.reload();
      } else {
        console.log("Fail to Add New Library.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box style={style} component="form" onSubmit={fetchAddNewLibrary}>
      <h3>Add New Library</h3>
      <Box style={{ marginBottom: "20px" }}>
        <TextField
          variant="filled"
          name="name"
          required
          fullWidth
          id="name"
          label="Library Name"
          autoFocus
        />
      </Box>
      <Button variant="outlined" type="submit">
        Add New Library
      </Button>
    </Box>
  );
};

export default NewLibraryForm;
