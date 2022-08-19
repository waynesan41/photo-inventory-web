import { Button, Box, Dialog, Grid } from "@mui/material";
import UpdateProfileForm from "../components/profile/UpdateProfileForm";
import UpdatePasswordForm from "../components/profile/UpdatePasswordForm";

import LinearProgress from "@mui/material/LinearProgress";

import React, { useEffect, useState } from "react";
import { useApiURLContex } from "../App";

const Profile = () => {
  const { ApiURL } = useApiURLContex();
  const [open, setOpen] = useState(false);
  const [passForm, setPassForm] = useState(false);
  const profileFormOpener = () => setOpen(!open);
  const passFormOpener = () => setPassForm(!passForm);
  const [profileData, setProfileData] = useState({});
  const [loadProfile, setLoadProfile] = useState(false);

  useEffect(() => {
    const firstFetch = async () => {
      setLoadProfile(true);
      const fetchURL = `${ApiURL}/account/getUserProfile.php`;

      try {
        const response = await fetch(fetchURL, {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const result = await response.json();
        if (result === 0) {
          console.log("User is not login");
          window.location = window.location.origin + "/Login";
        } else {
          // console.log(result.Email);
          // console.log(result.Username);
          setProfileData({ ...result });

          // console.log(profileData);
        }
        setLoadProfile(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    firstFetch();
  }, []);
  const generalStyle = {
    border: "2px solid gray",
    borderRadius: "5px",
    margin: "5px",
    padding: "5px",
    fontSize: 25,
  };
  const titleStyle = {
    fontSize: 25,
    fontWeight: "bold",
    borderRadius: "5px",
    margin: "5px 0px 15px 0px",
    fontSize: 35,
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  };

  return (
    <Grid
      container
      style={{
        width: "auto",
        maxWidth: 900,
        margin: "30px auto auto auto",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      <Box>
        <Box style={titleStyle}>Profile Information</Box>
        {loadProfile && <LinearProgress />}
        <Box style={generalStyle}>
          Full Name:<b> {profileData.FullName}</b>
        </Box>
        <Box style={generalStyle}>
          Email:
          <b> {profileData.Email}</b>
        </Box>
        <Box style={generalStyle}>
          Username:
          <b> {profileData.Username}</b>
        </Box>
        <Box style={generalStyle}>Unit: {profileData.UnitSystem}</Box>
        <Box style={generalStyle}>Sign Up Date: {profileData.SignUpDate}</Box>
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
          <UpdatePasswordForm
            ProfileData={profileData}
            closeForm={setPassForm}
          />
        </Dialog>
      </Box>
    </Grid>
  );
};

export default Profile;
