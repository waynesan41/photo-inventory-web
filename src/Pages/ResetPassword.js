import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Box, Link, TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useApiURLContex } from "../App";
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
const ResetPassword = () => {
  const { ApiURL } = useApiURLContex();
  let { tokenKey } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [newPassValid, setNewPassValid] = useState(false);

  const [confirmPassValid, setConfirmPassValid] = useState(false);

  const [loadUpdate, setLoadUpdate] = useState(false);
  const year = new Date().getFullYear();
  const confirmPasswordHandler = (event) => {
    setConfirmPass(event.target.value);
    if (event.target.value !== password) {
      setConfirmPassValid(true);
    } else {
      setConfirmPassValid(false);
    }
  };
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

  //API CALL++++++++++++++++++++++++++++++

  const checkLogin = useCallback(async () => {
    const fetchUrl = `${ApiURL}/checkNotLogin.php`;

    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.text();
      //Because PHP End can't be change for some reason
      if (result === "1") {
        window.location = window.location.origin + "/MainLocation";
      } else {
        /* console.log(result);
          console.log("Not LogIn!"); */
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  //API CALL++++++++++++++++++++++++++++++
  const fetchResetPassword = useCallback(async (event) => {
    console.log(tokenKey);
    setLoadUpdate(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    data.delete("confirm-password");

    if (confirmPassValid || newPassValid) {
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

      /* if (result.PASSWORD === "GOOD") {
        window.location = window.location.origin + "/Profile";
      }
      setLoadUpdate(false);
      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } */
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  //CONFIRM PASSWORD HANDLER

  checkLogin();
  useEffect(() => {
    // checkLogin();
  }, []);
  return (
    <>
      <Box
        style={{ backgroundColor: "#2980b9" }}
        textAlign="center"
        paddingTop="10px"
      >
        <Link href="/MainLocation">
          <img src="/logo.png" height="100px" />
        </Link>
      </Box>
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
                name="password2"
                label="New Password"
                type="password"
                id="password2"
                // defaultValue="qwerR`qwe12"
                onChange={passwordHandler}
                helperText={
                  newPassValid && (
                    <>
                      Require at least 9 Characters! Containing at least One
                      Number
                      <br /> One Uppercase / One Lowercase / One Special
                      Character letter
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
          <Button
            type="submit"
            fullWidth
            disabled={loadUpdate}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            UPDATE PASSWORD
          </Button>
          {loadUpdate && <LinearProgress />}
        </Box>
      </Box>
      <Box
        style={{
          position: "fixed",
          left: "0px",
          bottom: "0px",
          right: "0px",
          minHeight: "50px",
          backgroundColor: "#2980b9",
          color: "white",
          textAlign: "center",
          padding: "15px",
          zIndex: "-1",
        }}
        component="footer"
      >
        FindPlacement &copy; {year}
      </Box>
    </>
  );
};
export default ResetPassword;
