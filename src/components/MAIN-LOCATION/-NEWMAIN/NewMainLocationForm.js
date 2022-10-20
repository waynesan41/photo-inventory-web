import React from "react";

import { TextField, Box, Button, Grid, Alert, Dialog } from "@mui/material";
import { useApiURLContex } from "../../../App";

const NewMainLocationForm = () => {
  const { ApiURL } = useApiURLContex();
  const fetchAddNewLibrary = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fetchURL = `${ApiURL}/mainLocation/addNewMainLocation.php`;

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
    <Box padding="5px" component="form" onSubmit={fetchAddNewLibrary}>
      <Box fontSize={25} marginBottom="10px" fontWeight="bold">
        Add New Main Location
      </Box>
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

export default NewMainLocationForm;
