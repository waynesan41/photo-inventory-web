import { useEffect, useState } from "react";

import NewUserOne from "./NewUserOne";
import { useApiURLContex } from "../../../../App";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const AddShareUser = (props) => {
  const { ApiURL } = useApiURLContex();
  const [addUser, setAddUser] = useState([]);
  const [loadUser, setLoadUser] = useState(false);

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
    data.append("libraryID", props.data.LibraryID);
    const fetchURL = `${ApiURL}/library/getNewUser.php`;

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
      console.log(addUser);
      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "NO USER") {
        setAddUser([]);
      } else {
        setAddUser([...result]);
        console.log("user is set");
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
      {addUser.length > 0 &&
        addUser.map((User) => (
          <Box style={{ margin: "3px" }} key={User.UserID}>
            <NewUserOne
              user={User}
              libraryID={props.data.LibraryID}
              changeNewUser={changeNewUser}
            />
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
    </Box>
  );
};

export default AddShareUser;
