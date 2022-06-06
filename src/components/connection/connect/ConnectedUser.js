import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import ConnectedUserList from "./ConnectedUserList";

const ConnectedUser = () => {
  const [noUser, setNoUser] = useState(false);
  const [connectUser, setConnectUser] = useState([]);
  const [currentID, setCurrentID] = useState();

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
          setNoUser(true);
          setConnectUser([]);
        } else {
          setNoUser(false);
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
      {noUser && <h2>No Connected User.</h2>}
      {!noUser && (
        <ConnectedUserList
          userList={connectUser}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )}
    </>
  );
};

export default ConnectedUser;
