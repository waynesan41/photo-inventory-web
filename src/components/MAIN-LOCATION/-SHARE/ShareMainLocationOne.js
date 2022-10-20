import { Button, Card, CardActionArea, Dialog, Grid, Box } from "@mui/material";
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
    <Card elevation={5} style={{ backgroundColor: "#48dbfb" }}>
      <Link
        to={`${props.mainData.MainLocationID}/0`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardActionArea style={{ padding: "5px" }}>
          <Box fontSize={20} fontWeight="bold" margin="5px 0px 5px 0px">
            {props.mainData.Name}
          </Box>
          <Box>Total Location: {props.mainData.TotalLocation}</Box>
          <Box>Access Level: {props.mainData.AccessType}</Box>
          <Box>Owner Name: {props.mainData.FullName}</Box>
          <Box>Owner Username: {props.mainData.Username}</Box>
        </CardActionArea>
      </Link>
      <Grid container style={{ justifyContent: "right" }}>
        <Button
          variant="contained"
          color="warning"
          fullWidth={true}
          onClick={openHandler}
        >
          Leave Main Location
        </Button>
      </Grid>
      <Dialog fullWidth open={open} onClose={closeHandler}>
        <ConfirmLeaveForm
          mainID={props.mainData.MainLocationID}
          closeConfirm={closeHandler}
        />
      </Dialog>
    </Card>
  );
};

export default ShareMainLocationOne;
