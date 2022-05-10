import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import IconButton from "@mui/material/IconButton";
import BlockedUser from "./BlockedUser";

const BlockedUserList = () => {
  const [blockUser, setBlockUser] = useState([]);

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
      <BlockedUser blockUser={blockUser} />
    </>
  );
};

export default BlockedUserList;
