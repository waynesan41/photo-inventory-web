import { Button, Grid, Box, TextField } from "@mui/material";

import React, { useEffect, useState, useCallback } from "react";
const style = {
  padding: 10,
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdatePasswordForm = (props) => {
  const updatehandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    data.delete("confirm-password");

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/account/updateUserProfile.php",
        {
          method: "POST",
          body: data,
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      console.log(result);

      if (result.PASSWORD === "WRONG") {
        setOldPassValid(true);
        setOldPassMessage("Old Password Incorrect!");
      } else if (result.PASSWORD === "INVALID") {
        setNewPassValid(true);
        setNewPassMessage("Password Invalid");
      } else {
        setOldPassValid(false);
        setOldPassMessage("");
      }

      if (result.PASSWORD === "GOOD") {
        window.location = window.location.origin + "/Profile";
      }

      console.log(result);
      if (result === 0) {
        window.location = window.location.origin + "/Login";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [newPassMessage, setNewPassMessage] = useState("");
  const [newPassValid, setNewPassValid] = useState(false);

  const [oldPassMessage, setOldPassMessage] = useState("");
  const [oldPassValid, setOldPassValid] = useState(false);

  const [confirmPassMessage, setConfirmPassMessage] = useState("");
  const [confirmPassValid, setConfirmPassValid] = useState(false);

  return (
    <Box
      style={style}
      component="form"
      onSubmit={updatehandler}
      id="profile-form"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={oldPassValid}
            required
            fullWidth
            name="password1"
            label="Old Password"
            type="password"
            id="password1"
            autoComplete="new-password"
            defaultValue="qwerR`qwe12"
            helperText={oldPassMessage}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={newPassValid}
            required
            fullWidth
            name="password2"
            label="New Password"
            type="password"
            id="password2"
            defaultValue="qwerR`qwe12"
            helperText={newPassMessage}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={confirmPassValid}
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            defaultValue="qwerR`qwe12"
            helperText={confirmPassMessage}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update Profile
      </Button>
    </Box>
  );
};
export default UpdatePasswordForm;
