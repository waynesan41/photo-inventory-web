import React, { useState } from "react";
import { Grid, Card, ButtonGroup, Button } from "@mui/material";

import ConnectedUser from "../components/connection/connect/ConnectedUser";
import RequestTo from "../components/connection/requestTo/RequestTo";
import RequestFrom from "../components/connection/requestFrom/RequestFrom";
import SearchUser from "../components/connection/search/SearchUser";

import { NavLink, Outlet, Route, Routes, Router } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import BlockIcon from "@mui/icons-material/Block";

const Connection = () => {
  const [value, setValue] = useState(1);
  return (
    <>
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
        />

        <BottomNavigationAction
          label="Connected"
          component={NavLink}
          to="/Connection/Connect"
          icon={<ConnectWithoutContactIcon />}
        />
        <BottomNavigationAction
          label="Request To"
          component={NavLink}
          to="/Connection/RequestTo"
          icon={<ArrowUpwardIcon />}
        />
        <BottomNavigationAction
          label="Request From"
          to="/Connection/RequestFrom"
          component={NavLink}
          icon={<ArrowDownwardIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/Connection/Block"
          label="Blocked"
          icon={<BlockIcon />}
        />
      </BottomNavigation>
      <Outlet />
    </>
  );
};

export default Connection;
