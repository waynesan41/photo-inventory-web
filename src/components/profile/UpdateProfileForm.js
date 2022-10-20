import { Button, Grid, Box, TextField, LinearProgress } from "@mui/material";

import React, { useState } from "react";
import { useApiURLContex } from "../../App";

const UpdateProfileForm = (props) => {
  const { ApiURL } = useApiURLContex();
  const updatehandler = async (event) => {
    setLoadUpdate(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data.get("confirm-password"));
    // data.delete("confirm-password");

    // console.log("data-email: " + data.get("email"));
    // console.log("prop-email: " + props.ProfileData.Email);
    if (
      data.get("username") === props.ProfileData.Username &&
      data.get("fullName") === props.ProfileData.FullName &&
      data.get("email") === props.ProfileData.Email
    ) {
      console.log("Nothing to Be update Because The Value doesn't change!");
      props.closeForm(false);
      return 0;
    }

    if (data.get("email") === props.ProfileData.Email) {
      console.log("The E-mail is the Same");
      data.delete("email");
    }
    if (data.get("fullName") === props.ProfileData.FullName) {
      console.log("Full Name is the Same");
      data.delete("fullName");
    }
    if (data.get("username") === props.ProfileData.Username) {
      console.log("Username is Same");
      data.delete("username");
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

      //User NOT Login
      if (result === 0) {
        window.location = window.location.origin + "/Login";
      }
      //User Put In BAD KDY
      if (result === "BAD KEY") {
        console.log("Bad Keys");
        window.location = window.location.origin + "/Profile";
      }

      setLoadUpdate(false);
      if (result.NAME === "INVALID") {
        setNameValid(true);
        setNameMessage("Invalid Name!");
      } else {
        setNameValid(false);
        setNameMessage("");
      }
      if (result.USERNAME === "TAKEN") {
        setUserTaken(true);
        setUserMessage("Username Already Taken");
      } else {
        setUserTaken(false);
        setUserMessage("");
      }
      if (result.EMAIL === "TAKEN") {
        setEmailTaken(true);
        setEmailMessage("Email Already Taken");
      } else {
        setEmailTaken(false);
        setEmailMessage("");
      }

      if (data.has("fullName")) {
        console.log("There is Full Name in Data");
        if (result.NAME !== "GOOD") {
          return 0;
        }
      }
      if (data.has("username")) {
        if (result.USERNAME !== "GOOD") {
          return 0;
        }
      }
      if (data.has("email")) {
        if (result.EMAIL !== "GOOD") {
          return 0;
        }
      }

      window.location = window.location.origin + "/Profile";
    } catch (error) {
      console.log(error.message);
    }
  };
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
    const usernameRegex = /^[0-9a-z _.]*$/;
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

  const [nameMessage, setNameMessage] = useState("");
  const [nameValid, setNameValid] = useState(false);

  const [emailTaken, setEmailTaken] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [userTaken, setUserTaken] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [userValid, setUserValid] = useState(false);

  const [loadUpdate, setLoadUpdate] = useState(false);
  return (
    <Box
      padding="15px 5px 0px 5px"
      component="form"
      onSubmit={updatehandler}
      id="profile-form"
      width="auto"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            error={nameValid}
            name="fullName"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            defaultValue={props.ProfileData.FullName}
            helperText={nameMessage}
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
            onChange={validateEmail}
            defaultValue={props.ProfileData.Email}
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
            onChange={validateUsername}
            defaultValue={props.ProfileData.Username}
            helperText={userMessage}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        width="100%"
        color="secondary"
        variant="contained"
        disabled={loadUpdate}
        sx={{ mt: 3, mb: 2 }}
      >
        Update Profile
      </Button>
      {loadUpdate && <LinearProgress />}
    </Box>
  );
};
export default UpdateProfileForm;
