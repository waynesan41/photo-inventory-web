import React, { useState } from "react";
import { useApiURLContex } from "../../../../App";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const SendRequestBlock = (props) => {
  const { ApiURL } = useApiURLContex();
  const [loadSend, setLoadSend] = useState(false);
  const [loadBlock, setLoadBlock] = useState(false);

  const sendRequestFetch = async () => {
    setLoadSend(true);
    const formData = new FormData();
    console.log(props.currentID);
    formData.append("userID", props.currentID);
    formData.append("update", "S");
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
      } else if (result === "SEND") {
        props.close(null);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadSend(false);
  };

  const blockFetch = async () => {
    setLoadBlock(true);
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
    setLoadBlock(false);
  };
  return (
    <>
      <Button
        variant="contained"
        color="error"
        disabled={loadBlock}
        onClick={blockFetch}
      >
        Block
      </Button>
      <Button
        variant="contained"
        disabled={loadSend}
        onClick={sendRequestFetch}
      >
        Send Request
      </Button>
      {(loadBlock || loadSend) && <LinearProgress />}
    </>
  );
};

export default SendRequestBlock;
