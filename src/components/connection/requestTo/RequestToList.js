import React, { useEffect, useState } from "react";

import RequestToOne from "./RequestToOne";
import { useApiURLContex } from "../../../App";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const RequestToList = () => {
  const { ApiURL } = useApiURLContex();
  const [noUser, setNoUser] = useState();
  const [requestToUser, setrequestToUser] = useState([]);
  const [editUserID, setEdituserID] = useState();

  const [loadList, setLoadList] = useState(false);

  useEffect(() => {
    const getBlockRequest = async () => {
      setLoadList(true);
      const formData = new FormData();
      formData.append("type", "T");
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
          setNoUser(true);
        } else {
          setrequestToUser([...result]);
          setNoUser(false);
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
      <Box style={titleStyle}>Request Send To User</Box>
      {loadList && <LinearProgress />}
      {noUser && !loadList && <h2>No User You Send Request To.</h2>}
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
