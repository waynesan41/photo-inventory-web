import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import RequestToOne from "./RequestToOne";

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
        if (result === 0) {
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
      <Box style={titleStyle}>Request Send To User</Box>
      {noUser && <h2>No User You Send Request To.</h2>}
      {!noUser &&
        requestToUser.map((user) => (
          <RequestToOne
            key={user.UserID}
            user={user}
            currentID={editUserID}
            setCurrentID={setEdituserID}
          />
        ))}
    </>
  );
};

export default RequestToList;
