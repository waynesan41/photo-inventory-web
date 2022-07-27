import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import LogIn from "../components/frontPage/LogIn";
import Register from "../components/frontPage/Register";
import { useApiURLContex } from "../App";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function LogInPage() {
  const { ApiURL } = useApiURLContex();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* const handleChangeIndex = (index) => {
    setValue(index);
  }; */

  useEffect(() => {
    const checkLogin = async () => {
      const fetchUrl = `${ApiURL}/checkNotLogin.php`;

      try {
        const response = await fetch(fetchUrl, {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const result = await response.json();
        if (result === 1) {
          window.location = window.location.origin + "/MainLocation";
        } else {
          console.log(result);
          console.log("Not LogIn!");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkLogin();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ bgcolor: "background.paper", width: 500 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Log In" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <LogIn />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Register />
        </TabPanel>
      </Box>
    </div>
  );
}

export default LogInPage;
