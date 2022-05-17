import React, { useCallback, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import { Grid } from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import AllInboxIcon from "@mui/icons-material/AllInbox";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const NavBar = () => {
  const logOutphp = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/account/logout.php",
        {
          mode: "cors",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.text();
      console.log(data);
      if (data == 0) {
        window.location = window.location.origin + "/login";
      } else {
        console.log("Log Out Fail!");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  const [value, setValue] = useState(3);

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          border: "solid 1px blue",
        }}
      >
        <Grid item md={1} xs={1}>
          Company Logo
        </Grid>
        <Grid item md={10} xs={10}>
          <BottomNavigation
            showLabels={true}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              component={NavLink}
              to="/ObjectLocation"
              label="Object"
              icon={<AddLocationIcon />}
            />
            <BottomNavigationAction
              component={NavLink}
              to="/MainLocation"
              label="Main"
              icon={<LocationOnIcon />}
            />
            <BottomNavigationAction
              component={NavLink}
              to="/Library"
              label="Library"
              icon={<AllInboxIcon />}
            />
            <BottomNavigationAction
              component={NavLink}
              to="/Connection"
              label="Connection"
              icon={<GroupsIcon />}
            />
            <BottomNavigationAction
              component={NavLink}
              to="/Profile"
              label="Profile"
              icon={<PersonOutlineIcon />}
            />
          </BottomNavigation>
        </Grid>
        <Grid item md={1} xs={1} style={{ textAlign: "right" }}>
          <Button variant="contained" onClick={logOutphp}>
            LogOut
          </Button>
        </Grid>
      </Grid>
      <Outlet />
    </>
  );
};

export default NavBar;
