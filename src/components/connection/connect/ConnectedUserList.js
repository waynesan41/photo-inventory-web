import React, { useEffect, useState } from "react";

import ConnectedUserOne from "./ConnectedUserOne";
import { useApiURLContex } from "../../../App";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const ConnectedUserList = () => {
  const { ApiURL } = useApiURLContex();
  const [noUser, setNoUser] = useState(false);
  const [connectUser, setConnectUser] = useState([]);
  const [currentID, setCurrentID] = useState();

  const [loadList, setLoadList] = useState(false);

  useEffect(() => {
    const getConnectRequest = async () => {
      setLoadList(true);
      const formData = new FormData();
      formData.append("type", "C");
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
        setLoadList(false);
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
      {loadList && <LinearProgress />}
      {noUser && !loadList && <h2>No Connected User.</h2>}
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
