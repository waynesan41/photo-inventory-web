import {
  Card,
  CardHeader,
  Popover,
  Button,
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";

import { useApiURLContex } from "../../../App";

import CloseIcon from "@mui/icons-material/Close";

const ConnectedUserOne = (props) => {
  const { ApiURL } = useApiURLContex();
  const [anchorEl, setAnchorEl] = useState(null);

  const [loadBlock, setLoadBlock] = useState(false);
  const [loadDC, setLoadDC] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    props.setCurrentID(event.currentTarget.id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  //BLOCK FETCH
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
      } else if (result === "DISCONNECT") {
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadBlock(false);
  };
  //DISCONNECT FETCH
  const disconnectFetch = async () => {
    setLoadDC(true);
    const formData = new FormData();

    formData.append("userID", props.user.UserID);
    formData.append("update", "R");
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
      } else if (result === "BLOCK") {
        window.location.reload();
      } else {
        window.location.reload();
      }
      setLoadDC(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Card style={{ border: "2px solid gray" }}>
        <CardHeader
          title={props.user.FullName}
          action={
            <>
              <Button
                id={props.user.UserID}
                onClick={handleClick}
                variant="outlined"
                color="secondary"
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
                <Button
                  variant="contained"
                  disabled={loadBlock}
                  color="error"
                  onClick={blockFetch}
                >
                  Block
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  disabled={loadDC}
                  onClick={disconnectFetch}
                >
                  Disconnect
                </Button>
                {(loadBlock || loadDC) && <LinearProgress />}
              </Popover>
            </>
          }
          subheader={<div>Username: {props.user.Username}</div>}
        />
      </Card>
    </>
  );
};

export default ConnectedUserOne;
