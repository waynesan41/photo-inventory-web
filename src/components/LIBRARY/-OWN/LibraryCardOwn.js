import { Button, Card, CardActionArea, Dialog, Grid } from "@mui/material";

import { useState } from "react";
import { Link } from "react-router-dom";
import AddShareUser from "./--ADD-USER/AddShareUser";
import EditLibraryForm from "./--EDIT-FORM/EditLibraryForm";
import EditShareUser from "./--EDIT-SHARE/EditShareUser";

const LibraryCardOwn = (props) => {
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
          to={`${props.libraryData.LibraryID}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardActionArea style={{ padding: "5px" }}>
            <h3>{props.libraryData.Name}</h3>
            <div>ID: {props.libraryData.LibraryID}</div>
            <div>Total Object: {props.libraryData.TotalObject}</div>
            <div>Total People: {props.libraryData.NumPeople}</div>
          </CardActionArea>
        </Link>
        <Grid container style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="info"
            onClick={() => openHandler(1)}
          >
            Edit Library
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => openHandler(2)}
            disabled={!props.libraryData.NumPeople}
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
          <EditLibraryForm data={props.libraryData} closeForm={closeHandler} />
        )}
        {formType == 2 && <EditShareUser data={props.libraryData} />}
        {formType == 3 && <AddShareUser data={props.libraryData} />}
      </Dialog>
    </>
  );
};

export default LibraryCardOwn;
