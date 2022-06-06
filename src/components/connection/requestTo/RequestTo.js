import { Card, CardContent, CardHeader, Popover, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

const RequestTo = (props) => {
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    props.setCurrentID(event.currentTarget.id);
  };
  const handleClose = () => {
    setLoading(false);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const cancelRequestFetch = async () => {
    // console.log("Button unBlock: " + props.currentID);
    setLoading(true);
    const formData = new FormData();

    formData.append("userID", props.currentID);
    formData.append("update", "C");

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
      {props.requestToUser.map((user) => (
        <Card key={user.UserID}>
          <CardHeader
            title={user.FullName}
            action={
              <>
                <Button
                  id={user.UserID}
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
                  >
                    {loading && <CircularProgress size={25} />}
                    {!loading && <>Cancel Request</>}
                  </Button>
                </Popover>
              </>
            }
            subheader={<div>Username: {user.Username}</div>}
          />
        </Card>
      ))}
    </>
  );
};

export default RequestTo;
