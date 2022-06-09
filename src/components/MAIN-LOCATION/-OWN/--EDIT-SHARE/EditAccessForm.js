import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Button,
  FormControl,
} from "@mui/material";

import { useChangePeople } from "../../MainLocationList";
import { useShareFormChange } from "./EditShareUser.js";

const EditAccessForm = (props) => {
  const changeTotalPeople = useChangePeople();
  const { removeUser, changeAccess, mainID } = useShareFormChange();
  //UPDATE API CALL Edit / Remove
  const fetchUpdateUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("access") == 0) {
      data.delete("access");
      data.append("mainID", mainID);
      data.append("userID", props.user.UserID);
      try {
        const response = await fetch(
          "http://localhost/PhotoInventory/Backend/api/MainLocation/removeShareUser.php",
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
        } else if (result === "REMOVE") {
          props.closeEditForm();
          changeTotalPeople(mainID, 2);
          removeUser(props.user.UserID);
        } else {
          console.log("Error Removing ");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      if (data.get("access") == props.user.AccessType) {
        props.closeEditForm();
        return 0;
      }
      data.append("mainID", mainID);
      data.append("userID", props.user.UserID);

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
          changeAccess(props.user.UserID, data.get("access"));
          props.closeEditForm();
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <FormControl
      style={{ padding: "10px" }}
      component="form"
      onSubmit={fetchUpdateUser}
    >
      <h3>Edit Access Level for {props.user.FullName}</h3>
      <RadioGroup name="access">
        <FormControlLabel value="0" control={<Radio />} label="Remove User" />
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

export default EditAccessForm;
