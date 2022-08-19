import {
  Button,
  Card,
  CardHeader,
  LinearProgress,
  Popover,
} from "@mui/material";
import React, { useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CircularProgress from "@mui/material/CircularProgress";
import { useApiURLContex } from "../../../App";

const BlockedUserOne = (props) => {
  const { ApiURL } = useApiURLContex();
  const [loadUnblock, setLoadUnblock] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    props.setCurrentID(event.currentTarget.id);
  };
  const handleClose = () => {
    setLoadUnblock(false);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const unBlockFetch = async () => {
    setLoadUnblock(true);
    console.log("Button unBlock: " + props.currentID);
    const formData = new FormData();

    formData.append("userID", props.currentID);
    formData.append("update", "U");
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
      } else if (result === "UNBLOCK") {
        window.location.reload();
      } else {
        window.location.reload();
      }
      setLoadUnblock(false);
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
                  disabled={loadUnblock}
                >
                  Unblock
                </Button>
                {loadUnblock && <LinearProgress size={25} />}
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
