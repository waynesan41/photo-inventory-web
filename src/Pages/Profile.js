import { Update } from "@mui/icons-material";
import { Button, Card, Grid, Modal, Box, TextField } from "@mui/material";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";

import React, { useEffect, useState } from "react";

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const firstFetch = async () => {
      try {
        const response = await fetch(
          "http://localhost/PhotoInventory/Backend/api/account/getUserProfile.php",
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const result = await response.json();
        if (result === "0") {
          window.location = window.location.origin + "/Login";
        } else {
          // console.log(result.Email);
          // console.log(result.Username);
          setProfileData({ ...result });

          // console.log(profileData);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    firstFetch();
  }, []);

  return (
    <Grid container>
      <Card>
        <Card>UserID: {profileData.UserID}</Card>
        <Card>Full Name: {profileData.FullName}</Card>
        <Card>Email: {profileData.Email}</Card>
        <Card>Username: {profileData.Username}</Card>
        <Card>Unit: {profileData.UnitSystem}</Card>
        <Card>Sign Up Date: {profileData.SignUpDate}</Card>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Edit Profile Information
        </Button>
        <Modal open={open} onClose={handleClose}>
          <UpdateProfileForm ProfileData={profileData} />
        </Modal>
      </Card>
    </Grid>
  );
};

export default Profile;
