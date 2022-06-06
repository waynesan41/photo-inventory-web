import React, { useState } from "react";
import { Button, Card, CardHeader, Dialog } from "@mui/material";
import NewUserShareForm from "./NewUserShareForm";
const NewUserOne = (props) => {
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader
        action={
          <Button variant="outlined" onClick={openHandler}>
            Share User
          </Button>
        }
        title={props.user.FullName}
        subheader={
          <>
            Username: {props.user.Username}
            <br />
            ID: {props.user.UserID}
          </>
        }
      />
      <Dialog open={open} onClose={closeHandler}>
        <NewUserShareForm
          user={props.user}
          libraryID={props.libraryID}
          changeNewUser={props.changeNewUser}
          closeShareForm={closeHandler}
        />
      </Dialog>
    </Card>
  );
};

export default NewUserOne;
