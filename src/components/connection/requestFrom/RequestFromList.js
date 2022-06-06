import { Card, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RequestFrom from "./RequestFrom";

const RequestFromList = () => {
  const [noUser, setNoUser] = useState(false);
  const [requestFromUser, setrequestFromUser] = useState([]);
  const [editUserID, setEditUserID] = useState();

  useEffect(() => {
    const getBlockRequest = async () => {
      const formData = new FormData();
      formData.append("type", "F");

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
          setrequestFromUser([...result]);
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
      {noUser && <h2>No Request from Any User.</h2>}
      {!noUser && (
        <RequestFrom
          requestFromUser={requestFromUser}
          setCurrentID={setEditUserID}
          currentID={editUserID}
        />
      )}
    </>
  );
};

export default RequestFromList;
