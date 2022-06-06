import {
  Button,
  Card,
  CardActionArea,
  Dialog,
  Grid,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import ConfirmLeaveForm from "./ConfirmLeaveForm";
import { Link } from "react-router-dom";
const ShareMainLocationOne = (props) => {
  const [open, setOpen] = useState(false);

  const openHandler = (type) => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Card elevation={5}>
      <Link
        to={`${props.mainData.MainLocationID}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardActionArea style={{ padding: "5px" }}>
          <h3>{props.mainData.Name}</h3>
          <div>Total Object: {props.mainData.TotalObject}</div>
          <div>Owner Name: {props.mainData.FullName}</div>
          <div>Owner Username: {props.mainData.Username}</div>
          <div>Access Level: {props.mainData.AccessType}</div>
        </CardActionArea>
      </Link>
      <Grid container style={{ justifyContent: "right" }}>
        <Button
          variant="contained"
          color="warning"
          fullWidth={true}
          onClick={openHandler}
        >
          Leave Share Main Location
        </Button>
      </Grid>
      <Dialog open={open} onClose={closeHandler}>
        <ConfirmLeaveForm
          libraryID={props.mainData.ObjectLibraryID}
          closeConfirm={closeHandler}
        />
      </Dialog>
    </Card>
  );
};

export default ShareMainLocationOne;
