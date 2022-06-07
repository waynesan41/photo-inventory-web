import { Button, Card, CardActionArea, Dialog, Grid } from "@mui/material";

import { useState } from "react";
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
      <Card elevation={5}>
        <Link
          to={`${props.mainData.MainLocationID}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardActionArea style={{ padding: "5px" }}>
            <h3>{props.mainData.Name}</h3>
            <div>ID: {props.mainData.MainLocationID}</div>
            <div>Total Location: {props.mainData.TotalLocation}</div>
            <div>Total Layer: {props.mainData.TotalLayer}</div>
            <div>Total Object: {props.mainData.TotalObjectType}</div>
            <div>Total NumPeople: {props.mainData.NumPeople}</div>
          </CardActionArea>
        </Link>
        <Grid container style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="info"
            onClick={() => openHandler(1)}
          >
            Edit Name
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => openHandler(2)}
            disabled={!props.mainData.NumPeople}
          >
            Edit User
          </Button>
          <Button variant="contained" onClick={() => openHandler(3)}>
            ADD User
          </Button>
        </Grid>
      </Card>
      <Dialog open={open} onClose={closeHandler}>
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
