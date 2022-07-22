import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import RequestFromOne from "./RequestFromOne";

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
        if (result === 0) {
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
      <Box style={titleStyle}>Request Send From User</Box>
      {noUser && <h2>No Request from Any User.</h2>}
      {!noUser &&
        requestFromUser.map((user) => (
          <RequestFromOne
            key={user.UserID}
            user={user}
            setCurrentID={setEditUserID}
            currentID={editUserID}
          />
        ))}
    </>
  );
};

export default RequestFromList;
