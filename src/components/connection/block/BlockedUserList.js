import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";

import BlockedUser from "./BlockedUser";

const BlockedUserList = () => {
  const [noBlockuser, setNoBlockUser] = useState();
  const [blockUser, setBlockUser] = useState([]);
  const [editUserID, setEdituserID] = useState();

  useEffect(() => {
    const getBlockRequest = async () => {
      const formData = new FormData();
      formData.append("type", "B");

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
          setNoBlockUser(true);
        } else {
          setBlockUser([...result]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getBlockRequest();
  }, []);

  return (
    <>
      {noBlockuser && <h2>You don't have any Blocked User.</h2>}
      {!noBlockuser && (
        <BlockedUser
          blockUser={blockUser}
          currentID={editUserID}
          setCurrentID={setEdituserID}
        />
      )}
    </>
  );
};

export default BlockedUserList;
