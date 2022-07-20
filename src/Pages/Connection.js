import React, { useEffect, useState } from "react";
/* import { Grid, Card, ButtonGroup, Button } from "@mui/material";

import ConnectedUser from "../components/connection/connect/ConnectedUser";
import RequestToOne from "../components/connection/requestTo/RequestToOne";
import RequestFromList from "../components/connection/requestFrom/RequestFromList";
import SearchUser from "../components/connection/search/SearchUserList"; */

import { NavLink, Outlet } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import BlockIcon from "@mui/icons-material/Block";
import { Box } from "@mui/material";

const Connection = () => {
  const [value, setValue] = useState(1);
  useEffect(() => {
    switch (document.URL.split("/").pop()) {
      case "Search":
        setValue(0);
        break;
      case "Connect":
        setValue(1);
        break;
      case "RequestTo":
        setValue(2);
        break;
      case "RequestFrom":
        setValue(3);
        break;
      case "Block":
        setValue(4);
        break;
      default:
        setValue(1);
    }
  }, []);
  return (
    <Box style={{ padding: "5px" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Search"
          component={NavLink}
          to="/Connection/Search"
          icon={<SearchIcon />}
          style={{ border: "2px solid #4176cf", borderRadius: "10px" }}
        />

        <BottomNavigationAction
          label="Connected"
          component={NavLink}
          to="/Connection/Connect"
          icon={<ConnectWithoutContactIcon />}
          style={{ border: "2px solid #4176cf", borderRadius: "10px" }}
        />
        <BottomNavigationAction
          label="Request To"
          component={NavLink}
          to="/Connection/RequestTo"
          icon={<ArrowUpwardIcon />}
          style={{
            border: "2px solid #4176cf",
            borderRadius: "10px",
          }}
        />
        <BottomNavigationAction
          label="Request From"
          to="/Connection/RequestFrom"
          component={NavLink}
          icon={<ArrowDownwardIcon />}
          style={{ border: "2px solid #4176cf", borderRadius: "10px" }}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/Connection/Block"
          label="Blocked"
          icon={<BlockIcon />}
          style={{ border: "2px solid #4176cf", borderRadius: "10px" }}
        />
      </BottomNavigation>
      <Outlet />
    </Box>
  );
};

export default Connection;
