import { Button, Card, Popover, CardHeader } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import AcceptDenied from "./options/AcceptDenied";
import CancelRequest from "./options/CancelRequest";
import Disconnect from "./options/Disconnect";
import SendRequestBlock from "./options/SendRequestBlock";
import { useApiURLContex } from "../../../App";

const SearchUserOne = (props) => {
  const { ApiURL } = useApiURLContex();
  const [status, setStatus] = useState("R");
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget.id);
    // props.setCurrentID(event.currentTarget.id);
    fetchConnectionStatus(event.currentTarget.id);
  };
  const handleClose = () => {
    setLoading(false);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const fetchConnectionStatus = async (fetchID) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("userID", fetchID);
    const fetchURL = `${ApiURL}/connection/checkSearch.php`;
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

      console.log(result);

      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else if (
        result === "N" ||
        result === "T" ||
        result === "F" ||
        result === "C"
      ) {
        setStatus(result);
      } else {
        window.location.reload();
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
    console.log(props.user.UserID);
  };

  return (
    <>
      <Card key={props.user.UserID} style={{ border: "2px solid gray" }}>
        <CardHeader
          title={props.user.FullName}
          action={
            <>
              <Button
                variant="contained"
                id={props.user.UserID}
                onClick={handleClick}
              >
                <MoreVertIcon />
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
                {status === "C" && (
                  <Disconnect
                    currentID={props.user.UserID}
                    removeBlockUser={props.removeBlockUser}
                    close={setAnchorEl}
                  />
                )}
                {status === "T" && (
                  <CancelRequest
                    currentID={props.user.UserID}
                    close={setAnchorEl}
                  />
                )}
                {status === "F" && (
                  <AcceptDenied
                    currentID={props.user.UserID}
                    close={setAnchorEl}
                  />
                )}
                {status === "N" && (
                  <SendRequestBlock
                    currentID={props.user.UserID}
                    removeBlockUser={props.removeBlockUser}
                    close={setAnchorEl}
                  />
                )}
                {loading && <CircularProgress size={35} />}
              </Popover>
            </>
          }
          subheader={<div>Username: {props.user.Username}</div>}
        />
      </Card>
    </>
  );
};

export default SearchUserOne;
