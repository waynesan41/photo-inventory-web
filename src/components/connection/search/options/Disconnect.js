import React, { useState } from "react";
import { useApiURLContex } from "../../../../App";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const Disconnect = (props) => {
  const { ApiURL } = useApiURLContex();

  const [loadBlock, setLoadBlock] = useState(false);
  const [loadDC, setLoadDC] = useState(false);
  //BLOCK FETCH
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
    setLoadBlock(false);
  };
  //DISCONNECT FETCH
  const disconnectFetch = async () => {
    setLoadDC(true);
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
      setLoadDC(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        disabled={loadBlock}
        color="error"
        onClick={blockFetch}
      >
        Block
      </Button>
      <Button
        variant="contained"
        disabled={loadDC}
        color="warning"
        onClick={disconnectFetch}
      >
        Disconnect
      </Button>
      {(loadDC || loadBlock) && <LinearProgress />}
    </>
  );
};

export default Disconnect;
