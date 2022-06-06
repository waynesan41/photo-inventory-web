import React, { useState } from "react";

import { TextField, Box, Button, Grid, Alert, Dialog } from "@mui/material";
const style = {
  padding: 10,
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteConfirm = (props) => {
  const [libName, setLibName] = useState("");
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(true);
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
    const formData = new FormData();
    formData.append("libraryID", props.data.LibraryID);
    formData.append("name", libName);

    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Library/deleteLibrary.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
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
  };
  return (
    <Box style={style}>
      <Grid container component="form">
        <Grid item xs={12}>
          <Alert severity="error">
            DELETING Library WILL DELETE All OBJECTS Inside Library!
          </Alert>
          <Alert severity="info">
            Enter Library name: "{props.data.Name}" to Confirm Delete.
          </Alert>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
          <TextField
            variant="filled"
            name="name"
            required
            fullWidth
            id="name"
            label="Confirm Library Name"
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
          DELETING Library WILL DELETE All OBJECTS Inside Library!
        </Alert>
        <Grid
          container
          style={{ display: "grid", gridTemplateColumns: "10fr 1fr" }}
        >
          <Button variant="contained" color="success" onClick={props.close}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={fetchDeleteLibrary}
          >
            Delete
          </Button>
        </Grid>
      </Dialog>
    </Box>
  );
};

export default DeleteConfirm;
