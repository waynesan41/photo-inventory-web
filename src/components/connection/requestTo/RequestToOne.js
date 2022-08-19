import React, { useState } from "react";

import { useApiURLContex } from "../../../App";

import { Card, CardHeader, Popover, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";

const RequestToOne = (props) => {
  const { ApiURL } = useApiURLContex();

  const [loadCancel, setLoadCancel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    props.setCurrentID(event.currentTarget.id);
  };
  const handleClose = () => {
    setLoadCancel(false);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const cancelRequestFetch = async () => {
    // console.log("Button unBlock: " + props.currentID);
    setLoadCancel(true);
    const formData = new FormData();

    formData.append("userID", props.currentID);
    formData.append("update", "C");
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
      } else if (result === "CANCEL") {
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
                color="error"
              >
                <CloseIcon color="error" />
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
                  onClick={cancelRequestFetch}
                  disabled={loadCancel}
                >
                  Cancel Request
                </Button>
                {loadCancel && <LinearProgress />}
              </Popover>
            </>
          }
          subheader={<div>Username: {props.user.Username}</div>}
        />
      </Card>
    </>
  );
};

export default RequestToOne;
