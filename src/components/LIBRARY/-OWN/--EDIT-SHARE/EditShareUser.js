import React, { useState, useEffect, useContext } from "react";
import { useApiURLContex } from "../../../../App";
import ShareUserOne from "./ShareUserOne";

import { Box, Button, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const ShareFormChangeContex = React.createContext();

export const useShareFormChange = () => {
  return useContext(ShareFormChangeContex);
};

const EditShareUser = (props) => {
  const { ApiURL } = useApiURLContex();
  const [shareUser, setShareUser] = useState([]);
  const [loadUser, setLoadUser] = useState(false);

  const changeAccess = (id, access) => {
    const items = shareUser.filter((el) => {
      if (el.UserID == id) {
        el.AccessType = access;
      }
      return el;
    });
    setShareUser([...items]);
  };

  const removeUser = (userID) => {
    const items = shareUser.filter((user) => {
      if (user.UserID != userID) {
        return user;
      }
    });

    setShareUser([...items]);
  };
  const fetchShareUser = async () => {
    setLoadUser(true);
    const data = new FormData();
    data.append("libraryID", props.data.LibraryID);
    const fetchURL = `${ApiURL}/library/getUser.php`;

    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      console.log(result);
      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "NO USER") {
        setShareUser([]);
      } else {
        setShareUser([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadUser(false);
  };

  useEffect(() => {
    fetchShareUser();
  }, []);
  return (
    <Box minWidth={400}>
      <ShareFormChangeContex.Provider value={{ removeUser, changeAccess }}>
        {shareUser.length > 0 &&
          shareUser.map((User) => (
            <Box style={{ margin: "3px" }} key={User.UserID}>
              <ShareUserOne user={User} libraryID={props.data.LibraryID} />
            </Box>
          ))}
      </ShareFormChangeContex.Provider>
      {loadUser && (
        <>
          <Box fontSize={20} padding="10px">
            Loading Users List
          </Box>
          <LinearProgress />
        </>
      )}
    </Box>
  );
};

export default EditShareUser;
