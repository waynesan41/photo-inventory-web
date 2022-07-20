import { Button, Paper } from "@mui/material";
import React, { useState } from "react";
import { TextField } from "@mui/material";

import SearchUser from "./SearchUserOne";

const SearchUserList = () => {
  const [noUser, setNoUser] = useState(false);
  const [searchUser, setsearchUser] = useState([]);
  const [currentID, setCurrentID] = useState();

  const removeBlockUser = (userID) => {
    console.log("Remove User: " + userID);
    setsearchUser(searchUser.filter((user) => user.UserID != userID));
  };

  const fetchSearchUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Connection/searchUser.php",
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
      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else {
        if (result === "NO USER") {
          setNoUser(true);
          setsearchUser([]);
        } else {
          setNoUser(false);
          setsearchUser([...result]);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Paper
        component="form"
        sx={{ display: "flex" }}
        onSubmit={fetchSearchUser}
      >
        <TextField
          id="username"
          label="Search Username"
          name="username"
          variant="outlined"
          fullWidth
          defaultValue={"o"}
        />
        <Button variant="outlined" type="submit">
          Search
        </Button>
      </Paper>
      <Paper>
        {noUser && <h2>No Users Found in Search.</h2>}
        {!noUser &&
          searchUser.map((user) => (
            <SearchUser
              key={user.UserID}
              user={user}
              setCurrentID={setCurrentID}
              removeBlockUser={removeBlockUser}
            />
          ))}
      </Paper>
    </>
  );
};

export default SearchUserList;