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
import { useCallback } from "react";

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
  const year = new Date().getFullYear();
  const checkLogin = useCallback(async () => {
    const fetchUrl = `${ApiURL}/checkNotLogin.php`;

    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.text();
      //Because PHP End can't be change for some reason
      if (result === "1") {
        window.location = window.location.origin + "/MainLocation";
      } else {
        /* console.log(result);
        console.log("Not LogIn!"); */
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  checkLogin();
  useEffect(() => {
    // checkLogin();
  }, []);
  return (
    <>
      <Box
        style={{ backgroundColor: "#2980b9" }}
        textAlign="center"
        paddingTop="10px"
      >
        <Box
          component="img"
          src="logo.png"
          width={{ xs: "100%", md: "400px" }}
          sx={
            {
              // height: "100px",
              // width: { sm: "100%", md: "100%" },
              // width: "100%",
            }
          }
        />
      </Box>
      <Box
        style={{
          width: "auto",
          justifyContent: "left",
          display: "inline",
          position: "static",
        }}
      >
        <Box
          sx={{
            border: "3px solid #2980b9",
            borderRadius: "5px",
            margin: "10px",
            display: "inline-block",
            bgcolor: "background.paper",
            width: "auto",
            position: "static",
          }}
        >
          <AppBar position="relative">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
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
        <Box
          display="inline-block"
          position="relative"
          backgroundColor="white"
          paddingLeft="10px"
        >
          <Box color="#e67e22" display="block" fontSize={30} component="h1">
            Find Placement
          </Box>
          <Box
            fontSize={25}
            style={{ wordWrap: "break-word", display: "block" }}
          >
            Reconnect with the stuff that you don't remenber placing.
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          position: "fixed",
          left: "0px",
          bottom: "0px",
          right: "0px",
          minHeight: "25px",
          backgroundColor: "#2980b9",
          color: "white",
          textAlign: "center",
          padding: "15px",
          zIndex: "-1",
        }}
        component="footer"
      >
        Find Placement &copy; {year}
      </Box>
    </>
  );
}

export default LogInPage;
