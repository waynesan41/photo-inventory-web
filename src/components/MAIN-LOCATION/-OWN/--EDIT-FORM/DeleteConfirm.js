import React, { useState } from "react";

import { useApiURLContex } from "../../../../App";
import { TextField, Box, Button, Grid, Alert, Dialog } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const DeleteConfirm = (props) => {
  const { ApiURL } = useApiURLContex();
  const [libName, setLibName] = useState("");
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [loadDelete, setLoadDelete] = useState(false);
  const openConfirm = () => {
    setOpen(true);
  };
  const closeConfirm = () => {
    setOpen(false);
  };

  const checkConfirm = (event) => {
    setLibName(event.currentTarget.value);
    if (props.data.Name == event.currentTarget.value) {
      console.log("Delete Confirm");
      setConfirm(false);
    } else {
      setConfirm(true);
    }
  };

  const fetchDeleteLibrary = async () => {
    setLoadDelete(true);
    const formData = new FormData();
    formData.append("mainID", props.data.MainLocationID);
    formData.append("name", libName);

    const fetchURL = `${ApiURL}/mainLocation/deleteMainLocation.php`;

    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "DELETED") {
        window.location.reload();
      } else {
        console.log("Result: " + result);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadDelete(false);
  };
  return (
    <Box padding="5px">
      <Grid container component="form">
        <Grid item xs={12}>
          <Alert severity="error">
            DELETING Main Location WILL DELETE All Locations Inside!
          </Alert>
          <Alert severity="info">
            Enter Main Location name: "{props.data.Name}" to Confirm Delete.
          </Alert>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
          <TextField
            variant="filled"
            name="name"
            required
            fullWidth
            id="name"
            label="Confirm Main Location Name"
            onChange={checkConfirm}
            autoFocus
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={props.close}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="error"
        disabled={confirm}
        type="submit"
        style={{ float: "right" }}
        onClick={openConfirm}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={props.close}>
        <Alert severity="error">
          DELETING MAIN LOCATION WILL DELETE All Locations Inside!
        </Alert>
        <Grid
          container
          style={{ display: "grid", gridTemplateColumns: "10fr 1fr" }}
        >
          <Button
            variant="contained"
            color="success"
            disabled={loadDelete}
            onClick={props.close}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={fetchDeleteLibrary}
            disabled={loadDelete}
          >
            Delete
          </Button>
        </Grid>
        {loadDelete && <LinearProgress />}
      </Dialog>
    </Box>
  );
};

export default DeleteConfirm;
