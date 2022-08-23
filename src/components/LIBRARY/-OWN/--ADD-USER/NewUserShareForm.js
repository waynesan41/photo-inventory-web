import React, { useContext, useState } from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  FormControl,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useChangePeople } from "../../LibraryCardList";
import { useApiURLContex } from "../../../../App";

const NewUserShareForm = (props) => {
  const { ApiURL } = useApiURLContex();
  const [loadUpdate, seteLoadUpdate] = useState(false);
  const changeTotalPeople = useChangePeople();

  //FETCH API TO Add New User to the Library
  const fetchUpdateUser = async (event) => {
    seteLoadUpdate(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    data.append("libraryID", props.libraryID);
    data.append("userID", props.user.UserID);

    /* console.log("data");
    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    } */
    const fetchURL = `${ApiURL}/library/shareLibrary.php`;
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
      } else if (result === "UPDATED") {
        props.changeNewUser(props.user.UserID);
        props.closeShareForm();
        changeTotalPeople(props.libraryID, 1);
      }
    } catch (error) {
      console.log(error.message);
    }
    seteLoadUpdate(false);
  };
  return (
    <FormControl
      style={{ padding: "10px" }}
      component="form"
      onSubmit={fetchUpdateUser}
    >
      <h3>Access Level of: {props.user.FullName}</h3>
      <RadioGroup name="access">
        <FormControlLabel value="1" control={<Radio />} label="1 View Only" />
        <FormControlLabel value="2" control={<Radio />} label="2 Add Objects" />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="3 Delete Objects"
        />
      </RadioGroup>

      <Button
        variant="outlined"
        disabled={loadUpdate}
        style={{ float: "right" }}
        type="submit"
      >
        Update Access
      </Button>
      {loadUpdate && <LinearProgress />}
    </FormControl>
  );
};

export default NewUserShareForm;
