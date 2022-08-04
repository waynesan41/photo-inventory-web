import { Button } from "@mui/material";
import React, { useState } from "react";
import { useApiURLContex } from "../../../../App";

const Disconnect = (props) => {
  const { ApiURL } = useApiURLContex();
  const [blocking, setBlocking] = useState(false);
  //BLOCK FETCH
  const blockFetch = async () => {
    setBlocking(!blocking);
    const formData = new FormData();

    formData.append("userID", props.currentID);
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
        props.close(null);
        props.removeBlockUser(props.currentID);
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
      } else if (result === "DISCONNECT") {
        props.close(null);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button variant="contained" color="error" onClick={blockFetch}>
        Block
      </Button>
      <Button variant="contained" color="warning" onClick={disconnectFetch}>
        Disconnect
      </Button>
    </>
  );
};

export default Disconnect;
