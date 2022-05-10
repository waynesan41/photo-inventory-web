import { Button, Card, CardContent, CardHeader, Popover } from "@mui/material";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import IconButton from "@mui/material/IconButton";

const BlockedUser = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentID, setCurrentID] = useState();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCurrentID(event.currentTarget.id);
    console.log("currentID: " + currentID);
    console.log("eventID: " + event.currentTarget.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const unBlockFetch = (event) => {
    let userID = event.currentTarget.id;
    console.log(currentID);
    /* const formData = new FormData();
    formData.append("userID", "B");

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Connection/getConnection.php",
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
      } else {
      }
    } catch (error) {
      console.log(error.message);
    } */
  };

  return (
    <>
      {props.blockUser.map((user) => (
        <Card key={user.UserID}>
          <CardHeader
            title={user.FullName}
            action={
              <Button>
                <LockOpenIcon id={user.UserID} onClick={handleClick} />
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
                    color="error"
                    onClick={unBlockFetch}
                  >
                    UnBlock {currentID}
                  </Button>
                </Popover>
              </Button>
            }
            subheader={<div>Username: {user.Username}</div>}
          />
        </Card>
      ))}
      <Card>No Block User</Card>
    </>
  );
};

export default BlockedUser;
