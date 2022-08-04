import { Button } from "@mui/material";
import React from "react";
import { useApiURLContex } from "../../../../App";
const AcceptDenied = (props) => {
  const { ApiURL } = useApiURLContex();
  // ACCEPT REQUEST HANDLER
  const acceptFetch = async () => {
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
    } catch (error) {
      console.log(error.message);
    }
  }; //End of Accept Fetch

  // DENIED REQUEST HANDLER
  const denyFetch = async () => {
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
    } catch (error) {
      console.log(error.message);
    }
  }; // End of Denied Fetch

  return (
    <>
      <Button variant="contained" onClick={acceptFetch}>
        Accept
      </Button>
      <Button variant="contained" onClick={denyFetch} color="warning">
        Denied
      </Button>
    </>
  );
};

export default AcceptDenied;
