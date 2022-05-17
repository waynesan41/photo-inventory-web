import { Button, Card, Grid, Dialog } from "@mui/material";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";
import UpdatePasswordForm from "../components/profile/UpdatePasswordForm";

import React, { useEffect, useState } from "react";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [passForm, setPassForm] = useState(false);
  const profileFormOpener = () => setOpen(!open);
  const passFormOpener = () => setPassForm(!passForm);
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
          console.log("User is not login");
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
        <Button
          variant="contained"
          color="secondary"
          onClick={profileFormOpener}
        >
          Edit Profile Information
        </Button>
        <Dialog open={open} onClose={profileFormOpener}>
          <UpdateProfileForm ProfileData={profileData} closeForm={setOpen} />
        </Dialog>
        <Button variant="contained" color="primary" onClick={passFormOpener}>
          EDIT PASSWORD
        </Button>
        <Dialog open={passForm} onClose={passFormOpener}>
          <UpdatePasswordForm ProfileData={profileData} />
        </Dialog>
      </Card>
    </Grid>
  );
};

export default Profile;
