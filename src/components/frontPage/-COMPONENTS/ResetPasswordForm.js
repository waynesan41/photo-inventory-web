import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Box, TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useApiURLContex } from "../../../App";
import { useCallback } from "react";

const style = {
  padding: 10,
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const ResetPasswordForm = (props) => {
  const { ApiURL } = useApiURLContex();
  let { tokenKey } = useParams();
  const [newPassValid, setNewPassValid] = useState(false);
  const [confirmPassValid, setConfirmPassValid] = useState(false);
  const [startDisable, setStartDisable] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loadUpdate, setLoadUpdate] = useState(false);

  const confirmPasswordHandler = (event) => {
    setStartDisable(false);
    setConfirmPass(event.target.value);
    if (event.target.value !== password) {
      setConfirmPassValid(true);
    } else {
      setConfirmPassValid(false);
    }
  };
  const passwordHandler = (event) => {
    setStartDisable(false);
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
  //API Reset New Password ==========
  const fetchResetPassword = useCallback(async (event) => {
    setLoadUpdate(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    data.append("tokenKey", tokenKey);
    data.delete("confirm-password");

    if (confirmPassValid || newPassValid) {
      return 0;
    }
    const fetchURL = `${ApiURL}/account/resetPassword.php`;

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

      if (result === "UPDATED") {
        props.setTokenValid1(false);
        props.setResetSuccess1(true);
        console.log("Update Back To Login");
      } else if (result === "BAD DATA") {
        props.setTokenValid1(false);
        console.log("Invalid Token!");
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadUpdate(false);
  }, []);
  return (
    <Box
      fullWidth
      style={{
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box style={style} component="form" onSubmit={fetchResetPassword}>
        <Box component="h2">Reset Password </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={newPassValid}
              required
              fullWidth
              disabled={loadUpdate}
              name="newPassword"
              label="New Password"
              type="password"
              // defaultValue="qwerR`qwe12"
              onChange={passwordHandler}
              helperText={
                newPassValid && (
                  <>
                    Require at least 9 Characters! Containing at least One
                    Number
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
              disabled={loadUpdate}
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
        <Button
          type="submit"
          fullWidth
          disabled={newPassValid || confirmPassValid || startDisable}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          UPDATE PASSWORD
        </Button>
        {loadUpdate && <LinearProgress />}
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
