import { Button, Grid, Box, TextField } from "@mui/material";

import React, { useState } from "react";
const style = {
  padding: 10,
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateProfileForm = (props) => {
  const updatehandler = async (event) => {
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

    console.log(data.size);

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

      if (result === "BAD KEY") {
        console.log("Bad Keys");
        // window.location = window.location.origin + "/Profile";
      }
      if (
        result.NAME === "GOOD" &&
        result.USERNAME === "GOOD" &&
        result.EMAIL === "GOOD"
      ) {
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

  const [nameMessage, setNameMessage] = useState("");
  const [nameValid, setNameValid] = useState(false);

  const [emailTaken, setEmailTaken] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [userTaken, setUserTaken] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [userValid, setUserValid] = useState(false);
  return (
    <Box
      style={style}
      component="form"
      onSubmit={updatehandler}
      id="profile-form"
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update Profile
      </Button>
    </Box>
  );
};
export default UpdateProfileForm;