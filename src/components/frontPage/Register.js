import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import LinearProgress from "@mui/material/LinearProgress";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useApiURLContex } from "../../App";
import { Dialog } from "@mui/material";
import { hover } from "@testing-library/user-event/dist/hover";
import TermAndCondition from "./TermAndCondition";

export default function SignUp() {
  const { ApiURL } = useApiURLContex();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [fullNameValid, setFullNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPassValid, setConfirmPassValid] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const [userValid, setUserValid] = useState(false);
  const [userTaken, setUserTaken] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const [isHover, setIsHover] = useState(true);

  const [loadSignUp, setLoadSignUp] = useState(false);

  const [openTerm, setOpenTerm] = useState(false);
  const openTermHandler = () => {
    setOpenTerm(true);
  };
  const closeTermHandler = () => {
    setOpenTerm(false);
  };
  const handleSubmit = useCallback(async (event) => {
    setLoadSignUp(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data.get("confirm-password"));
    data.delete("confirm-password");

    console.log(fullNameValid);
    if (
      fullNameValid ||
      passwordValid ||
      confirmPassValid ||
      emailValid ||
      userValid
    ) {
      return 0;
    }
    const fetchUrl = `${ApiURL}/account/signUp.php`;
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      console.log(result);

      if (result.fullName !== "GOOD!") {
        console.log("Full Name Invalid");
      }
      if (result.username !== "GOOD!" && result !== 1) {
        setUserTaken(true);
        setUserMessage("Username Already Taken");
      }
      if (result.email !== "GOOD!" && result !== 1) {
        setEmailTaken(true);
        setEmailMessage("Email Already Taken");
      }
      if (result.password !== "GOOD!") {
        console.log("Password Invalid");
      }
      console.log(result);
      if (result === 1) {
        window.location = window.location.origin + "/MainLocation";
      }
      setLoadSignUp(false);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const validateEmail = (event) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const email = event.target.value;
    setEmailTaken(false);
    if (emailRegex.test(email)) {
      setEmailValid(false);
      setEmailMessage("");
    } else {
      setEmailValid(true);
      setEmailMessage("Please enter a valid email!");
    }
  };
  const validateUsername = (event) => {
    const usernameRegex = /^[0-9a-z_.]{3,20}$/;
    const email = event.target.value.toLowerCase();
    event.target.value = event.target.value.toLowerCase();
    setUserTaken(false);
    if (usernameRegex.test(email)) {
      setUserValid(false);
      setUserMessage("");
    } else {
      setUserValid(true);
      setUserMessage(
        "Username can contain _ . and 3 to 35 letters and number."
      );
    }
  };

  //FULL NAME HANDLER
  const fullNameHandler = (event) => {
    setFullName(event.target.value);

    if (event.target.value.length < 1 || event.target.value.length > 45) {
      setFullNameValid(true);
    } else {
      setFullNameValid(false);
    }
  };

  //PASSWORD HANDLER
  const passwordHandler = (event) => {
    const passRegex =
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s])^.{9,100}/;
    setPassword(event.target.value);
    if (event.target.value !== confirmPass) {
      setConfirmPassValid(true);
    } else {
      setConfirmPassValid(false);
    }
    if (passRegex.test(event.target.value)) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register New Acount
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                name="fullName"
                fullWidth
                error={fullNameValid}
                id="fullName"
                label="Full Name"
                // defaultValue="杠杠"
                inputProps={{ maxLength: 45 }}
                onChange={fullNameHandler}
                helperText={fullNameValid && "Name require 1 to 30 characters."}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={emailValid || emailTaken}
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                // autoComplete="email"
                onChange={validateEmail}
                // defaultValue="ganggang@gg.com"
                helperText={emailMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={userValid || userTaken}
                required
                fullWidth
                id="username"
                label="Username"
                inputProps={{ maxLength: 35 }}
                name="username"
                onChange={validateUsername}
                helperText={userMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordValid}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                inputProps={{ maxLength: 225 }}
                onBlur={passwordHandler}
                onChange={passwordHandler}
                // defaultValue="qwerR`qwe12"
                helperText={
                  passwordValid && (
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
                required
                fullWidth
                error={confirmPassValid}
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                inputProps={{ maxLength: 225 }}
                onBlur={confirmPasswordHandler}
                onChange={confirmPasswordHandler}
                // defaultValue="qwerR`qwe12"
                helperText={confirmPassValid && "Password Doesn't Match!"}
              />
            </Grid>
            <Grid item xs={12}>
              <Checkbox
                value="allowExtraEmails"
                required
                color="primary"
              ></Checkbox>
              <Box display="inline-block" fontSize={20}>
                Agreed to{" "}
                <Box
                  display="inline-block"
                  style={{
                    color: isHover ? "#2c3e50" : "#3498db",
                    textDecoration: "underline",
                  }}
                  onMouseEnter={() => {
                    setIsHover(true);
                  }}
                  onMouseOut={() => {
                    setIsHover(false);
                  }}
                  onClick={openTermHandler}
                >
                  Term and condition.
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loadSignUp}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {loadSignUp && <LinearProgress />}
        </Box>
      </Box>
      <Dialog open={openTerm} onClose={closeTermHandler}>
        <TermAndCondition />
      </Dialog>
    </Container>
  );
}
