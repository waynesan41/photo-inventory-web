import { Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const RequestTo = () => {
  const [requestToUser, setrequestToUser] = useState([]);

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
        } else {
          setrequestToUser([...result]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getBlockRequest();
  }, []);

  return (
    <>
      {requestToUser.map((user) => (
        <Card key={user.UserID}>
          <CardHeader
            title={user.FullName}
            action={
              <Tooltip title={<div>Cancel Request</div>}>
                <IconButton aria-label="settings" color="warning">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            }
          />
          <CardContent>Username: {user.Username}</CardContent>
        </Card>
      ))}
      <Card>No Request to Any User</Card>
    </>
  );
};

export default RequestTo;
