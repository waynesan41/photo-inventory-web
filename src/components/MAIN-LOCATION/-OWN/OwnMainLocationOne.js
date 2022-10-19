import React, { useState } from "react";

import { Button, Card, CardActionArea, Dialog, Box, Grid } from "@mui/material";

import { Link } from "react-router-dom";
import AddShareUser from "./--ADD-USER/AddShareUser";
import EditLibraryForm from "./--EDIT-FORM/EditLibraryForm";
import EditShareUser from "./--EDIT-SHARE/EditShareUser";

const OwnMainLocationOne = (props) => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState(null);

  const openHandler = (type) => {
    setFormType(type);
    setOpen(true);
  };
  const closeHandler = () => {
    setFormType(null);
    setOpen(false);
  };
  return (
    <>
      <Card elevation={5} style={{ backgroundColor: "#0abde3" }}>
        <Link
          to={`${props.mainData.MainLocationID}/0`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardActionArea style={{ padding: "5px 5px 35px 5px" }}>
            <Box fontSize={20} fontWeight="bold" margin="10px 0px 10px 0px">
              {props.mainData.Name}
            </Box>
            <Box>Total Location: {props.mainData.TotalLocation}</Box>
            <Box>Total NumPeople: {props.mainData.NumPeople}</Box>
          </CardActionArea>
        </Link>
      </Card>
      <Grid container style={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => openHandler(1)}
        >
          Edit Name
        </Button>

        <Button
          variant="contained"
          onClick={() => openHandler(2)}
          disabled={!props.mainData.NumPeople}
        >
          Edit User
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => openHandler(3)}
        >
          ADD User
        </Button>
      </Grid>
      <Dialog fullWidth open={open} onClose={closeHandler}>
        {formType == 1 && (
          <EditLibraryForm data={props.mainData} closeForm={closeHandler} />
        )}
        {formType == 2 && <EditShareUser data={props.mainData} />}
        {formType == 3 && <AddShareUser data={props.mainData} />}
      </Dialog>
    </>
  );
};

export default OwnMainLocationOne;
