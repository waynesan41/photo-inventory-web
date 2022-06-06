import { Card, CardContent, CardHeader, Popover, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

const ConnectedUserList = (props) => {
  const [sending, setSending] = useState(false);
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

    formData.append("userID", props.currentID);
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

    formData.append("userID", props.currentID);
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
      {props.userList.map((user) => (
        <Card key={user.UserID}>
          <CardHeader
            title={user.FullName}
            action={
              <>
                <Button
                  id={user.UserID}
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
                    color="error"
                    onClick={blockFetch}
                  >
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
                Username: {user.Username}
                <br /> ID: {user.UserID}
              </div>
            }
          />
        </Card>
      ))}
    </>
  );
};

export default ConnectedUserList;
