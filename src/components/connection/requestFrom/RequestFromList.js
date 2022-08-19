import React, { useEffect, useState } from "react";

import { useApiURLContex } from "../../../App";
import RequestFromOne from "./RequestFromOne";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const RequestFromList = () => {
  const { ApiURL } = useApiURLContex();
  const [noUser, setNoUser] = useState(false);
  const [requestFromUser, setrequestFromUser] = useState([]);
  const [editUserID, setEditUserID] = useState();

  const [loadList, setLoadList] = useState(false);

  useEffect(() => {
    const getBlockRequest = async () => {
      setLoadList(true);
      const formData = new FormData();
      formData.append("type", "F");
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
          setrequestFromUser([...result]);
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
      <Box style={titleStyle}>Request Send From User</Box>
      {loadList && <LinearProgress />}
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
