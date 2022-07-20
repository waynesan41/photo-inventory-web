import React, { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
} from "@mui/material";

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
  const [value, setValue] = useState(0);
  useEffect(() => {
    switch (window.location.pathname.split("/").at(1)) {
      case "MainLocation":
        setValue(0);
        break;
      case "Library":
        setValue(1);
        break;
      case "Connection":
        setValue(2);
        break;
      case "Profile":
        setValue(3);
        break;
      default:
        setValue(0);
    }
  }, []);

  return (
    <Box>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 10fr 1fr",
          gridGap: "10px",
          paddingBottom: "5px",
          marginBottom: "5px",
          borderBottom: "2px solid gray",
        }}
      >
        <Box>
          <b>Company Name</b>
        </Box>
        <BottomNavigation
          showLabels={true}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={NavLink}
            to="/MainLocation"
            label="Main"
            icon={<LocationOnIcon />}
            style={{ border: "2px solid #4176cf", borderRadius: "10px" }}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/Library"
            label="Library"
            icon={<AllInboxIcon />}
            style={{ border: "2px solid #4176cf", borderRadius: "10px" }}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/Connection"
            label="Connection"
            icon={<GroupsIcon />}
            style={{ border: "2px solid #4176cf", borderRadius: "10px" }}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/Profile"
            label="Profile"
            icon={<PersonOutlineIcon />}
            style={{ border: "2px solid #4176cf", borderRadius: "10px" }}
          />
        </BottomNavigation>
        <Box style={{ float: "right" }}>
          <Button variant="contained" onClick={logOutphp}>
            LogOut
          </Button>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default NavBar;
