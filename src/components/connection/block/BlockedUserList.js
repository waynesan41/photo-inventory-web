import React, { useEffect, useState } from "react";

import BlockedUserOne from "./BlockedUserOne";
import { useApiURLContex } from "../../../App";

import { Box, List } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const BlockedUserList = () => {
  const { ApiURL } = useApiURLContex();
  const [noBlockuser, setNoBlockUser] = useState();
  const [blockUser, setBlockUser] = useState([]);
  const [editUserID, setEdituserID] = useState();
  const [loadList, setLoadList] = useState(false);

  useEffect(() => {
    const getBlockRequest = async () => {
      setLoadList(true);
      const formData = new FormData();
      formData.append("type", "B");
      const fetchURL = `${ApiURL}/connection/getConnection.php`;
      try {
        const response = await fetch(fetchURL, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const result = await response.json();

        if (result === 0) {
          window.location = window.location.origin + "/Login";
        } else if (result === "NO USER") {
          setNoBlockUser(true);
        } else {
          setBlockUser([...result]);
        }
        setLoadList(false);
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
      <Box style={titleStyle}>Blocked User</Box>
      <Box>
        {loadList && <LinearProgress />}
        {noBlockuser && !loadList && <h2>You don't have any Blocked User.</h2>}
        {!noBlockuser &&
          blockUser.map((user) => (
            <BlockedUserOne
              key={user.UserID}
              user={user}
              currentID={editUserID}
              setCurrentID={setEdituserID}
            />
          ))}
      </Box>
    </>
  );
};

export default BlockedUserList;
