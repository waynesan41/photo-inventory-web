import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";

const ConnectedUser = () => {
  const [connectUser, setConnectUser] = useState([]);

  useEffect(() => {
    const getConnectRequest = async () => {
      const formData = new FormData();
      formData.append("type", "C");

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
          setConnectUser([]);
        } else {
          setConnectUser([...result]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getConnectRequest();
  }, []);

  return (
    <>
      {connectUser.map((user) => (
        <Card key={user.UserID}>
          <CardHeader
            title={user.FullName}
            action={
              <IconButton aria-label="settings">
                <RemoveCircleIcon />
              </IconButton>
            }
          />
          <CardContent>Username: {user.Username}</CardContent>
        </Card>
      ))}
      <Card>No Connected User</Card>
    </>
  );
};

export default ConnectedUser;
