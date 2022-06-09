import React, { useContext } from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Button,
  FormControl,
} from "@mui/material";
import { useChangePeople } from "../../MainLocationList";
import { useMainLocationID } from "./AddShareUser";

const NewUserShareForm = (props) => {
  const changeTotalPeople = useChangePeople();
  const { changeNewUser, mainID } = useMainLocationID();

  //FETCH API TO Add New User to the Library
  const fetchUpdateUser = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    data.append("mainID", mainID);
    data.append("userID", props.user.UserID);

    /* console.log("data");
        for (var pair of data.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        } */

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/MainLocation/shareMainLocation.php",
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
      } else if (result === "SHARED") {
        changeNewUser(props.user.UserID);
        changeTotalPeople(mainID, 1);
        props.closeShareForm();
      }
    } catch (error) {
      console.log(error.message);
    }
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
        <FormControlLabel
          value="2"
          control={<Radio />}
          label="2 Edit Objects"
        />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="3 Delete Objects"
        />
      </RadioGroup>

      <Button variant="outlined" style={{ float: "right" }} type="submit">
        Update Edit
      </Button>
    </FormControl>
  );
};

export default NewUserShareForm;
