import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function SignUp() {
  const [emailTaken, setEmailTaken] = useState(false);
  const [userTaken, setUserTaken] = useState(false);
  /*   const [nameError, setNameError] = useState(false);
  const [passError, setPassError] = useState(false); */

  const [emailMessage, setEmailMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [userMessage, setUserMessage] = useState("");
  const [userValid, setUserValid] = useState(false);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data.get("confirm-password"));
    data.delete("confirm-password");
    /* console.log({
      email: data.get("email"),
      password: data.get("password"),
      fullName: data.get("fullName"),
      username: data.get("username"),
    }); */
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/account/signUp.php",
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

      if (result.fullName !== "GOOD!") {
        console.log("Full Name Invalid");
      }
      if (result.username !== "GOOD!") {
        setUserTaken(true);
        setUserMessage("Username Already Taken");
      }
      if (result.email !== "GOOD!") {
        setEmailTaken(true);
        setEmailMessage("Email Already Taken");
      }
      if (result.password !== "GOOD!") {
        console.log("Password Invalid");
      }
      console.log(result);
      if (result === 1) {
        window.location = window.location.origin + "/ObjectLocation";
      }
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
    const usernameRegex = /^[A-Z0-9a-z _.]*$/;
    const email = event.target.value;
    setEmailTaken(false);
    if (usernameRegex.test(email)) {
      setUserValid(false);
      setUserMessage("");
    } else {
      setUserValid(true);
      setUserMessage("Username can only contain _ . and letters and number");
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                value="日本のs1ကျူ"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={emailValid || emailTaken}
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                // autoComplete="email"
                onChange={validateEmail}
                value="l23@gg.com"
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
                name="username"
                value="sdon123"
                onChange={validateUsername}
                helperText={userMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value="qwerR`qwe12"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                value="qwerR`qwe12"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I Agreed to Term and Condition."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
