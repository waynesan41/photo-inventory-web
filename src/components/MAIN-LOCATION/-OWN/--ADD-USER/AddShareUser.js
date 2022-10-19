import React, { useContext, useEffect, useState } from "react";

import NewUserOne from "./NewUserOne";
import { useApiURLContex } from "../../../../App";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const MainLocationIDContext = React.createContext();
export const useMainLocationID = () => {
  return useContext(MainLocationIDContext);
};

const AddShareUser = (props) => {
  const { ApiURL } = useApiURLContex();
  const [addUser, setAddUser] = useState([]); //Lists of Users That can be ADD/SHARE
  const [mainID, setMainID] = useState(props.data.MainLocationID);
  const [loadUser, setLoadUser] = useState(false);
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
    setLoadUser(true);
    const data = new FormData();
    data.append("mainID", props.data.MainLocationID);
    const fetchURL = `${ApiURL}/mainLocation/getNewUser.php`;

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
        setAddUser([]);
      } else {
        setAddUser([...result]);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadUser(false);
  };
  useEffect(() => {
    fetchConnectedUser();
  }, []);
  return (
    <Box>
      <MainLocationIDContext.Provider value={{ changeNewUser, mainID }}>
        {addUser.length > 0 &&
          addUser.map((User) => (
            <Box style={{ margin: "3px" }} key={User.UserID}>
              <NewUserOne user={User} />
            </Box>
          ))}
        {loadUser && (
          <>
            <Box fontSize={20} padding="10px">
              Loading Connected Users
            </Box>
            <LinearProgress />
          </>
        )}
        {addUser.length == 0 && !loadUser && (
          <Box fontSize={20} padding="10px">
            There is no More Connected User to Share With!
          </Box>
        )}
      </MainLocationIDContext.Provider>
    </Box>
  );
};

export default AddShareUser;
