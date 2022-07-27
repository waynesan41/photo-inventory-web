import { Button, Card, CardHeader, Dialog } from "@mui/material";
import React, { useState } from "react";

import EditAccessForm from "./EditAccessForm";

const ShareUserOne = (props) => {
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
            Edit
          </Button>
        }
        title={props.user.FullName}
        subheader={
          <>
            Username: {props.user.Username}
            <br /> Access Level: {props.user.AccessType}
          </>
        }
      >
        {props.user.FullName}
      </CardHeader>
      <Dialog open={open} onClose={closeHandler}>
        <EditAccessForm
          user={props.user}
          libraryID={props.libraryID}
          changeAccess={props.changeAccess}
          closeEditForm={closeHandler}
        />
      </Dialog>
    </Card>
  );
};

export default ShareUserOne;
