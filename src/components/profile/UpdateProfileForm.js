import { Update } from "@mui/icons-material";
import { Button, Card, Grid, Modal, Box, TextField } from "@mui/material";

import React, { useEffect, useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateProfileForm = (props) => {
  const [emailTaken, setEmailTaken] = useState(false);
  const [userTaken, setUserTaken] = useState(false);
  /*   const [nameError, setNameError] = useState(false);
    const [passError, setPassError] = useState(false); */

  const [emailMessage, setEmailMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [userMessage, setUserMessage] = useState("");
  const [userValid, setUserValid] = useState(false);
  return (
    <Box sx={style} component="form">
      <Grid container spacing={2}>
        <h2>Edit Profile</h2>
        <Grid item xs={12} sm={12}>
          <TextField
            name="fullName"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            defaultValue={props.ProfileData.FullName}
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
            defaultValue={props.ProfileData.Username}
            helperText={userMessage}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password1"
            label="Old Password"
            type="password"
            id="password1"
            autoComplete="new-password"
            defaultValue="qwerR`qwe12"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password2"
            label="New Password"
            type="password"
            id="password2"
            defaultValue="qwerR`qwe12"
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
            defaultValue="qwerR`qwe12"
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
