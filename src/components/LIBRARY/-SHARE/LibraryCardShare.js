import { Button, Card, CardActionArea, Dialog, Grid, Box } from "@mui/material";
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
    <Card elevation={5} style={{ backgroundColor: "#d4f1ff" }}>
      <Link
        to={`${props.libraryData.ObjectLibraryID}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardActionArea style={{ padding: "5px" }}>
          <Box fontSize={20} fontWeight="bold" margin="5px 0px 5px 0px">
            {props.libraryData.Name}
          </Box>
          <Box>Total Object: {props.libraryData.TotalObject}</Box>
          <Box>Owner Name: {props.libraryData.OwnerName}</Box>
          <Box>Owner Username: {props.libraryData.OwnerUsername}</Box>
          <Box>Access Level: {props.libraryData.AccessType}</Box>
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
