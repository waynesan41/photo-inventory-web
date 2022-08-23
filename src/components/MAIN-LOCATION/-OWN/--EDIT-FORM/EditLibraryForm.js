import React, { useState } from "react";

import DeleteConfirm from "./DeleteConfirm";
import { useApiURLContex } from "../../../../App";

import { TextField, Box, Button, Grid, Dialog } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LinearProgress from "@mui/material/LinearProgress";

const style = {
  padding: 10,
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditLibraryForm = (props) => {
  const { ApiURL } = useApiURLContex();
  const [open, setOpen] = useState(false);
  const [loadEdit, setLoadEdit] = useState(false);

  const openDelete = (type) => {
    setOpen(true);
  };
  const closeDelete = () => {
    setOpen(false);
  };

  const editFormSubmitHandler = async (event) => {
    setLoadEdit(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("mainID", props.data.MainLocationID);

    if (data.get("name") == props.data.Name) {
      props.closeForm();
    } else {
      const fetchURL = `${ApiURL}/mainLocation/updateMainLocation.php`;

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
        } else if (result === "UPDATED") {
          window.location.reload();
        } else {
          console.log("FAIL to Update!!");
          console.log(result);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    setLoadEdit(false);
  };
  return (
    <Box style={style} component="form" onSubmit={editFormSubmitHandler}>
      <Grid container>
        <Grid item xs={12}>
          <h3>Edit Main Location Name</h3>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
          <TextField
            variant="filled"
            name="name"
            required
            fullWidth
            id="name"
            label="Main Location Name"
            defaultValue={props.data.Name}
            autoFocus
          />
        </Grid>
      </Grid>
      {loadEdit && <LinearProgress />}
      <Button
        variant="contained"
        disabled={loadEdit}
        color="error"
        onClick={openDelete}
      >
        <DeleteForeverIcon />
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ float: "right" }}
        type="submit"
        disabled={loadEdit}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        style={{ float: "right" }}
        onClick={props.closeForm}
        disabled={loadEdit}
      >
        Cancel
      </Button>

      <Dialog open={open} onClose={closeDelete}>
        <DeleteConfirm data={props.data} close={closeDelete} />
      </Dialog>
    </Box>
  );
};

export default EditLibraryForm;
