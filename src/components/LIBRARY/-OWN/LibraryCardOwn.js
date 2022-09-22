import { Button, Card, CardActionArea, Dialog, Box, Grid } from "@mui/material";

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
      <Card elevation={5} style={{ backgroundColor: "#ffbe76" }}>
        <Link
          to={`${props.libraryData.LibraryID}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardActionArea style={{ padding: "5px 5px 35px 5px" }}>
            <Box fontSize={20} fontWeight="bold" margin="10px 0px 10px 0px">
              {props.libraryData.Name}
            </Box>

            <Box>Total Object: {props.libraryData.TotalObject}</Box>
            <Box>Total People: {props.libraryData.NumPeople}</Box>
          </CardActionArea>
        </Link>
      </Card>
      <Grid container style={{ justifyContent: "center" }}>
        <Button variant="contained" color="info" onClick={() => openHandler(1)}>
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
