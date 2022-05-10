import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const SearchUser = () => {
  const [searchUser, setsearchUser] = useState([]);

  const getSearchUser = async (event) => {
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
        console.log(result);
        if (result === "No User Found!") {
          setsearchUser([]);
        } else {
          setsearchUser([...result]);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Paper component="form" sx={{ display: "flex" }} onSubmit={getSearchUser}>
        <TextField
          id="username"
          label="Search Username"
          name="username"
          variant="outlined"
          fullWidth
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Paper style={{ height: "80vh", overflow: "auto" }}>
        {searchUser.map((user) => (
          <Card key={user.UserID}>
            <CardHeader
              title={user.FullName}
              action={
                <IconButton aria-label="help" color="secondary">
                  <AddIcon />
                </IconButton>
              }
            />
            <CardContent>Username: {user.Username}</CardContent>
          </Card>
        ))}
        <Card>No User Found from Search</Card>
      </Paper>
    </>
  );
};

export default SearchUser;
