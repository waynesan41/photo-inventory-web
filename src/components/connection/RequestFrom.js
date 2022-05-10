import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const RequestFrom = () => {
  const [requestFromUser, setrequestFromUser] = useState([]);

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
        } else {
          setrequestFromUser([...result]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getBlockRequest();
  }, []);

  return (
    <>
      {requestFromUser.map((user) => (
        <Card key={user.UserID}>
          <CardHeader
            title={user.FullName}
            action={
              <div>
                <IconButton aria-label="help" color="primary">
                  <CheckIcon />
                </IconButton>

                <IconButton aria-label="help" color="warning">
                  <CloseIcon />
                </IconButton>
              </div>
            }
          />
          <CardContent>Username: {user.Username}</CardContent>
        </Card>
      ))}
      <Card>No Request From any User</Card>
    </>
  );
};

export default RequestFrom;
