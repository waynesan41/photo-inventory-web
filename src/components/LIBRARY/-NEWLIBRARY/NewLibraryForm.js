import React, { useState } from "react";

import { useApiURLContex } from "../../../App";

import { TextField, Box, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const NewLibraryForm = () => {
  const { ApiURL } = useApiURLContex();
  const [loadAdd, setLoadAdd] = useState(false);

  const fetchAddNewLibrary = async (event) => {
    setLoadAdd(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fetchURL = `${ApiURL}/library/addLibrary.php`;
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
      setLoadAdd(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box padding="5px" component="form" onSubmit={fetchAddNewLibrary}>
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
      <Button variant="outlined" disabled={loadAdd} type="submit">
        Add New Library
      </Button>
      {loadAdd && <LinearProgress />}
    </Box>
  );
};

export default NewLibraryForm;
