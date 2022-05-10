import React, { useCallback } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

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
  const [value, setValue] = React.useState(0);
  return (
    <>
      <BottomNavigation
        style={{
          border: "solid 1px blue",
        }}
        showLabels={true}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <div
          style={{
            marginRight: "auto",
          }}
        >
          717logistics
        </div>
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

        <button
          style={{
            marginLeft: "auto",
          }}
          onClick={logOutphp}
        >
          Log Out
        </button>
      </BottomNavigation>
      <Outlet />
    </>
  );
};

export default NavBar;
