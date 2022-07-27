import { Button, Grid, Box, TextField } from "@mui/material";

import React, { useEffect, useState, useCallback } from "react";
import { useApiURLContex } from "../../App";

const style = {
  padding: 10,
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdatePasswordForm = (props) => {
  const { ApiURL } = useApiURLContex();
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [newPassValid, setNewPassValid] = useState(false);
  const [oldPassValid, setOldPassValid] = useState(false);
  const [confirmPassValid, setConfirmPassValid] = useState(false);

  const updatehandler = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    data.delete("confirm-password");

    if (oldPassValid || confirmPassValid || newPassValid) {
      return 0;
    }
    const fetchURL = `${ApiURL}/account/updateUserProfile.php`;

    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      console.log(result);

      if (result.PASSWORD === "WRONG") {
        setOldPassValid(true);
      } else if (result.PASSWORD === "INVALID") {
        setNewPassValid(true);
      } else {
        setOldPassValid(false);
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

  const oldPasswordHandler = () => {
    setOldPassValid(false);
  };
  //PASSWORD HANDLER
  const passwordHandler = (event) => {
    setPassword(event.target.value);
    const passRegex =
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s])^.{9,100}/;

    if (event.target.value !== confirmPass) {
      setConfirmPassValid(true);
    } else {
      setConfirmPassValid(false);
    }
    if (passRegex.test(event.target.value)) {
      setNewPassValid(false);
    } else {
      setNewPassValid(true);
    }
  };

  //CONFIRM PASSWORD HANDLER
  const confirmPasswordHandler = (event) => {
    setConfirmPass(event.target.value);
    if (event.target.value !== password) {
      setConfirmPassValid(true);
    } else {
      setConfirmPassValid(false);
    }
  };
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
            onFocus={oldPasswordHandler}
            onChange={oldPasswordHandler}
            onBlur={oldPasswordHandler}
            // defaultValue="qwerR`qwe12"
            helperText={oldPassValid && "Old Password Incorrect!"}
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
            // defaultValue="qwerR`qwe12"
            onChange={passwordHandler}
            helperText={
              newPassValid && (
                <>
                  Require at least 9 Characters! Containing at least One Number
                  <br /> One Uppercase / One Lowercase / One Special Character
                  letter
                </>
              )
            }
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
            // defaultValue="qwerR`qwe12"
            onChange={confirmPasswordHandler}
            helperText={confirmPassValid && "Password Doesn't Match!"}
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
