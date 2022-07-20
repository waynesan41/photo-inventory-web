import { Card, CardHeader, Popover, Button } from "@mui/material";
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

const ConnectedUserOne = (props) => {
  const [blocking, setBlocking] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

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
    setBlocking(!blocking);
    const formData = new FormData();

    formData.append("userID", props.user.UserID);
    formData.append("update", "B");

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Connection/updateConnection.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "DISCONNECT") {
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
    setBlocking(false);
  };
  //DISCONNECT FETCH
  const disconnectFetch = async () => {
    const formData = new FormData();

    formData.append("userID", props.user.UserID);
    formData.append("update", "R");

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Connection/updateConnection.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
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
    } catch (error) {
      console.log(error.message);
    }
  };
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
                <Button variant="contained" color="error" onClick={blockFetch}>
                  Block
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={disconnectFetch}
                >
                  Disconnect
                </Button>
              </Popover>
            </>
          }
          subheader={
            <div>
              Username: {props.user.Username}
              <br /> ID: {props.user.UserID}
            </div>
          }
        />
      </Card>
    </>
  );
};

export default ConnectedUserOne;
