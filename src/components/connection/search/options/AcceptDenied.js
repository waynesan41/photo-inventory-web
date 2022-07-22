import { Button } from "@mui/material";
import React from "react";
const AcceptDenied = (props) => {
  // ACCEPT REQUEST HANDLER
  const acceptFetch = async () => {
    const formData = new FormData();

    formData.append("userID", props.currentID);
    formData.append("update", "A");

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
