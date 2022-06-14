import { CloseOutlined } from "@mui/icons-material";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";
import { useLibraryContex } from "../ObjectLibrary";

const ObjectDetail = (props) => {
  const { libraryID, libType, accessLvl } = useLibraryContex();
  const [edit, setEdit] = useState(true);
  const [src, setSrc] = useState("");
  const [open, setOpen] = useState(false);
  const openEdit = () => {
    setOpen(true);
  };
  const closeEdit = () => {
    setOpen(false);
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
    <Box minWidth={350}>
      <Button
        variant="contained"
        style={{ margin: "5px", float: "right" }}
        onClick={openEdit}
        disabled={edit}
      >
        Edit
      </Button>
      <h3>{props.objData.Name}</h3>
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
    </Box>
  );
};

export default ObjectDetail;
