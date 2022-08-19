import { Card, CardHeader, Popover, Button } from "@mui/material";
import React, { useState } from "react";

import { useApiURLContex } from "../../../App";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";

const RequestFromOne = (props) => {
  const { ApiURL } = useApiURLContex();
  const [anchorEl, setAnchorEl] = useState(null);
  const [direct, setDirect] = useState(null);

  const [loadAccept, setLoadAccept] = useState(false);
  const [loadBlock, setLoadBlock] = useState(false);
  const [loadDenied, setLoadDenied] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setDirect(event.currentTarget.value * 1);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // ACCEPT REQUEST HANDLER
  const acceptFetch = async () => {
    setLoadAccept(true);
    const formData = new FormData();

    formData.append("userID", props.user.UserID);
    formData.append("update", "A");
    const fetchURL = `${ApiURL}/connection/updateConnection.php`;
    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else if (result === "ACCEPT") {
        window.location.reload();
      } else {
        window.location.reload();
      }
      setLoadAccept(false);
    } catch (error) {
      console.log(error.message);
    }
  }; //End of Accept Fetch

  // DENIED REQUEST HANDLER
  const denyFetch = async () => {
    setLoadDenied(true);
    const formData = new FormData();

    formData.append("userID", props.user.UserID);
    formData.append("update", "D");
    const fetchURL = `${ApiURL}/connection/updateConnection.php`;
    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "DENY") {
        window.location.reload();
      } else {
        window.location.reload();
      }
      setLoadDenied(false);
    } catch (error) {
      console.log(error.message);
    }
  }; // End of Denied Fetch

  // BLOCK REQUEST HANDLER
  const blockFetch = async () => {
    setLoadBlock(true);
    const formData = new FormData();

    formData.append("userID", props.user.UserID);
    formData.append("update", "B");
    const fetchURL = `${ApiURL}/connection/updateConnection.php`;
    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else if (result === "BLOCK") {
        window.location.reload();
      } else {
        window.location.reload();
      }
      setLoadBlock(true);
    } catch (error) {
      console.log(error.message);
    }
  }; // End of BLOCK Fetch

  return (
    <>
      <Card key={props.user.UserID} style={{ border: "2px solid gray" }}>
        <CardHeader
          title={props.user.FullName}
          action={
            <>
              <Button
                id={props.user.UserID}
                onClick={handleClick}
                variant="outlined"
                color="primary"
                value={1}
              >
                <CheckIcon />
              </Button>
              <Button
                id={props.user.UserID}
                onClick={handleClick}
                variant="outlined"
                color="error"
                value={2}
              >
                <CloseIcon />
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
                {direct === 1 && (
                  <Button
                    onClick={acceptFetch}
                    disabled={loadAccept}
                    variant="contained"
                  >
                    Accept Request
                  </Button>
                )}
                {direct === 2 && (
                  <>
                    <Button
                      onClick={blockFetch}
                      variant="contained"
                      color="error"
                      disabled={loadBlock}
                    >
                      Block User
                    </Button>
                    <Button
                      onClick={denyFetch}
                      variant="contained"
                      color="warning"
                      disabled={loadDenied}
                    >
                      Denied Request
                    </Button>
                  </>
                )}
                {(loadAccept || loadBlock || loadDenied) && <LinearProgress />}
              </Popover>
            </>
          }
          subheader={<div>Username: {props.user.Username}</div>}
        />
      </Card>
    </>
  );
};

export default RequestFromOne;
