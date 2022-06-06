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
const LibraryCardShare = (props) => {
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
        to={`${props.libraryData.ObjectLibraryID}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardActionArea style={{ padding: "5px" }}>
          <h3>{props.libraryData.Name}</h3>
          <div>Total Object: {props.libraryData.TotalObject}</div>
          <div>Owner Name: {props.libraryData.OwnerName}</div>
          <div>Owner Username: {props.libraryData.OwnerUsername}</div>
          <div>Access Level: {props.libraryData.AccessType}</div>
        </CardActionArea>
      </Link>
      <Grid container style={{ justifyContent: "right" }}>
        <Button
          variant="contained"
          color="warning"
          fullWidth={true}
          onClick={openHandler}
        >
          Leave Share Library
        </Button>
      </Grid>
      <Dialog open={open} onClose={closeHandler}>
        <ConfirmLeaveForm
          libraryID={props.libraryData.ObjectLibraryID}
          closeConfirm={closeHandler}
        />
      </Dialog>
    </Card>
  );
};

export default LibraryCardShare;
