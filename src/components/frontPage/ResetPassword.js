import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Box, Link } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useApiURLContex } from "../../App";
import ResetPasswordForm from "./-COMPONENTS/ResetPasswordForm";

const ResetPassword = () => {
  const { ApiURL } = useApiURLContex();
  let { tokenKey } = useParams();

  const [loadChecking, setLoadChecking] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const year = new Date().getFullYear();

  //API Check User is Login =================
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

  //API Check Token =====================
  const checkToken = useCallback(async () => {
    setLoadChecking(true);
    console.log(tokenKey);
    const data = new FormData();
    data.append("tokenKey", tokenKey);
    const fetchURL = `${ApiURL}/account/checkToken.php`;
    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      console.log(result);

      if (result == "GOOD") {
        setTokenValid(true);
      } else {
        setTokenValid(false);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadChecking(false);
  }, []);

  //CONFIRM PASSWORD HANDLER

  useEffect(() => {
    checkToken();
    // checkLogin();
    // checkLogin();
  }, []);
  return (
    <>
      <Box
        style={{ backgroundColor: "#2980b9" }}
        textAlign="center"
        paddingTop="10px"
      >
        <Link href="/Login">
          <img src="/logo.png" height="100px" />
        </Link>
      </Box>
      {loadChecking && <LinearProgress />}
      {!tokenValid && (
        <Box
          fullWidth
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          <Box fullWidth>
            {resetSuccess ? (
              <Box>Password reset Complete.</Box>
            ) : (
              <Box>Invalid Link or Link Expired!!</Box>
            )}

            <Box>
              <Link href="/Login"> Back to Log In Page</Link>
            </Box>
          </Box>
        </Box>
      )}

      {tokenValid && (
        <ResetPasswordForm
          setResetSuccess1={setResetSuccess}
          setTokenValid1={setTokenValid}
        />
      )}
      <Box
        style={{
          position: "fixed",
          left: "0px",
          bottom: "0px",
          right: "0px",
          minHeight: "50px",
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
};
export default ResetPassword;
