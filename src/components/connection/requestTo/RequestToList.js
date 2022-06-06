import { Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import RequestTo from "./RequestTo";

const RequestToList = () => {
  const [noUser, setNoUser] = useState();
  const [requestToUser, setrequestToUser] = useState([]);
  const [editUserID, setEdituserID] = useState();

  useEffect(() => {
    const getBlockRequest = async () => {
      const formData = new FormData();
      formData.append("type", "T");

      try {
        const response = await fetch(
          "http://localhost/PhotoInventory/Backend/api/Connection/getConnection.php",
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
        } else if (result === "NO USER") {
          setNoUser(true);
        } else {
          setrequestToUser([...result]);
          setNoUser(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getBlockRequest();
  }, []);

  return (
    <>
      {noUser && <h2>No User You Send Request To.</h2>}
      {!noUser && (
        <RequestTo
          requestToUser={requestToUser}
          currentID={editUserID}
          setCurrentID={setEdituserID}
        />
      )}
    </>
  );
};

export default RequestToList;
