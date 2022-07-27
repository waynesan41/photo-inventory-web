import { Button, Paper, Box } from "@mui/material";
import React, { useState } from "react";
import { TextField } from "@mui/material";

import SearchUser from "./SearchUserOne";
import { useApiURLContex } from "../../../App";

const SearchUserList = () => {
  const { ApiURL } = useApiURLContex();
  const [noUser, setNoUser] = useState(false);
  const [searchUser, setsearchUser] = useState([]);
  // const [currentID, setCurrentID] = useState();

  const removeBlockUser = (userID) => {
    console.log("Remove User: " + userID);
    setsearchUser(searchUser.filter((user) => user.UserID !== userID));
  };

  const fetchSearchUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fetchURL = `${ApiURL}/Connection/searchUser.php`;
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
      if (result === 0) {
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
      <Box
        component="form"
        sx={{
          display: "grid",
          margin: "10px",
          gridTemplateColumns: "7fr 1fr",
        }}
        onSubmit={fetchSearchUser}
      >
        <TextField
          id="username"
          label="Search Username"
          name="username"
          variant="outlined"
          style={{ marginRight: "10px" }}
        />
        <Button variant="outlined" type="submit">
          Search
        </Button>
      </Box>
      <Paper>
        {noUser && <h2>No Users Found in Search.</h2>}
        {!noUser &&
          searchUser.map((user) => (
            <SearchUser
              key={user.UserID}
              user={user}
              removeBlockUser={removeBlockUser}
            />
          ))}
      </Paper>
    </>
  );
};

export default SearchUserList;
