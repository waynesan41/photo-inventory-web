import React, { useState } from "react";
import { useApiURLContex } from "../../../../App";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const AcceptDenied = (props) => {
  const { ApiURL } = useApiURLContex();
  const [loadAccept, setLoadAccept] = useState(false);
  const [loadDeny, setLoadDeny] = useState(false);
  // ACCEPT REQUEST HANDLER
  const acceptFetch = async () => {
    setLoadAccept(true);
    const formData = new FormData();
    formData.append("userID", props.currentID);
    formData.append("update", "A");
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
      } else if (result === "ACCEPT") {
        props.close(null);
        console.log("Accepted");
      } else {
        console.log("Accepted");
      }
      setLoadAccept(false);
    } catch (error) {
      console.log(error.message);
    }
  }; //End of Accept Fetch

  // DENIED REQUEST HANDLER
  const denyFetch = async () => {
    setLoadDeny(true);
    const formData = new FormData();

    formData.append("userID", props.currentID);
    formData.append("update", "D");
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
      } else if (result === "DENY") {
        props.close(null);
        console.log("Deny");
      } else {
        console.log("Deny Went Wrong");
      }
      setLoadDeny(false);
    } catch (error) {
      console.log(error.message);
    }
  }; // End of Denied Fetch

  return (
    <>
      <Button variant="contained" disabled={loadAccept} onClick={acceptFetch}>
        Accept
      </Button>
      <Button
        variant="contained"
        disabled={loadDeny}
        onClick={denyFetch}
        color="warning"
      >
        Denied
      </Button>
      {(loadAccept || loadDeny) && <LinearProgress />}
    </>
  );
};

export default AcceptDenied;
