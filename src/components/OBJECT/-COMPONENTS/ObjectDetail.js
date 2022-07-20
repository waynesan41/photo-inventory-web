import { Box, Button, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";
import { useLibraryContex } from "../ObjectLibrary";
import ListLocation from "../-PLACE-OBJECT/ListLocation";

const ObjectDetail = (props) => {
  const { libType, accessLvl } = useLibraryContex();
  const [edit, setEdit] = useState(true);
  const [src, setSrc] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const openEdit = () => {
    setOpen(true);
  };
  const closeEdit = () => {
    setOpen(false);
  };
  const open2Handler = () => {
    setOpen2(true);
  };
  const close2Handler = () => {
    setOpen2(false);
  };

  useEffect(() => {
    if (libType == 2) {
      if (accessLvl == 3) setEdit(false);
      else setEdit(true);
    } else {
      setEdit(false);
    }
    if (props.objData.Photo != 0) {
      setSrc(
        `http://localhost/PhotoInventory/Backend/api/readImageObject.php?id1=${props.objData.LibraryID}&id2=${props.objData.ObjectID}`
      );
    }
  }, []);

  return (
    <Box minWidth={350} style={{ padding: "10px" }}>
      <Box fontSize={25}>
        <b>{props.objData.Name}</b>
      </Box>
      <b>ObjectID: {props.objData.ObjectID}</b>
      <Box style={{ margin: "5px 0px 5px 0px" }}>
        <Button
          variant="contained"
          onClick={openEdit}
          disabled={edit}
          style={{ marginRight: "10px" }}
        >
          Edit
        </Button>
        <Button variant="outlined" color="success" onClick={open2Handler}>
          Find Ojbect Placement
        </Button>
      </Box>
      <Box>
        <img style={{ maxWidth: "500px" }} src={src} />
      </Box>
      <Typography>
        Description: <br />
        {props.objData.Description}
      </Typography>
      <Dialog open={open} onClose={closeEdit}>
        <EditForm objData={props.objData} closeEdit={closeEdit} />
      </Dialog>
      <Dialog open={open2} onClose={close2Handler} maxWidth="80%">
        <ListLocation objData={props.objData} />
      </Dialog>
    </Box>
  );
};

export default ObjectDetail;
