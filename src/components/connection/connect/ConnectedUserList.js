import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ConnectedUserOne from "./ConnectedUserOne";

const ConnectedUserList = () => {
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
        if (result === 0) {
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
  const titleStyle = {
    fontSize: 25,
    fontWeight: "bold",
    borderRadius: "5px",
    margin: "5px 0px 15px 0px",
    fontSize: 35,
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  };
  return (
    <>
      <Box style={titleStyle}>Connected User</Box>
      {noUser && <h2>No Connected User.</h2>}
      {!noUser &&
        connectUser.map((user) => (
          <ConnectedUserOne
            key={user.UserID}
            user={user}
            currentID={currentID}
            setCurrentID={setCurrentID}
          />
        ))}
    </>
  );
};

export default ConnectedUserList;
