import { Button, Card, CardContent, CardHeader, Popover } from "@mui/material";
import React, { useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CircularProgress from "@mui/material/CircularProgress";

const BlockedUserOne = (props) => {
  const [unBlocking, setUnBlocking] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    props.setCurrentID(event.currentTarget.id);
  };
  const handleClose = () => {
    setUnBlocking(false);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const unBlockFetch = async () => {
    console.log("Button unBlock: " + props.currentID);
    setUnBlocking(!unBlocking);
    const formData = new FormData();

    formData.append("userID", props.currentID);
    formData.append("update", "U");

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
      } else if (result === "UNBLOCK") {
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
    setUnBlocking(false);
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
                variant="outlined"
                onClick={handleClick}
              >
                <LockOpenIcon />
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
                  id={props.user.UserID}
                  variant="contained"
                  color="error"
                  onClick={unBlockFetch}
                >
                  {unBlocking && <CircularProgress size={25} />}
                  {!unBlocking && <>UnBlock</>}
                </Button>
              </Popover>
            </>
          }
          subheader={<div>Username: {props.user.Username}</div>}
        />
      </Card>
    </>
  );
};

export default BlockedUserOne;
