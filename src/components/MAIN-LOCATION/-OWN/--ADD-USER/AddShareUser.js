import React, { useContext, useEffect, useState } from "react";

import { Box } from "@mui/material";
import NewUserOne from "./NewUserOne";

const MainLocationIDContext = React.createContext();
export const useMainLocationID = () => {
  return useContext(MainLocationIDContext);
};

const AddShareUser = (props) => {
  const [addUser, setAddUser] = useState([]); //Lists of Users That can be ADD/SHARE
  const [mainID, setMainID] = useState(props.data.MainLocationID);
  //Should be Pass as Context
  const changeNewUser = (id) => {
    const items = addUser.filter((user) => {
      if (user.UserID != id) {
        return user;
      }
    });
    setAddUser([...items]);
  };
  const fetchConnectedUser = async () => {
    const data = new FormData();
    data.append("mainID", props.data.MainLocationID);
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/MainLocation/getNewUser.php",
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
        setAddUser([]);
      } else {
        setAddUser([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchConnectedUser();
  }, []);
  return (
    <Box minWidth={400}>
      <MainLocationIDContext.Provider value={{ changeNewUser, mainID }}>
        {addUser.length > 0 &&
          addUser.map((User) => (
            <Box style={{ margin: "3px" }} key={User.UserID}>
              <NewUserOne user={User} />
            </Box>
          ))}
        {addUser.length == 0 && <Box>No Connected To Share Library.</Box>}
      </MainLocationIDContext.Provider>
    </Box>
  );
};

export default AddShareUser;
