import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import ShareUserOne from "./ShareUserOne";

const ShareFormChangeContex = React.createContext();

export const useShareFormChange = () => {
  return useContext(ShareFormChangeContex);
};

const EditShareUser = (props) => {
  const [shareUser, setShareUser] = useState([]);
  const [mainID, setMainID] = useState(props.data.MainLocationID);

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
    const data = new FormData();
    data.append("mainID", props.data.MainLocationID);
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/MainLocation/getSharedUser.php",
        {
          method: "POST",
          credentials: "include",
          body: data,
        }
      );
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
  };

  useEffect(() => {
    fetchShareUser();
  }, []);
  return (
    <Box minWidth={400}>
      <ShareFormChangeContex.Provider
        value={{ removeUser, changeAccess, mainID }}
      >
        {shareUser.map((User) => (
          <Box style={{ margin: "3px" }} key={User.UserID}>
            <ShareUserOne user={User} />
          </Box>
        ))}
      </ShareFormChangeContex.Provider>
    </Box>
  );
};

export default EditShareUser;
