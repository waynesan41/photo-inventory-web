import React, { useEffect, useCallback, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Link,
  Popover,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import AllInboxIcon from "@mui/icons-material/AllInbox";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useApiURLContex } from "../App";

const NavBar = () => {
  const { ApiURL } = useApiURLContex();
  //POP OVer ===========
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const logOutphp = async () => {
    const fetchURL = `${ApiURL}/account/logout.php`;

    try {
      const response = await fetch(fetchURL, {
        mode: "cors",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      if (data === 0) {
        window.location = window.location.origin + "/login";
      } else {
        console.log("Log Out Fail!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkLogin = useCallback(async () => {
    console.log("Check Login From APP");
    const fetchUrl = `${ApiURL}/checkLogin.php`;

    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      //Because PHP End can't be change for some reason
      if (result === 0) {
        window.location = window.location.origin + "/login";
      } else {
        /* console.log(result);
        console.log("Not LogIn!"); */
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  useEffect(() => {
    checkLogin();
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
          position: "sticky",
          top: "0px",
          display: "grid",
          zIndex: 9,
          gridTemplateColumns: "1fr 10fr 1fr",
          gridGap: "10px",
          marginBottom: "5px",
          borderBottom: "2px solid gray",
          backgroundColor: "#3498db",
        }}
      >
        <Link href="/MainLocation">
          <img
            style={{
              marginTop: "10px",
            }}
            src={require("./logo11.png")}
            width="170px"
          />
        </Link>

        <BottomNavigation
          showLabels={true}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            // event.target.style.backgroundColor = "#3498db";
          }}
          style={{
            backgroundColor: "#3498db",
          }}
        >
          <BottomNavigationAction
            component={NavLink}
            to="/MainLocation"
            label="Main"
            icon={<LocationOnIcon />}
            style={{
              border: "4px solid #4176cf",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/Library"
            label="Library"
            icon={<AllInboxIcon />}
            style={{
              border: "4px solid #4176cf",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/Connection"
            label="Connection"
            icon={<GroupsIcon />}
            style={{
              border: "4px solid #4176cf",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
          <BottomNavigationAction
            component={NavLink}
            to="/Profile"
            label="Profile"
            icon={<PersonOutlineIcon />}
            style={{
              border: "4px solid #4176cf",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        </BottomNavigation>
        <Box style={{ display: "grid", alignItems: "start" }}>
          <Button variant="contained" onClick={handleClick}>
            Log Out
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Button onClick={logOutphp} variant="contained" color="error">
              Confirm
            </Button>
          </Popover>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default NavBar;
