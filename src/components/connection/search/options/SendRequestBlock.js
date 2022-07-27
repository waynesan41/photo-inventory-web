import { Button } from "@mui/material";
import React, { useState } from "react";
import { useApiURLContex } from "../../../../App";
const SendRequestBlock = (props) => {
  const { ApiURL } = useApiURLContex();
  const [sending, setSending] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const sendRequestFetch = async () => {
    setSending(!sending);
    const formData = new FormData();
    console.log(props.currentID);
    formData.append("userID", props.currentID);
    formData.append("update", "S");
    const fetchURL = `${ApiURL}/Connection/updateConnection.php`;
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
      } else if (result === "SEND") {
        props.close(null);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
    setSending(false);
  };

  const blockFetch = async () => {
    setBlocking(!blocking);
    const formData = new FormData();

    formData.append("userID", props.currentID);
    formData.append("update", "B");
    const fetchURL = `${ApiURL}/Connection/updateConnection.php`;
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
  return (
    <>
      <Button variant="contained" color="error" onClick={blockFetch}>
        Block
      </Button>
      <Button variant="contained" onClick={sendRequestFetch}>
        Send Request
      </Button>
    </>
  );
};

export default SendRequestBlock;
